import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();

  const handleRegister = async (data) => {
    data.phone = `+92${data.phone}`
    await axios.post("http://localhost:8000/api/register", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      toast.success(res.data.message)
      navigate("/otp-verification")
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
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
