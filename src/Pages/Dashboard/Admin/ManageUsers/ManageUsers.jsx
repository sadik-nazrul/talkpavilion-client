import { FaRegTrashAlt } from "react-icons/fa";
import PageTitle from "../../../../Components/PageTitle";
import NodataFound from "../../../../Components/Shared/NodataFound";
import useRole from "../../../../Hooks/useRole";
import useUsers from "../../../../Hooks/useUsers";
import Loading from "../../../../Components/Shared/Loading";

const ManageUsers = () => {
  const [role] = useRole();
  const [users, refetch, isLoading] = useUsers();

  //   TODO: MAKE ADMIN FEATURE

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto">
      <PageTitle title={"Manage Users"} />
      {!users ? (
        <NodataFound />
      ) : (
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-orange-400 text-white">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="bg-gray-200">
                <th>{idx + 1}</th>
                <td className="capitalize">{user?.name}</td>
                <td>{user.email}</td>
                <td>Make Admin</td>
                <td className="capitalize">{user?.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
