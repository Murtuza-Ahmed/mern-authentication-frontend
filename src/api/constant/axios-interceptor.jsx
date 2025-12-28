import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { API_URL } from "./config"
import PropTypes from "prop-types";

const AxiosInterceptor = ({ children }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)

  const token = user?.accessToken

  useEffect(() => {
    axios.defaults.baseURL = API_URL;
    axios.defaults.withCredentials = true;

    const requestInterceptor = axios.interceptors.request.use(
      config => {
        if (token) return config;
        config.headers.Authorization = `Bearer ${token}`
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }


  }, [isAuthenticated, token, logout])

  return <>{children}</>
}

AxiosInterceptor.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AxiosInterceptor