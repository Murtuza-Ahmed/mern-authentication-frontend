import "../styles/ForgotPassword.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "../api/services/authServices";

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await forgotPassword({ email }).then((res) => {
      toast.success(res.message)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }
  return <>
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="forgot-password-form">
          <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="forgot-input" />
          <button type="submit" className="forgot-btn">Send Reset Link</button>
        </form>
      </div>
    </div>
  </>;
};

export default ForgotPassword;
