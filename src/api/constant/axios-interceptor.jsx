import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { apiClient } from "../utils/axios-instance"
import PropTypes from "prop-types";

const AxiosInterceptor = ({ children }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)

  const token = user?.accessToken

  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      config => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor)
      apiClient.interceptors.response.eject(responseInterceptor)
    }


  }, [isAuthenticated, token, logout])

  return <>{children}</>
}

AxiosInterceptor.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AxiosInterceptor