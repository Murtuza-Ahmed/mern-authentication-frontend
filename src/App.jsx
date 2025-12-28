import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allRoutes } from "./routes";
import { Suspense, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { userGetProfile } from "./api/services/userServices";

const App = () => {
  const { setIsAuthenticated, setUser, setLoading, loading } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userGetProfile();
        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [setIsAuthenticated, setUser, setLoading]);

  if (loading) return null;

  return <>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {allRoutes.map((routerGroup) =>
            routerGroup.children.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))
          )}
        </Routes>
      </Suspense>
      <ToastContainer theme="colored" />
    </Router>
  </>;
};

export default App;
