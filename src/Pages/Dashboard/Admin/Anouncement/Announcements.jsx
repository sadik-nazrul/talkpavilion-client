import React from "react";

const Announcements = () => {
  return (
    <div className="overflow-x-auto">
      <PageTitle title={"Manage Users"} />
      {users.length === 0 ? (
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

export default Announcements;
