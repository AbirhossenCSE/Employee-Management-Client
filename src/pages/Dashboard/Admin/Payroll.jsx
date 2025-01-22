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
        return <p>Loading payroll data...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl mb-4">Payroll Management</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
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
