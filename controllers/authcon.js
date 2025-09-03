const nodemailer = require("nodemailer");
const User = require("../models/userSchema");
const PendingUser = require("../models/pendingUserSchema");
const bcrypt = require("bcryptjs");

// Utility: send email
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // you can use Outlook, etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Verify Otp" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
   
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    const pendingUser = new PendingUser({
      name,
      email,
      password: hashedPassword,
      otp,
    });

    await pendingUser.save();

        // Send OTP via email
    await sendOtpEmail(email, otp);


    res.status(201).json({ message: "User registered. OTP sent to email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// VERIFY OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) 
      return res.status(400).json({ message: "User not found" });

    if (String(pendingUser.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const newUser = new User({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
    });

    await newUser.save();
    await PendingUser.deleteOne({ email });

    res.status(200).json({ message: "OTP verified successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { register, login, verifyOtp };
