import { Outlet } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import Sidebar from "../Components/Dashboard/SideBar/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <PageTitle title={"Dashboard"} />
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
