import { useContext } from "react";
import "../styles/Hero.css";
import heroImage from "../assets/img1.png";
import { AuthContext } from "../context/AuthContext";

const Hero = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="hero-section">
        <img src={heroImage} alt="hero-image" />
        <h4>Hello, {user ? user.name : "Developer"}</h4>
        <h1>Welcome to MERN Authentication</h1>
        <p>
          Complete authentication using
          MERN stack while learning OTP verification with Twilio and Nodemailer.
        </p>
      </div>
    </>
  );
};

export default Hero;
