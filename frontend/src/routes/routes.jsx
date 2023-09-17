import { createBrowserRouter } from 'react-router-dom';

// @views
import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';
import Reports from '../views/Reports';
import Profile from '../views/Profile';
import Security from '../views/Security';
import Balance from '../views/Balance';
import Logout from '../views/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Error page!</div>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/reports",
    element: <Reports />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/security",
    element: <Security />
  },
  {
    path: "/charge_balance",
    element: <Balance />
  },
  {
    path: "/logout",
    element: <Logout />
  }
]);

export default router;
