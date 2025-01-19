import React from "react";
import { FaHome, FaUsers, FaEnvelope } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const [role] = useRole(); // Fetch the user's role
    const { user } = useAuth();

    return (
        <div className="flex">
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
                                <NavLink to="/dashboard/all-employee">
                                    <FaUsers /> All Employees
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

