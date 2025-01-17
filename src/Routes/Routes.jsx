import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>,
              },
              {
                path: 'signup',
                element: <SignUp></SignUp>
              },
        ]
    },
]);