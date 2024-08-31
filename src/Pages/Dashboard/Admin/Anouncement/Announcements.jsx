import React from "react";
import PageTitle from "../../../../Components/PageTitle";
import { useMutation } from "@tanstack/react-query";
import NodataFound from "../../../../Components/Shared/NodataFound";
import Loading from "../../../../Components/Shared/Loading";
import { FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";
import useAnnouncements from "../../../../Hooks/useAnnouncements";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Announcements = () => {
  const axioSecure = useAxiosSecure();
  const [announcements, refetch, isLoading] = useAnnouncements();
  // Delete
  const handleDelete = (id) => {
    mutateAsync(id);
  };

  // Mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axioSecure.delete(`/announcement/${id}`);
      if (data?.deletedCount > 0) {
        toast.success("announcement deleted");
        refetch();
      }
      return data;
    },
  });
  if (isLoading) return <Loading />;
  return (
    <div className="overflow-x-auto">
      <PageTitle title={"Announcements"} />
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement, idx) => (
              <tr key={announcement._id} className="bg-gray-200">
                <th>{idx + 1}</th>
                <td>
                  <img
                    className="w-10 rounded-full"
                    src={announcement?.authorPhoto}
                    alt={announcement?.author}
                  />
                </td>
                <td>{announcement?.title.substring(0, 18)}</td>
                <td title={announcement.description}>
                  {announcement?.description.substring(0, 24)}...
                </td>
                <td>
                  {announcement?.createdAt
                    ? new Date(announcement.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not Found"}
                </td>
                <td className="space-x-4">
                  <button onClick={() => handleDelete(announcement?._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Announcements;
