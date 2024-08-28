import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState(null);
  const price = 14;

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", {
        price,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      toast.error("Payment Confirm Error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Update user role and status
        try {
          const currentUser = {
            email: user?.email,
            role: "gold",
            status: "paid",
            transactionId: paymentIntent.id,
          };
          const { data } = await axiosSecure.put(
            `/user/${user?.email}`,
            currentUser
          );
          console.log(data);
          if (data.modifiedCount > 0) {
            toast.success("You are now gold member");
          }
        } catch (err) {
          toast.error(err.message);
        }
      }
    }
  };

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : null);
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        onChange={handleCardChange}
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
        type="submit"
        disabled={!stripe || !clientSecret || !cardComplete}
        className={`bg-orange-500 text-white py-2 px-5 mt-4 rounded ${
          !cardComplete ? "cursor-not-allowed bg-[#d8e4e934]" : "cursor-pointer"
        }`}
      >
        Pay ${price}
      </button>
    </form>
  );
};

export default CheckoutForm;
