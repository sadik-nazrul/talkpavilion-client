import React from "react";
import PageTitle from "../../../../Components/PageTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import NodataFound from "../../../../Components/Shared/NodataFound";

const Announcements = () => {
  const axioSecure = useAxiosSecure();
  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data: announcement } = await axioSecure.get("/announcements");
      return announcement;
    },
  });

  return (
    <div className="overflow-x-auto">
      <PageTitle title={"Manage Users"} />
      {announcements.length === 0 ? (
        <NodataFound />
      ) : (
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-orange-400 text-white">
              <th>#</th>
              <th>Author</th>
              <th>Title</th>
              <th>Description</th>
              <th>Creation Time</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement, idx) => (
              <tr key={announcement._id} className="bg-gray-200">
                <th>{idx + 1}</th>
                <td className="capitalize">{announcement?.authorName}</td>
                <td>{announcement?.title}</td>
                <td title={announcement.description}>
                  {announcement?.description.substring(0, 24)}...
                </td>
                {announcement?.createdAt
                  ? new Date(announcement.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Not Found"}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Announcements;
