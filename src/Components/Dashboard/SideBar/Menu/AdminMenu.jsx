import MenuItem from "./MenuItem";
import { FaUserCog } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { MdOutlineAnnouncement } from "react-icons/md";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        label={"Manage User"}
        address={"manage-users"}
        icon={FaUserCog}
      />
      <MenuItem
        label={"Add Announcement"}
        address={"add-announcement"}
        icon={GrAnnounce}
      />
      <MenuItem
        label={"Announcement"}
        address={"announcement"}
        icon={MdOutlineAnnouncement}
      />
    </>
  );
};

export default AdminMenu;
