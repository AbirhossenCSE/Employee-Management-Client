import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import ContactUs from "../pages/ContactUs/ContactUs";
import Dashboard from "../Layouts/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import WorkSheet from "../pages/Dashboard/Employee/WorkSheet";
import EmployeeHr from "../pages/Dashboard/HR/EmployeeHr";
import Progress from "../pages/Dashboard/HR/Progress";
import Payroll from "../pages/Dashboard/Admin/Payroll";
import Payment from "../pages/Dashboard/Admin/Payment";
import PaymentHistory from "../pages/Dashboard/Employee/PaymentHistory";
import DetailsPage from "../pages/Dashboard/HR/DetailsPage";
import ErrorBoundary from "../assets/components/ErrorBoundary";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import HrHome from "../pages/Dashboard/HR/HrHome";
import EmployeeHome from "../pages/Dashboard/Employee/EmployeeHome";
import AllEmployee from "../pages/Shared/AllUser/AllEmployee";
import AdminRevew from "../pages/Dashboard/Employee/AdminRevew";
import AboutUs from "../pages/AboutUs/AboutUs";

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
                path: 'contactUs',
                element: <ContactUs></ContactUs>
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
    {
        path: 'allEmployee',
        element: <AllEmployee></AllEmployee>
    },
    {
        path: 'aboutUs',
        element: <AboutUs></AboutUs>
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'all-employee-list',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'adminRev',
                element: <AdminRoute><AdminRevew></AdminRevew></AdminRoute>
            },
            {
                path: 'payroll',
                element: <AdminRoute><Payroll></Payroll></AdminRoute>
            },
            {
                path: 'payment',
                element: <AdminRoute><Payment></Payment></AdminRoute> ,
              },
            // Hr
            {
                path: 'hrHome',
                element: <PrivateRoute><HrHome></HrHome></PrivateRoute>
            },
            {
                path: 'employee-list',
                element: <PrivateRoute><EmployeeHr></EmployeeHr></PrivateRoute>
            },
            {
                path: 'progress',
                element: <PrivateRoute><Progress></Progress></PrivateRoute>
            },
            {
                path: 'employee-list/details/:id',
                element: <PrivateRoute><DetailsPage></DetailsPage></PrivateRoute>
            },
            // employee
            {
                path: 'employeeHome',
                element: <PrivateRoute><EmployeeHome></EmployeeHome></PrivateRoute>
            },
            {
                path: 'work-sheet',
                element: <PrivateRoute><WorkSheet></WorkSheet></PrivateRoute>
            },
            {
                path: 'payment-history',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            },
        ]
    },
]);