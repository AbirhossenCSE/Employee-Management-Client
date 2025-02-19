import React from 'react';
import useUsers from '../../../hooks/useUsers';
import SectionTitle from '../../../assets/components/SectionTitle/SectionTitle';

const EmployeeList = () => {
    const [users] = useUsers();
    const employees = users.filter(item => item.role === 'Employee');

    return (
        <div className="py-10 bg-base-100 min-h-screen">
            <SectionTitle subHeading="Our Employees" heading="Employees" />
            
            <div className="max-w-7xl mx-auto flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
                    {employees.map(employee => (
                        <div
                            key={employee._id}
                            className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                className="w-full h-56 object-cover"
                                src={employee.photo}
                                alt={employee.name}
                            />
                            <div className="p-6">
                                <h5 className="text-2xl font-semibold text-gray-800 mb-3">
                                    {employee.name}
                                </h5>
                                <p className="text-gray-600 text-lg">
                                    <strong>Designation:</strong> {employee.designation}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Email:</strong> {employee.email}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Salary:</strong> ${employee.salary}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Bank Account:</strong> {employee.bank_account_no}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
