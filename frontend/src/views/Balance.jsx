import React, { useEffect } from "react";
import SideNavbar from "../components/SideNavbar";
import NavbarWithDropdown from "../components/NavBarSmall";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Balance = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.isAuthenticated) {
      return navigate('/login');
    }
  }, []);

  return (
    <div className="mt-2 md:mt-0">
      <NavbarWithDropdown />
      <div className="flex">
        <div className="h-screen hidden md:block">
            <SideNavbar />
        </div>
        <div className="p-8 flex-auto">
          <div className="flex justify-center items-center text-3xl h-[90vh] text-gray-500 bg-slate-200 rounded-xl">
            <h1>Esta vista está en desarrollo</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
