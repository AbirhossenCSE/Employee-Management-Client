import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/banner/01.jpg';
import img2 from '../../../assets/banner/02.jpg';
import img3 from '../../../assets/banner/03.jpg';
import img4 from '../../../assets/banner/04.jpg';

const Banner = () => {
    return (
        <div className="relative">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                showStatus={false}
                dynamicHeight={false}
            >
                <div className="relative">
                    <img src={img1} className="h-[600px] w-full object-cover" alt="Banner 1" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <h2 className="text-white text-3xl md:text-5xl font-bold">Successfully established presence in over 50 countries worldwide.</h2>
                    </div>
                </div>
                <div className="relative">
                    <img src={img2} className="h-[600px] w-full object-cover" alt="Banner 2" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <h2 className="text-white text-3xl md:text-5xl font-bold">Achieved a 95% customer satisfaction rate with excellent reviews.</h2>
                    </div>
                </div>
                <div className="relative">
                    <img src={img3} className="h-[600px] w-full object-cover" alt="Banner 3" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <h2 className="text-white text-3xl md:text-5xl font-bold">Launched cutting-edge products that revolutionized the industry.</h2>
                    </div>
                </div>
                <div className="relative">
                    <img src={img4} className="h-[600px] w-full object-cover" alt="Banner 4" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <h2 className="text-white text-3xl md:text-5xl font-bold">Reduced carbon footprint by 40% through sustainable practices.</h2>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
