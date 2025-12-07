import React, { useContext } from "react";
import "../styles/OtpVerification.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const OtpVerification = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);
  return <></>;
};

export default OtpVerification;
