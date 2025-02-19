import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import SectionTitle from '../../../assets/components/SectionTitle/SectionTitle';

const LatestBlogs = () => {
    const axiosPublic = useAxiosPublic();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axiosPublic.get('/blogs');
                setBlogs(res.data.slice(0, 3)); 
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [axiosPublic]);

    return (
        <section className="bg-gray-50 py-16 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <SectionTitle heading="Latest Blogs" subHeading="Stay updated with industry insights"></SectionTitle>
              

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-400 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
                        {blogs.map(blog => (
                            <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800">{blog.title}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{blog.date}</p>
                                    <p className="text-gray-600 mt-3 line-clamp-3">{blog.excerpt}</p>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestBlogs;
