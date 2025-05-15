import React, { useEffect, useState } from "react";
import {
    FaHome,
    FaUsers,
    FaEnvelope,
    FaMoneyBill,
    FaEllipsisV,
} from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";

const Dashboard = () => {
    const [role] = useRole();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    // Custom NavLink that closes the sidebar on small screens
    const SidebarLink = ({ to, icon: Icon, children }) => {
        const handleClick = () => {
            if (window.innerWidth < 640) {
                setIsSidebarOpen(false);
            }
        };

        return (
            <li>
                <NavLink
                    to={to}
                    onClick={handleClick}
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 rounded ${
                            isActive ? "bg-indigo-400 text-white font-bold" : "hover:bg-gray-700"
                        }`
                    }
                >
                    {Icon && <Icon />} {children}
                </NavLink>
            </li>
        );
    };

    return (
        <div className="flex">
            <Helmet>
                <title>SmartEmployee | Dashboard</title>
            </Helmet>

            {/* Sidebar Toggle for Small Devices */}
            <div className="sm:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-gray-800 p-2 rounded-full bg-gray-100 shadow-md"
                >
                    <FaEllipsisV size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed sm:relative z-40 bg-gray-800 text-white min-h-screen w-64 transition-transform duration-300 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0`}
            >
                <ul className="menu p-4 space-y-1">
                    {role === "admin" && (
                        <>
                            <SidebarLink to="/dashboard/adminHome" icon={FaHome}>
                                Admin Home
                            </SidebarLink>
                            <SidebarLink to="/dashboard/all-employee-list" icon={FaUsers}>
                                All Users
                            </SidebarLink>
                            <SidebarLink to="/dashboard/payroll" icon={FaMoneyBill}>
                                Payroll
                            </SidebarLink>
                            <SidebarLink to="/dashboard/overview" icon={FaMoneyBill}>
                                Overview
                            </SidebarLink>
                        </>
                    )}

                    {role === "HR" && (
                        <>
                            <SidebarLink to="/dashboard/hrHome" icon={FaHome}>
                                HR Home
                            </SidebarLink>
                            <SidebarLink to="/dashboard/employee-list" icon={FaUsers}>
                                All Employees
                            </SidebarLink>
                            <SidebarLink to="/dashboard/progress" icon={FaUsers}>
                                Progress
                            </SidebarLink>
                        </>
                    )}

                    {role === "Employee" && (
                        <>
                            <SidebarLink to="/dashboard/employeeHome" icon={FaHome}>
                                Employee Home
                            </SidebarLink>
                            <SidebarLink to="/dashboard/work-sheet" icon={FaUsers}>
                                Work-Sheet
                            </SidebarLink>
                            <SidebarLink to="/dashboard/payment-history" icon={FaUsers}>
                                Payment History
                            </SidebarLink>
                        </>
                    )}

                    <div className="divider"></div>

                    {/* Shared Links */}
                    <SidebarLink to="/" icon={FaHome}>
                        Home
                    </SidebarLink>
                    <SidebarLink to="/contactUs" icon={FaEnvelope}>
                        Contact Us
                    </SidebarLink>
                    <SidebarLink to="/allEmployee" icon={FaUsers}>
                        All Employee
                    </SidebarLink>
                </ul>
            </div>

            {/* Sidebar Overlay for Small Devices */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
                ></div>
            )}

            {/* Main Dashboard Content */}
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
