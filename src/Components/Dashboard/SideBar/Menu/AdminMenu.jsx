import MenuItem from "./MenuItem";
import { FaUserCog } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <MenuItem label={"Manage User"} address={"manage-users"} icon={FaUserCog} />
  );
};

export default AdminMenu;
