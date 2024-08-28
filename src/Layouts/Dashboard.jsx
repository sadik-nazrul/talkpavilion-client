import { Outlet } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import Sidebar from "../Components/Dashboard/SideBar/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <PageTitle title={"Dashboard"} />
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
