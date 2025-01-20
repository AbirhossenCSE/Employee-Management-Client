import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "../../../assets/components/SectionTitle/SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const Payment = () => {
    const location = useLocation();
    const user = location.state;

    if (!user) {
        return <p>No user data found for payment. Please go back and try again.</p>;
    }

    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Please Pay the Salary" />
            <div className="max-w-lg mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm user={user} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
