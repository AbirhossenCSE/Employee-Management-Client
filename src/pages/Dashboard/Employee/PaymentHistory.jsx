import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import ReactPaginate from "react-paginate";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); 
    // console.log(user);
    

    useEffect(() => {
        axiosSecure
            .get(`/payment-history?page=${currentPage}&limit=${itemsPerPage}&email=${user.email}`)
            .then((response) => {
                setPayments(response.data.payments);
                setTotalPages(response.data.totalPages);
            })
            .catch((err) => console.error("Failed to fetch payment history", err));
    }, [currentPage, user.email, axiosSecure]);

    const handlePageChange = (selected) => {
        setCurrentPage(selected.selected);
    };

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{user?.displayName}'s Payment History</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-orange-400 text-white">
                            <th className="border px-4 py-2">Month</th>
                            <th className="border px-4 py-2">Year</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.transactionId}>
                                <td className="border text-center px-4 py-2">{payment.month}</td>
                                <td className="border text-center px-4 py-2">{payment.year}</td>
                                <td className="border text-center px-4 py-2">${payment.paidAmount}</td>
                                <td className="border text-center px-4 py-2">{payment.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <ReactPaginate
                    pageCount={totalPages}
                    onPageChange={handlePageChange}
                    containerClassName="flex justify-center mt-4 space-x-2"
                    activeClassName="bg-blue-500 text-white"
                    pageClassName="px-3 py-1 border rounded"
                />
            )}
        </div>
    );
};

export default PaymentHistory;
