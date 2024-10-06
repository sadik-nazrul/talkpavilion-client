import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import SubcriptionPopUp from "../Components/Popup/SubcriptionPopUp";
import { useEffect, useState } from "react";

const Main = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isSubscribed = localStorage.getItem("isSubscribed");

    // Check on initial load if the user is subscribed
    if (!isSubscribed) {
      setShowPopup(true);
    }

    // Mouse move event to detect when user moves mouse towards tab close button (top of the browser)
    const handleMouseLeave = (e) => {
      const isSubscribed = localStorage.getItem("isSubscribed");
      // Only show popup if the user hasn't subscribed
      if (!isSubscribed && e.clientY < 50) {
        setShowPopup(true); // Show the modal if not subscribed and mouse is near top
        const modal = document.getElementById("my_modal");
        if (modal) {
          modal.showModal();
        }
      }
    };

    // Add mousemove event listener
    window.addEventListener("mousemove", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseLeave);
    };
  }, []);

  return (
    <div>
      <NavBar />
      <div className="min-h-[calc(100vh-124px)]">
        <Outlet />
      </div>
      <Footer />
      {showPopup && <SubcriptionPopUp setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Main;
