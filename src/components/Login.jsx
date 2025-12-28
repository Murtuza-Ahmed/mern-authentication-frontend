import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SignIn } from "../api/services/authServices";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm();

  const handleLogin = async (data) => {
    await SignIn(data).then((res) => {
      toast.success(res.message)
      setIsAuthenticated(true)
      setUser(res.user)
      navigate("/")
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }

  return <>
    <form
      className="auth-form"
      onSubmit={handleSubmit((data) => handleLogin(data))}
    >
      <h2>Login</h2>
      <input type="emailOrPhone" placeholder="Email" required {...register("emailOrPhone")} />
      <input
        type="password"
        placeholder="Password"
        required {...register("password")}
      />
      <p className="forgot-password">
        <Link to={"/password/forgot"}>Forgot your password?</Link>
      </p>
      <button type="submit">Login</button>
    </form>
  </>;
};

export default Login;
