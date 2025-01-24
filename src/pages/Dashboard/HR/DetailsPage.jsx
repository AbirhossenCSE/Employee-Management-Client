import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetailsPage = () => {
    const { id } = useParams();
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const [chartData, setChartData] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data: employeeData } = await axiosSecure.get(`/employees/${id}`);
                setEmployeeDetails(employeeData);

                const { data: paymentData } = await axiosSecure.get(`/payment-history?email=${employeeData.email}`);

                const groupedData = paymentData.payments.reduce((acc, payment) => {
                    const monthYear = `${payment.month} ${payment.year}`;
                    acc[monthYear] = (acc[monthYear] || 0) + payment.paidAmount / 100;
                    return acc;
                }, {});

                const labels = Object.keys(groupedData);
                const salaryData = Object.values(groupedData);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Salary (in USD)",
                            data: salaryData,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching employee or payment details:", error);
            }
        };

        fetchDetails();

        return () => {
            setEmployeeDetails(null);
            setChartData(null);
        };
    }, [id]);

    if (!employeeDetails || !chartData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-bold mb-6"> {employeeDetails.name}'s Details</h2>
            <div className="flex items-center gap-6 mb-8">
                <img
                    src={employeeDetails.photo}
                    alt={employeeDetails.name}
                    className="w-24 h-24 rounded-full"
                />
                <div>
                    <h3 className="text-xl font-semibold">Name: {employeeDetails.name}</h3>
                    <p className="text-gray-600">Designation: {employeeDetails.designation}</p>
                </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Salary Payment</h3>

            {/* Bar Chart */}
            <div className="mb-8">
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Salary Breakdown by Month and Year",
                            },
                            tooltip: {
                                mode: "index",
                                intersect: false,
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: "Month and Year",
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Salary (in USD)",
                                },
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default DetailsPage;
