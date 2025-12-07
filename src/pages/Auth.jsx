import { useContext, useState } from "react";
import "../styles/Auth.css";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  if (loading) return <div>Loading...</div>;
  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  return <>
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-toggle">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  </>;
};

export default Auth;
