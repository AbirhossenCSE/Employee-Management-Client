import React from 'react';

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto text-center md:w-3/12 my-8">
            <h3 className="text-4xl font-bold uppercase border-b-4 py-4">{heading}</h3>
            <p className="mt-2">----{subHeading}----</p>
        </div>
    );
};

export default SectionTitle;