import { useContext, useState } from "react";
import "../styles/OtpVerification.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const OtpVerification = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);
  const [otp, SetOtp] = useState(["", "", "", "", ""])
  const { id } = useParams()
  // Handle Change
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value
    SetOtp(newOtp)

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  }

  // Handle Key Down
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  }

  // Handle Otp Verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");
    const data = {
      userId: id,
      otp: enteredOtp
    }

    await axios.post("http://localhost:8000/api/verify-account", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      toast.success(res.data.message)
      setIsAuthenticated(true);
      setUser(res.data.user)
    }).catch(error => {
      toast.error(error.response.data.message)
      setIsAuthenticated(false);
      setUser(null)
    })
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }
  return <>
    <div className="otp-verification-page">
      <div className="otp-container">
        <h1>OTP Verification</h1>
        <form onSubmit={handleOtpVerification} className="otp-form">
          <div className="otp-input-container">
            {
              otp.map((digits, index) => {
                return (
                  <input
                    type="text"
                    key={index}
                    value={digits}
                    maxLength={1}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otp-input"
                    id={`otp-input-${index}`}
                    autoFocus={index === 0}
                  />
                )
              })
            }
          </div>
          <button type="submit" className="verify-button">
            Verify Otp
          </button>
        </form>
      </div>
    </div>
  </>;
};

export default OtpVerification;
