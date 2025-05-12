import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");

    // console.log("User Info:", user);
    // console.log("Client Secret:", clientSecret);
    // Fetch client secret when component mounts
    useEffect(() => {
        if (user?.salary) {
            axiosSecure.post("/create-payment-intent", { amount: user?.salary * 100 }).then((res) => {
                setClientSecret(res.data.clientSecret);
            });
        }
    }, [axiosSecure, user?.salary]);

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
            // Send payment data to the backend
            const paymentData = {
                transactionId: paymentIntent.id,
                paidAmount: paymentIntent.amount / 100,
                employeeName: user.name,
                employeeEmail: user.email,
            };

            axiosSecure.post("/payments", paymentData)
                .then((res) => {
                    console.log("Payment saved successfully:", res.data);
                    if (res.data.insertedId) {
                        Swal.fire("Payment Successful!", `Transaction ID: ${paymentIntent.id}`, "success");
                    }
                })
                .catch((err) => {
                    console.error("Error Response:", err.response.data);
                });

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
                                    color: "#FFA500",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button className="btn btn-neutral mt-8" type="submit" disabled={!stripe || !clientSecret}>
                    Pay Salary Amount $ {user.salary}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
