import { createBrowserRouter } from "react-router-dom";
import Home from "../security/home/pages/Home.jsx";
import Users from "../security/users/pages/Users.jsx";
import Roles from "../security/roles/pages/Roles.jsx";
import Apps from "../security/apps/pages/Apps.jsx";
import Views from "../security/views/pages/Views.jsx";
import Process from "../security/process/pages/Process.jsx";
import Privileges from "../security/privileges/pages/Privileges.jsx";
//FIC: Share 
import Error from "../share/errors/pages/Error.jsx";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/roles",
          element: <Roles />,
        },
        {
            path: "/apps",
            element: <Apps />,
        },
        {
            path: "/views",
            element: <Views />,
        },
        {
            path: "/process",
            element: <Process />,
        },
        {
            path: "/privileges",
            element: <Privileges />,
        },
      ], 
    },
  ]);
  export default router;