import { apiUser } from "../constant/api-path";
import { getJsonResponse } from "../utils/axios-instance";

export const userGetProfile = () => {
  return getJsonResponse(apiUser.getProfile);
}