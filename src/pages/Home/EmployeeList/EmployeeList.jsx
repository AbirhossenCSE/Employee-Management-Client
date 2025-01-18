import React from 'react';
import useUsers from '../../../hooks/useUsers';
import SectionTitle from '../../../assets/components/SectionTitle/SectionTitle';

const EmployeeList = () => {
    const [users] = useUsers();
    const employees = users.filter(item => item.role === 'Employee');

    return (
        <div>
            <SectionTitle
                subHeading="Our Employees"
                heading="Employees"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
                {employees.map(employee => (
                    <div
                        key={employee._id}
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
                    >
                        <img
                            className="w-full h-48 object-cover"
                            src={employee.photo}
                            alt={employee.name}
                        />
                        <div className="p-6">
                            <h5 className="text-xl font-bold text-gray-800 mb-2">
                                {employee.name}
                            </h5>
                            <p className="text-gray-600 mb-1">
                                <strong>Email:</strong> {employee.email}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Designation:</strong> {employee.designation}
                            </p>
                            <p className="text-gray-600 mb-1">
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
    );
};

export default EmployeeList;
