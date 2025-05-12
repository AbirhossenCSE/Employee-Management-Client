import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Payroll = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: payableUsers = [], isLoading } = useQuery({
        queryKey: ["payableUsers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/users/payable");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-dashed border-orange-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center mb-10">
                Payroll Management
            </h2>

            <div className="bg-base-300 rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    {payableUsers.length > 0 ? (
                        <table className="table w-full text-center">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th>Name</th>
                                    <th>Salary</th>
                                    <th>Month & Year</th>
                                    <th>Payment Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payableUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-base-200 transition-all">
                                        <td className="font-semibold">{user.name}</td>
                                        <td className="text-green-600 font-medium">${user.salary}</td>
                                        <td>
                                            {new Date().toLocaleString("default", {
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className={user.paymentDate ? "text-gray-600" : "text-red-500 font-semibold"}>
                                            {user.paymentDate
                                                ? new Date(user.paymentDate).toLocaleDateString()
                                                : "Pending"}
                                        </td>
                                        <td>
                                            <Link
                                                to="/dashboard/payment"
                                                state={{ name: user.name, email: user.email, salary: user.salary }}
                                            >
                                                <button className="btn btn-sm btn-neutral">
                                                    Pay
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            No payable users found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Payroll;
