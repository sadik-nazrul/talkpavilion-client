import { useMutation } from "@tanstack/react-query";
import PageTitle from "../../../../Components/PageTitle";
import NodataFound from "../../../../Components/Shared/NodataFound";
import useUsers from "../../../../Hooks/useUsers";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, refetch] = useUsers();
  const axioSecure = useAxiosSecure();

  //   TODO: MAKE ADMIN FEATURE
  const handleMakeAdmin = (email, role) => {
    if ((email, !role)) {
      const user = {
        email: email,
        role: "admin",
      };
      mutateAsync(user);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (user) => {
      const { data: userRole } = await axioSecure.put(
        `/make-admin/${user?.email}`,
        { role: user.role }
      );
      if (userRole.modifiedCount > 0) {
        toast.success("Succefully added as Admin");
        refetch();
      }
      return userRole;
    },
  });

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
                <td>
                  <button
                    className={
                      user?.role === "admin"
                        ? "cursor-not-allowed bg-slate-300 py-2 px-5 text-orange-400 rounded-badge"
                        : "cursor-pointer bg-orange-400 py-2 px-5 text-white rounded-badge"
                    }
                    onClick={() =>
                      handleMakeAdmin(user?.email, user?.role === "admin")
                    }
                  >
                    {user.role === "admin" ? "Already Admin" : "Make Admin"}
                  </button>
                </td>
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
