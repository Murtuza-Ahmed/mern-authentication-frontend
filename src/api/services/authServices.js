import { apiAuthentication } from "../constant/api-path"
import { getJsonResponse, postJsonResponse, putJsonResponse } from "../utils/axios-instance"

export const SignUp = (payload) => {
  return postJsonResponse(apiAuthentication.SignUp, payload)
}

export const SignIn = (payload) => {
  return postJsonResponse(apiAuthentication.SignIn, payload)
}

export const verifyOtp = (payload) => {
  return postJsonResponse(apiAuthentication.verifyOtp, payload)
}

export const forgotPassword = (payload) => {
  return postJsonResponse(apiAuthentication.forgotPassword, payload)
}

export const resetPassword = (token, payload) => {
  return putJsonResponse(`${apiAuthentication.resetPassword}/${token}`, payload)
}

export const logout = () => {
  return getJsonResponse(apiAuthentication.logout)
}