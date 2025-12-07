import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allRoutes } from "./routes";

const App = () => {
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
