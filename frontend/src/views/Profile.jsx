// @packages
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @scripts
import SideNavbar from "../components/SideNavbar";
import FormProfile from "../components/FormProfile";

// @auth
import { useAuth } from "../context/auth";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.isAuthenticated) {
      return navigate('/login');
    }
  }, []);

  return (
    <div className="flex">
        <div className="h-screen">
            <SideNavbar />
        </div>
        <div className="p-8 flex-auto">
        <FormProfile data={currentUser?.user}/>
        </div>
    </div>
  );
};

export default Profile;
