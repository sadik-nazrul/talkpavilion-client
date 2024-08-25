import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";

const Main = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
