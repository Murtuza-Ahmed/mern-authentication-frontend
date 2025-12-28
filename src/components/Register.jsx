import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignUp } from "../api/services/authServices";

const Register = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();

  const handleRegister = async (data) => {
    data.phone = `+92${data.phone}`
    try {
      const res = await SignUp(data)
      if (res.success === true) {
        toast.success(res.message)
        navigate(`/otp-verification/${res.userId}`)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return <>
    <div>
      <form
        className="auth-form"
        onSubmit={handleSubmit((data) => handleRegister(data))}
      >
        <h2>Register</h2>
        <input type="text" placeholder="Name" required {...register("name")} />
        <input type="email" placeholder="Email" required {...register("email")} />
        <div>
          <span>+92</span>
          <input type="number" placeholder="Phone" required {...register("phone")} />
        </div>
        <input type="password" placeholder="Password" required {...register("password")} />
        <div className="verification-method">
          <p>Select Verification Method</p>
          <div className="wrapper">
            <label>
              <input type="radio" name="verificationMethod" value={"email"} required {...register("verificationMethod")} />
              Email
            </label>
            <label>
              <input type="radio" name="verificationMethod" value={"phone"} required {...register("verificationMethod")} />
              Phone
            </label>
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </>;
};

export default Register;
