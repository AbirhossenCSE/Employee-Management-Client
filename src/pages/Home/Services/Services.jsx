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
        return (
            <div className="text-center text-gray-500 dark:text-gray-300 py-12">
                Loading services...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-12">
                Failed to load services. Please try again later.
            </div>
        );
    }

    return (
        <section className="py-6 ">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-2">
                <SectionTitle subHeading="What we provide" heading="Our Services" />

                <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="bg-base-200 border rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="text-4xl text-blue-600 dark:text-blue-400">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-semibold">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-base leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
