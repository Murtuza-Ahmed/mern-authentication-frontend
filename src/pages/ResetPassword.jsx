import { useContext, useState } from "react";
import "../styles/ResetPassword.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const ResetPassword = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);
  const { token } = useParams();
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  console.log("isPassword: ", password)
  console.log("confirmPassword: ", confirmPassword)

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/password/reset/${token}`, { password, confirmPassword }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      toast.success(res.data.message)
      setIsAuthenticated(true)
      setUser(res.data.user)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />
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
