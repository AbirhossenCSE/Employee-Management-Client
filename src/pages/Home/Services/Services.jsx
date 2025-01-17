import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const Services = () => {
    const axiosPublic = useAxiosPublic();

    const { data: services = [], isLoading, isError } = useQuery({
        queryKey: ['services'], // Corrected to object format
        queryFn: async () => {
            const response = await axiosPublic.get('/services');
            return response.data;
        }
    });

    if (isLoading) {
        return <div className="text-center text-gray-500">Loading services...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Failed to load services. Please try again later.</div>;
    }

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Services</h2>

                <div className="grid gap-8 lg:grid-cols-2">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200"
                        >
                            <div className="flex items-center mb-4">
                                <div className="text-4xl mr-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-700">{service.title}</h3>
                            </div>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <button className="btn btn-primary px-6 py-3 rounded-md">Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default Services;
