import React, { useEffect } from "react";
import FormLogin from "../components/FormLogin";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.isAuthenticated) {
      return navigate('/');
    }
  }, []);

  return (
      <div className="h-screen flex">
        <div className="h-full hidden md:block flex-1 bg-blanco-c">
          <span className="flex h-full items-center justify-center">
            <img src="assets/login-img.png" alt="brand login" />
          </span>
        </div>
        <div className="flex-1">
          <div className="flex h-full items-center">
            <FormLogin />
          </div>
        </div>
      </div>
  );
};

export default Login;
