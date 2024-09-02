import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import useBlogs from "../../../Hooks/useBlogs";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const CommentBox = ({ postId, author }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosCommon = useAxiosCommon();
  const [blogs, refetch] = useBlogs();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Find the comments
  const comments = blogs.find((blog) => blog._id === postId)?.comments;

  // Post comment
  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      if (user.email !== author) {
        const { data: comment } = await axiosCommon.post("/comment", data);
        toast.success("Comment successful");
        reset();
        refetch();
        return comment.data;
      }
      return toast.error("Action not Allowed Cause you are the author");
    },
  });

  const onSubmit = (data) => {
    if (user?.email) {
      // Add the user's email to the comment data
      const commentData = {
        ...data,
        commenterEmail: user?.email,
      };
      mutateAsync(commentData);
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <div className="space-y-5">
      {comments ? (
        <div className="w-fit">
          <h2 className="text-xl font-semibold">
            Comments: {comments?.length}
          </h2>

          {comments.map((comment, idx) => (
            <div key={idx} className="border my-4 p-5 rounded-br-[50px]">
              <p>{comment.comment}</p>
              <p>
                {comment?.reply && (
                  <span className="text-orange-400">
                    Reply: {comment?.reply}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <div>
        <h2 className="text-xl font-medium">Write your Comment here:</h2>
        {/* Comment form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            defaultValue={postId}
            name="postId"
            {...register("postId")}
            className="hidden"
          />
          <label className="form-control">
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Write Comment here"
              name="comment"
              {...register("comment")}
            ></textarea>
          </label>

          <input
            type="submit"
            value="Comment"
            required
            className="cursor-pointer px-5 py-2 rounded bg-orange-400 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default CommentBox;
