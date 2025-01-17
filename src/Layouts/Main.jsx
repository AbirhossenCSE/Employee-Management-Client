import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../pages/Shared/Navbar/NavBar';
import Footer from '../pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;