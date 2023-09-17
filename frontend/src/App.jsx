import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

// @scripts
import router from "./routes/routes";
import { AuthContext } from "./context/auth";

export function App () {
  const [currentUser, setCurrentUser] = useState({
    isAuthenticated: false
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <RouterProvider router={router}/>
    </AuthContext.Provider>
  );
};
