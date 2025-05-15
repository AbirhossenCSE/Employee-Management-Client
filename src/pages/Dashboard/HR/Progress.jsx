import React, { useState, useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Progress = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const { data: records = [], isLoading } = useQuery({
        queryKey: ["allWorkRecords"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allWorkRecords");
            return res.data;
        },
    });

    const employeeNames = useMemo(() => {
        const uniqueNames = new Set(records.map((record) => record.email));
        return [...uniqueNames];
    }, [records]);

    const filteredRecords = useMemo(() => {
        const month = selectedMonth.getMonth();
        const year = selectedMonth.getFullYear();

        return records.filter((record) => {
            const recordDate = new Date(record.date);
            const matchesEmployee = selectedEmployee
                ? record.email === selectedEmployee
                : true;
            const matchesMonth =
                recordDate.getMonth() === month && recordDate.getFullYear() === year;

            return matchesEmployee && matchesMonth;
        });
    }, [records, selectedEmployee, selectedMonth]);

    // **Loading State: Show Spinner While Data Fetching**
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-dashed border-orange-400 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-bold mb-6">All Employee Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="">All Employees</option>
                    {employeeNames.map((name, index) => (
                        <option key={name || index} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
                <ReactDatePicker
                    selected={selectedMonth}
                    onChange={(date) => setSelectedMonth(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    className="input input-bordered"
                />
            </div>

            {/* Table for large screens */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th>#</th>
                            <th>Employee</th>
                            <th>Task</th>
                            <th>Hours Worked</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.length > 0 ? (
                            filteredRecords.map((record, index) => (
                                <tr key={record._id}>
                                    <td>{index + 1}</td>
                                    <td>{record.email}</td>
                                    <td>{record.task}</td>
                                    <td>{record.hoursWorked}</td>
                                    <td>{new Date(record.date).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Card format for small and medium screens */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 px-4">
                {filteredRecords.length > 0 ? (
                    filteredRecords.map((record, index) => (
                        <div
                            key={record._id}
                            className="bg-base-200 rounded-xl shadow-md p-4 border border-gray-200 w-full"
                        >
                            <p className="text-sm">
                                <span className="font-semibold ">Employee: </span>{" "}
                                {record.email}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Task:</span>{" "}
                                {record.task}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Hours Worked:</span>{" "}
                                {record.hoursWorked}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Date:</span>{" "}
                                {new Date(record.date).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No records found.</p>
                )}
            </div>


        </div>
    );
};

export default Progress;
