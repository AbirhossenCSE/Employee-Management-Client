import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../assets/components/SectionTitle/SectionTitle";

const AdminRevew = () => {
    const axiosSecure = useAxiosSecure();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axiosSecure.get("/contact-us");
                setReviews(res.data);
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
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
            <SectionTitle
                subHeading="What Visitors Say"
                heading="Review Page"
            ></SectionTitle>

            <div className="w-full max-w-5xl mt-10 bg-orange-400 text-black rounded-lg p-20">
                <Slider {...settings}>
                    {reviews.map((review) => (
                        <div key={review._id} className="p-6 border rounded shadow-lg text-center">
                            <h3 className="text-2xl text-black font-bold p-4">{review.name}</h3>
                            <p className="text-black text-xl">{review.email}</p>
                            <p className="mt-4 text-xl text-black">Message: {review.message}</p>
                            <p className="mt-2 text-xl text-black">
                                Date: {new Date(review.date).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default AdminRevew;

