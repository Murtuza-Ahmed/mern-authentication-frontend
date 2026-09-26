// =========================AUTHENTICATION
export const apiAuthentication = {
  SignIn: "/v1/login",
  verifyOtp: '/v1/verify-account',
  SignUp: "/v1/register",
  forgotPassword: '/v1/password/forgot',
  resetPassword: '/v1/password/reset',
  logout: '/v1/logout',
}

export const apiUser = {
  getProfile: '/v1/me',
}
