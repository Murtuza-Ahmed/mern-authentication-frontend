import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  user: null,
  setUser: () => { },
  loading: true,
  setLoading: () => { }
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      loading,
      setLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
