import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Error = () => {
    const location = useLocation();
    return (
        <div className='w-10/12 mx-auto'>
            <img className='mx-auto' src="https://i.ibb.co.com/NrGjttC/404.gif" alt="" />

            <Link className='btn bg-orange-400' to="/">Back Home</Link>
        </div>
    );
};

export default Error;