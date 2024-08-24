import { Outlet } from "react-router-dom";
import PageTitle from "../Components/PageTitle";

const Dashboard = () => {
  return (
    <div>
      <PageTitle title={"Dashboard"} />
      <div>{/* Sidebaar */}</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
