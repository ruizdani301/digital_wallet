import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Logout = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser({});
    localStorage.removeItem("user");
    return navigate('/login');
  }, []);
};

export default Logout;
