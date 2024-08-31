import useUserBlogs from "../../../../Hooks/useUserBlogs";
import { GoCommentDiscussion } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import NodataFound from "../../../../Components/Shared/NodataFound";
import PageTitle from "../../../../Components/PageTitle";
import Loading from "../../../../Components/Shared/Loading";

const MyPost = () => {
  const [userBlogs, refetch, isLoading] = useUserBlogs();

  // TODO: DELETE FEATURE IMPLEMENT
  // TODO: COMMENT FEATURE IMPLEMENT

  // handle comment
  const handleComment = (id) => {
    console.log(id);
  };
  // handle delete
  const handleDelete = (id) => {
    console.log(id);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto">
      <PageTitle title={"My Post"} />
      {!userBlogs ? (
        <NodataFound />
      ) : (
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-orange-400 text-white">
              <th>#</th>
              <th>Title</th>
              <th>UpVote</th>
              <th>DownVote</th>
              <th>Comment</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userBlogs.map((blog, idx) => (
              <tr key={blog._id} className="bg-gray-200">
                <th>{idx + 1}</th>
                <td title={blog.postTitle}>
                  {blog.postTitle.substring(0, 24)}...
                </td>
                <td>{blog?.upVote}</td>
                <td>{blog?.downVote}</td>
                <td
                  onClick={() => handleComment(blog?._id)}
                  className="cursor-pointer"
                >
                  <GoCommentDiscussion size={20} />
                </td>
                <td
                  onClick={() => handleDelete(blog?._id)}
                  className="cursor-pointer"
                >
                  <FaRegTrashAlt size={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPost;
