import React, { useState } from "react";
import { Collapse } from "react-collapse";
import SectionTitle from "../../../assets/components/SectionTitle/SectionTitle";

const Faq = () => {
    const faqs = [
        {
            question: "How do I register on the platform?",
            answer: "To register, click on the 'Sign Up' button at the top right corner, fill out the form, and submit."
        },
        {
            question: "Who can access the admin dashboard?",
            answer: "Only users with admin roles can access the admin dashboard."
        },
        {
            question: "Can I update my profile information?",
            answer: "Yes, you can update your profile information by navigating to your profile page and clicking 'Edit Profile'."
        },
        {
            question: "Is my data secure on this platform?",
            answer: "Yes, we use industry-standard security measures to protect your data."
        },
        {
            question: "Who do I contact for support?",
            answer: "You can contact our support team via the 'Contact Us' page for assistance."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-container p-6 mb-10">
            <SectionTitle
                heading='FAQ'
                subHeading='Frequently Asked Questions'
            ></SectionTitle>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item border rounded-lg">
                        <button
                            className="w-full text-left p-4 font-semibold bg-gray-100 hover:bg-gray-200"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                        </button>
                        <Collapse isOpened={openIndex === index}>
                            <div className="p-4 bg-white border-t">{faq.answer}</div>
                        </Collapse>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;

