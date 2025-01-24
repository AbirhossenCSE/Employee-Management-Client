import React, { useEffect } from "react";
import { FaHome, FaUsers, FaEnvelope, FaMoneyBill } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";

const Dashboard = () => {
    const [role] = useRole();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/dashboard") {
            if (role === "admin") {
                navigate("/dashboard/adminHome");
            } else if (role === "HR") {
                navigate("/dashboard/hrHome");
            } else if (role === "Employee") {
                navigate("/dashboard/employeeHome");
            }
        }
    }, [role, navigate, location.pathname]);

    return (
        <div className="flex">
            <Helmet>
                <title>SmartEmployee | Dashboard</title>
            </Helmet>
            {/* Dashboard sidebar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {/* Role-specific navigation */}
                    {role === "admin" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome /> Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-employee-list">
                                    <FaUsers /> All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/payroll">
                                    <FaMoneyBill /> Payroll
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adminRev">
                                    <FaMoneyBill /> Review
                                </NavLink>
                            </li>
                        </>
                    )}

                    {role === "HR" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/hrHome">
                                    <FaHome /> HR Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/employee-list">
                                    <FaUsers /> All Employees
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/progress">
                                    <FaUsers /> Progress
                                </NavLink>
                            </li>
                        </>
                    )}

                    {role === "Employee" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/employeeHome">
                                    <FaHome /> Employee Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/work-sheet">
                                    <FaUsers /> Work-Sheet
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/payment-history">
                                    <FaUsers /> Payment History
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Shared NavLinks */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contactUs">
                            <FaEnvelope /> Contact Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/allEmployee">
                            <FaUsers /> All Employee
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Dashboard content */}
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
