import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../assets/components/SectionTitle/SectionTitle";

const AdminRevew = () => {
    const axiosSecure = useAxiosSecure();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axiosSecure.get("/contact-us");
                setReviews(res.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setIsLoading(false); // Stop loading after fetching data
            }
        };
        fetchReviews();
    }, [axiosSecure]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="flex flex-col items-center">
            <SectionTitle subHeading="What Visitors Say" heading="Review Page" />
            
            {/* Loader */}
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-12 h-12 border-4 border-dashed border-orange-400 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="w-full max-w-5xl mt-10 bg-base-300 rounded-lg p-20">
                    <Slider {...settings}>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className="p-6 border rounded shadow-lg text-center">
                                    <h3 className="text-2xl  font-bold p-4">{review.name}</h3>
                                    <p className=" text-xl">{review.email}</p>
                                    <p className="mt-4 text-xl ">Message: {review.message}</p>
                                    <p className="mt-2 text-xl">
                                        Date: {new Date(review.date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-white text-xl">No reviews available.</p>
                        )}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default AdminRevew;
