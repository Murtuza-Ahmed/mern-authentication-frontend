import { useContext, useState } from "react";
import "../styles/ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { resetPassword } from "../api/services/authServices";

const ResetPassword = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const { token } = useParams();
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const payload = { password, confirmPassword }
    await resetPassword(token, payload)
      .then((res) => {
        toast.success(res.message)
        setIsAuthenticated(true)
        navigate("/")
        setUser(res.user)
      }).catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  return (
    <>
      <div className="reset-password-page">
        <div className="reset-password-container">
          <h2>Reset Password</h2>
          <form onSubmit={handleResetPassword} className="reset-password-form">
            <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="reset-input" />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="reset-input" />
            <button className="reset-btn" type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
