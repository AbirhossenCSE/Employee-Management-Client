import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");

    // Fetch client secret when component mounts
    React.useEffect(() => {
        if (user.salary) {
            axiosSecure.post("/create-payment-intent", { amount: user.salary * 100 }).then((res) => {
                setClientSecret(res.data.clientSecret);
            });
        }
    }, [axiosSecure, user.salary]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user.name,
                    email: user.email,
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
        } else if (paymentIntent.status === "succeeded") {
            Swal.fire("Payment Successful!", `Transaction ID: ${paymentIntent.id}`, "success");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button className="btn btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret}>
                    Salary Amount $ {user.salary}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
