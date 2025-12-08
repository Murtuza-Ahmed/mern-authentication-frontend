import { lazy } from "react"

const Home = lazy(() => import("../pages/Home.jsx"));
const Auth = lazy(() => import("../pages/Auth.jsx"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword.jsx"));
const OtpVerification = lazy(() => import("../pages/OtpVerification.jsx"));

export const authRoutes = {
  children: [
    { path: "/", element: Home },
    { path: "/auth", element: Auth },
    { path: "/password/forgot", element: ForgotPassword },
    { path: "/password/reset/:token", element: ResetPassword },
    { path: "/otp-verification/:id", element: OtpVerification }
  ]
}