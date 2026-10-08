import { StrictMode, } from "react";
import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import AxiosInterceptor from "./api/constant/axios-interceptor.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AxiosInterceptor>
        <App />
      </AxiosInterceptor>
    </AuthProvider>
    <SpeedInsights />
    <Analytics />
  </StrictMode>
);
