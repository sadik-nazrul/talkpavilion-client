import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div>{/* NaveBar */}</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
