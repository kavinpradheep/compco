import Counter from './components/Counter';
import Login from './components/login';
import Signup from './components/Signup';
import VerifyOtp from './components/OtpVerification';
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
