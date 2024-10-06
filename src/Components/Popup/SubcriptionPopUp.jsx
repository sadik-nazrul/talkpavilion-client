import { useEffect, useState } from "react";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SubcriptionPopUp = ({ setShowPopup }) => {
  const [alreadySubscribed, setAlreadySubscribed] = useState(false); // Control whether to show "already subscribed" message
  const axiosCommon = useAxiosCommon();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    // Trigger mutation to save subscriber data in the database
    mutateAsync({ email });
  };

  useEffect(() => {
    const isSubscribed = localStorage.getItem("isSubscribed");

    // Only show the popup if the user is not subscribed in localStorage
    if (!isSubscribed) {
      const modal = document.getElementById("my_modal");
      if (modal) {
        modal.showModal();
      }
    }
  }, []);

  // Mutation to handle subscription
  const { mutateAsync } = useMutation({
    mutationFn: async (subscriberData) => {
      const response = await axiosCommon.put("/subscribers", subscriberData);
      return response.data; // Return the response data from the backend
    },
    onSuccess: (data) => {
      if (data.message === "You are already subscribed") {
        // If the backend confirms subscription, set the localStorage and state accordingly
        localStorage.setItem("isSubscribed", true);
        setAlreadySubscribed(true); // This state change shows the "already subscribed" message
        toast.success("You are already subscribed");
      } else {
        // Handle successful new subscription
        localStorage.setItem("isSubscribed", true);
        toast.success("Subscription successful");

        // Close the modal after form submission
        const modal = document.getElementById("my_modal");
        if (modal) {
          modal.close();
        }

        // Ensure popup won't show again by updating state
        setShowPopup(false);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div>
      <dialog id="my_modal" className="modal">
        <div className="modal-box text-center">
          {alreadySubscribed ? (
            <>
              <p>You are already subscribed</p>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  const modal = document.getElementById("my_modal");
                  if (modal) {
                    modal.close();
                  }
                  // Set localStorage to indicate the user is subscribed
                  localStorage.setItem("isSubscribed", true);
                }}
              >
                ✕
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h6 className="footer-title">Newsletter</h6>
              <div className="join">
                <input
                  type="email"
                  name="email"
                  placeholder="username@site.com"
                  className="input input-bordered join-item"
                  required
                />
                <button className="btn btn-primary join-item">Subscribe</button>
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => {
                    const modal = document.getElementById("my_modal");
                    if (modal) {
                      modal.close();
                    }
                  }}
                >
                  ✕
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default SubcriptionPopUp;
