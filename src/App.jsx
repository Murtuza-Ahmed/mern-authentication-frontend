import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allRoutes } from "./routes";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";

const App = () => {
  const { setIsAuthenticated, setUser, setLoading } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/me", {
          withCredentials: true
        });
        setUser(res.data.data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return <>
    <Router>
      <Routes>
        {allRoutes.map((routerGroup) =>
          routerGroup.children.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))
        )}
      </Routes>
      <ToastContainer theme="colored" />
    </Router>
  </>;
};

export default App;
