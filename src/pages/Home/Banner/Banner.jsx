import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/banner/01.jpg';
import img2 from '../../../assets/banner/02.jpg';
import img3 from '../../../assets/banner/03.jpg';
import img4 from '../../../assets/banner/04.jpg';

const slides = [
    {
        image: img1,
        title: "Expanding Across 50+ Countries",
        subtitle: "Successfully established presence in over 50 countries worldwide.",
    },
    {
        image: img2,
        title: "Customer Satisfaction at 95%",
        subtitle: "Achieved a 95% customer satisfaction rate with excellent reviews.",
    },
    {
        image: img3,
        title: "Innovating the Future",
        subtitle: "Launched cutting-edge products that revolutionized the industry.",
    },
    {
        image: img4,
        title: "Sustainable Growth",
        subtitle: "Reduced carbon footprint by 40% through sustainable practices.",
    },
];

const Banner = () => {
    return (
        <div className="relative">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={5000}
                showStatus={false}
                showArrows={false}
                swipeable
            >
                {slides.map((slide, index) => (
                    <div key={index} className="relative">
                        <img src={slide.image} alt={`Slide ${index + 1}`} className="h-screen object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent flex items-center">
                            <div className="max-w-4xl mx-auto px-6 lg:px-12 text-left">
                                <h2 className="text-white text-5xl md:text-5xl font-extrabold mb-4 animate-fade-in-down">
                                    {slide.title}
                                </h2>
                                <p className="text-white text-lg md:text-xl mb-6 animate-fade-in-up">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
