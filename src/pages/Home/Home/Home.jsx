import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';
import EmployeeList from '../EmployeeList/EmployeeList';
import { Helmet } from 'react-helmet';
import Faq from '../FAQ/Faq';
import KeyMetrics from '../KeyMetrics/KeyMetrics';
import Newsletter from '../Newsletter/Newsletter';
import LatestBlogs from '../Blog/LatestBlogs';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> SmartEmployee | Home</title>
            </Helmet>
            <Banner></Banner>
            <KeyMetrics></KeyMetrics>
            <LatestBlogs></LatestBlogs>
            <Services></Services>
            <EmployeeList></EmployeeList>
            <Testimonials></Testimonials> 
            <Faq></Faq> 
            <Newsletter></Newsletter>          
        </div>
    );
};

export default Home;