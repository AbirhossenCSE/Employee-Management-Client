import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/banner/01.jpg'
import img2 from '../../../assets/banner/02.jpg'
import img3 from '../../../assets/banner/03.png'


const Banner = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;