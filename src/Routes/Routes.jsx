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
                element: <PrivateRoute><ContactUs></ContactUs></PrivateRoute>
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
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin
            {
                path: 'all-employee-list',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'payroll',
                element: <Payroll></Payroll>
            },
            {
                path: 'payment',
                element: <Payment></Payment> ,
              },
            // Hr
            {
                path: 'employee-list',
                element: <EmployeeHr></EmployeeHr>
            },
            {
                path: 'progress',
                element: <Progress></Progress>
            },
            {
                path: 'employee-list/details/:id',
                element: <DetailsPage></DetailsPage>
                // element: <ErrorBoundary><DetailsPage></DetailsPage></ErrorBoundary>
            },
            // employee
            {
                path: 'work-sheet',
                element: <WorkSheet></WorkSheet>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
        ]
    },
]);