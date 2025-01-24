import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';
import EmployeeList from '../EmployeeList/EmployeeList';
import { Helmet } from 'react-helmet';
import Faq from '../FAQ/Faq';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> SmartEmployee | Home</title>
            </Helmet>
            <Banner></Banner>
            <Services></Services>
            <EmployeeList></EmployeeList>
            <Testimonials></Testimonials> 
            <Faq></Faq>           
        </div>
    );
};

export default Home;