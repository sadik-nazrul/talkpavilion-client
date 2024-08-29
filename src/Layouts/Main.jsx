import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";

const Main = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-[calc(100vh-124px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
