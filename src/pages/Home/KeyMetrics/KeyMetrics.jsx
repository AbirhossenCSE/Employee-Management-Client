import React, { useEffect, useState } from 'react';
import { FaUsers, FaProjectDiagram, FaSmile, FaBusinessTime } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import SectionTitle from '../../../assets/components/SectionTitle/SectionTitle';

const KeyMetrics = () => {
    const axiosPublic = useAxiosPublic();
    const [stats, setStats] = useState({
        employees: 0,
        projects: 50,
        satisfaction: 98,
        years: 2,
    });

    // Fetch total employees count
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axiosPublic.get('/users');
                setStats(prevStats => ({
                    ...prevStats,
                    employees: response.data.length, 
                }));
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployees();
    }, [axiosPublic]);

    return (
        <div className="bg-gray-100 py-16 px-6">
            <div className="max-w-7xl mx-auto text-center">

                <SectionTitle heading="Metrics" subHeading="Our company’s performance"></SectionTitle>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10 ">
                    <div className="bg-white shadow-lg p-6 rounded-lg text-center transition duration-300 border hover:scale-110 border-gray-400">
                        <FaUsers className="text-orange-400 text-5xl mx-auto" />
                        <h3 className="text-3xl font-bold mt-3">{stats.employees}+</h3>
                        <p className="text-gray-600">Total Employees</p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg text-center transition duration-300 border hover:scale-110 border-gray-400">
                        <FaProjectDiagram className="text-orange-400 text-5xl mx-auto" />
                        <h3 className="text-3xl font-bold mt-3">{stats.projects}+</h3>
                        <p className="text-gray-600">Successful Projects</p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg text-center transition duration-300 border hover:scale-110 border-gray-400">
                        <FaSmile className="text-orange-400 text-5xl mx-auto" />
                        <h3 className="text-3xl font-bold mt-3">{stats.satisfaction}%</h3>
                        <p className="text-gray-600">Employee Satisfaction</p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg text-center transition duration-300 border hover:scale-110 border-gray-400">
                        <FaBusinessTime className="text-orange-400 text-5xl mx-auto" />
                        <h3 className="text-3xl font-bold mt-3">{stats.years}+</h3>
                        <p className="text-gray-600">Years in Business</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeyMetrics;
