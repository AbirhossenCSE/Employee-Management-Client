import React from 'react';
import { FaSyncAlt, FaShieldAlt, FaMoneyCheckAlt, FaUserCircle, FaChartLine } from 'react-icons/fa';
import SectionTitle from '../../../assets/components/SectionTitle/SectionTitle';

const benefits = [
    {
        icon: <FaSyncAlt className="text-3xl text-blue-600 dark:text-blue-400" />,
        title: "Real-time Updates",
        description: "Instant workflow and attendance updates keep your team always in sync."
    },
    {
        icon: <FaShieldAlt className="text-3xl text-blue-600 dark:text-blue-400" />,
        title: "Data Security",
        description: "Advanced encryption and secure authentication keep employee data safe."
    },
    {
        icon: <FaMoneyCheckAlt className="text-3xl text-blue-600 dark:text-blue-400" />,
        title: "Easy Payroll Handling",
        description: "Automate salary calculations, generate payslips, and track payments effortlessly."
    },
    {
        icon: <FaUserCircle className="text-3xl text-blue-600 dark:text-blue-400" />,
        title: "User-friendly Dashboards",
        description: "Role-based, intuitive dashboards designed for Employees, HR, and Admins."
    },
    {
        icon: <FaChartLine className="text-3xl text-blue-600 dark:text-blue-400" />,
        title: "Scalable Solution",
        description: "Grow your business with a system built to handle teams of all sizes."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionTitle heading="Why Choose Us" subHeading="Discover how our Employee Management System makes your workforce smarter and more efficient."></SectionTitle>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((item, idx) => (
                        <div key={idx} className="bg-base-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className=" ">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
