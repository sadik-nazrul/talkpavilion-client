import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CheckoutForm.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); // Track payment success
  const price = 14;

  useEffect(() => {
    // Create a PaymentIntent as soon as the page loads
    axiosSecure.post("/create-payment-intent", { price }).then(({ data }) => {
      setClientSecret(data.clientSecret);
    });
  }, [axiosSecure, price]);

  // In your CheckoutForm component

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Get client secret
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price,
      });
      setClientSecret(data.clientSecret);

      // Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        console.log("[error]", error);
        setErrorMessage(error.message);
        setIsProcessing(false);
      } else {
        console.log("[PaymentIntent]", paymentIntent);

        // Check paymentIntent status
        if (paymentIntent.status === "succeeded") {
          // Update user data
          try {
            await axiosSecure.patch("/user/update-payment", {
              email: user.email,
              transactionId: paymentIntent.id,
            });
            setErrorMessage(null);
            toast.success("Payment successful!");
          } catch (updateError) {
            console.error("Error updating user after payment:", updateError);
            setErrorMessage("Failed to update user data. Please try again.");
          }
        } else {
          setErrorMessage("Payment was not successful. Please try again.");
        }

        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setErrorMessage(
        "There was an issue processing your payment. Please try again."
      );
      setIsProcessing(false);
    }
  };

  return (
    <div>
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
      <button
        onClick={handlePayment}
        disabled={!stripe || isProcessing || paymentSuccessful}
      >
        {isProcessing
          ? "Processing..."
          : paymentSuccessful
          ? "Payment Completed"
          : "Pay $14"}
      </button>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default CheckoutForm;
