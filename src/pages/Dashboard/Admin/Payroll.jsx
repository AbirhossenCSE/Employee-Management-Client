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
        return <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-dashed border-orange-400 rounded-full animate-spin"></div>
        </div>;
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-bold mb-6">Payroll Management</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-orange-400 text-white">
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Month & Year</th>
                            <th>Payment Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payableUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>${user.salary}</td>
                                <td>
                                    {new Date().toLocaleString("default", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </td>
                                <td>
                                    {user.paymentDate
                                        ? new Date(user.paymentDate).toLocaleDateString()
                                        : "Pending"}
                                </td>
                                <td>
                                    <Link
                                        to="/dashboard/payment"
                                        state={{ name: user.name, email: user.email, salary: user.salary }}
                                    >
                                        <button className="btn btn-primary">Pay</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payroll;
