import { useContext } from "react";
import Hero from "../components/Hero";
import Instructor from "../components/Instructor";
import Technologies from "../components/Technologies";
import "../styles/Home.css";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import Footer from "../layout/Footer";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../api/services/authServices";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext)
  const logoutUser = async () => {
    await logout().then((res => {
      toast.success(res.message)
      setIsAuthenticated(false)
      setUser(null)
    })).catch(error => {
      toast.error(error.response.data.message)
    })
  }
  if (!isAuthenticated) {
    return <Navigate to={"/auth"} />
  }
  return <>
    <section className="home">
      <Hero />
      <Instructor />
      <Technologies />
      <Footer />
      <button onClick={logoutUser}>Logout</button>
    </section>
  </>;
};

export default Home;
