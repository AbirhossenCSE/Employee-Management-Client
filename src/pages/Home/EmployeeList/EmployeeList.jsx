import React from "react";
import useUsers from "../../../hooks/useUsers";
import SectionTitle from "../../../assets/components/SectionTitle/SectionTitle";

const EmployeeList = () => {
    const [users, isLoading] = useUsers();
    const employees = users.filter((item) => item.role === "Employee");

    return (
        <div className="py-10 bg-base-100">
            <SectionTitle subHeading="Our Employees" heading="Employees" />

            {/* Loader */}
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-12 h-12 border-4 border-dashed border-indigo-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4">
                    {employees.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {employees.map((employee) => (
                                <div
                                    key={employee._id}
                                    className="bg-base-200 shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <img
                                        className="w-full h-52 object-cover"
                                        src={employee.photo}
                                        alt={employee.name}
                                    />
                                    <div className="p-5 space-y-2">
                                        <h3 className="text-xl font-bold text-indigo-500">
                                            {employee.name}
                                        </h3>
                                        <p className="text-sm">
                                            <span className="font-medium ">
                                                Designation:
                                            </span>{" "}
                                            {employee.designation}
                                        </p>
                                        <p className="text-sm ">
                                            <span className="font-medium ">
                                                Email:
                                            </span>{" "}
                                            {employee.email}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 text-xl mt-6">
                            No employees found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
