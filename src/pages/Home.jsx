import { useContext } from "react";
import Hero from "../components/Hero";
import Instructor from "../components/Instructor";
import Technologies from "../components/Technologies";
import "../styles/Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Footer from "../layout/Footer";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext)
  const logout = async () => {
    await axios.get("http://localhost:8000/api/logout", { withCredentials: true }).then((res => {
      toast.success(res.data.message)
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
      <button onClick={logout}>Logout</button>
    </section>
  </>;
};

export default Home;
