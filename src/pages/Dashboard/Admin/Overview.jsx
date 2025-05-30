import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";

const Overview = () => {
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axios.get("https://employee-management-server-beryl-one.vercel.app/allWorkRecords")
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.error("Error fetching data", err);
            });
    }, []);

    useEffect(() => {
        // Aggregate hoursWorked by email
        const grouped = data.reduce((acc, curr) => {
            if (!acc[curr.email]) {
                acc[curr.email] = {
                    email: curr.email,
                    name: curr.EmployeeName || curr.email.split('@')[0],
                    hoursWorked: 0,
                };
            }
            acc[curr.email].hoursWorked += curr.hoursWorked;
            return acc;
        }, {});

        const result = Object.values(grouped);
        setChartData(result);
    }, [data]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Employee Work Hours Overview</h2>

            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Hours Worked', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="hoursWorked" fill="#667eea" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Overview;
