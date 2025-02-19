import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import SectionTitle from '../../../assets/components/SectionTitle/SectionTitle';


const Services = () => {
    const axiosPublic = useAxiosPublic();

    const { data: services = [], isLoading, isError } = useQuery({
        queryKey: ['services'],
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
        <div className="bg-gray-50 w-11/12 mx-auto py-12">
            <div className="container mx-auto px-6">
                <SectionTitle subHeading="What we provide" heading='Our Services'></SectionTitle>

                <div className="grid gap-8 lg:grid-cols-2">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 border hover:scale-105 border-gray-400"
                        >
                            <div className="flex items-center mb-4">
                                <div className="text-4xl mr-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-700">{service.title}</h3>
                            </div>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
