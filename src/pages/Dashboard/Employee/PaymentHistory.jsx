import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 5;

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); 

    useEffect(() => {
        const fetchPayments = async () => {
            setIsLoading(true);
            try {
                const response = await axiosSecure.get(
                    `/payment-history?page=${currentPage}&limit=${itemsPerPage}&email=${user.email}`
                );
                setPayments(response.data.payments);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                console.error("Failed to fetch payment history", err);
            } finally {
                setIsLoading(false); 
            }
        };
        fetchPayments();
    }, [currentPage, user.email, axiosSecure]);

    const handlePageChange = (selected) => {
        setCurrentPage(selected.selected);
    };

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">{user?.displayName}'s Payment History</h2>

            {/* Loader */}
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-12 h-12 border-4 border-dashed border-indigo-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="border px-4 py-2">Month</th>
                                    <th className="border px-4 py-2">Year</th>
                                    <th className="border px-4 py-2">Amount</th>
                                    <th className="border px-4 py-2 hidden md:flex">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? (
                                    payments.map((payment) => (
                                        <tr key={payment.transactionId}>
                                            <td className="border text-center px-4 py-2">{payment.month}</td>
                                            <td className="border text-center px-4 py-2">{payment.year}</td>
                                            <td className="border text-center px-4 py-2">${payment.paidAmount}</td>
                                            <td className="border text-center px-4 py-2 hidden md:flex">{payment.transactionId}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4">No payment history available.</td>
                                    </tr>
                                )}
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
                </>
            )}
        </div>
    );
};

export default PaymentHistory;
