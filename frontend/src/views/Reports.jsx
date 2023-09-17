import React, { useEffect } from "react";
import SideNavbar from "../components/SideNavbar";
import ReportsLayout from "../components/ReportLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import NavbarWithDropdown from "../components/NavBarSmall";

const Reports = () => {
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
              <ReportsLayout />
          </div>
        </div>
    </div>
  );
};

export default Reports;
