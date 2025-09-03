import Counter from './components/state/Counter';
import Login from './components/state/login';
import Signup from './components/state/Signup';
import VerifyOtp from './components/state/OtpVerification';
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
