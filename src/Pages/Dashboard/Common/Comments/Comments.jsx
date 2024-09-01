import { useLoaderData } from "react-router-dom";
import useUserBlogs from "../../../../Hooks/useUserBlogs";
import NodataFound from "../../../../Components/Shared/NodataFound";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Comments = () => {
  const { _id } = useLoaderData();
  const [userBlogs] = useUserBlogs();
  const axioSecure = useAxiosSecure();

  // Find the comments
  const comments = userBlogs.find((blog) => blog._id === _id)?.comments;

  // State to track selected values and button states
  const [selected, setSelected] = useState(null);

  const handleSelect = (commentId, reply) => {
    const report = {
      commentId,
      reply,
    };
    setSelected(report);
  };

  const handleReport = async (report) => {
    console.log(report);
    const { data } = await axioSecure.put(
      `comment/${report?.commentId}`,
      report
    );
    if (data.modifiedCount > 0) {
      toast.success("Your reply send Succesfully");
    }
  };

  return (
    <div>
      {comments?.length === 0 ? (
        <NodataFound />
      ) : (
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-orange-400 text-white">
              <th>#</th>
              <th>Commenter</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((comment, idx) => (
              <tr key={comment._id} className="bg-gray-200">
                <th>{idx + 1}</th>
                <td>{comment?.commenterEmail}</td>
                <td title={comment?.comment}>
                  {comment.comment.substring(0, 24)}...
                </td>
                <td className="cursor-pointer">
                  <select
                    className="bg-orange-400 text-white p-2 rounded-badge border focus:outline-none"
                    onChange={(e) => handleSelect(comment._id, e.target.value)}
                    defaultValue={comment?.reply}
                  >
                    <option value="" disabled>
                      Select feedback...
                    </option>
                    <option value="Thank You..">Thank You..</option>
                    <option value="We are sorry...">We are sorry...</option>
                    <option value="Let me Check">Let me Check</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleReport(selected)}
                    disabled={!selected}
                    className={
                      !selected ? "cursor-not-allowed" : "cursor-pointer"
                    }
                  >
                    Report
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

export default Comments;
