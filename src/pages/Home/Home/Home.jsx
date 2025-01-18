import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';
import EmployeeList from '../EmployeeList/EmployeeList';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <EmployeeList></EmployeeList>
            <Testimonials></Testimonials>            
        </div>
    );
};

export default Home;