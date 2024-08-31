import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import useFeedbacks from "../../../Hooks/useFeedbacks";

const CommentBox = ({ postId }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosCommon = useAxiosCommon();
  const [feedbacks, refetch] = useFeedbacks({ postId });

  //   Post comment
  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const { data: comment } = await axiosCommon.post("/comment", data);
      toast.success("Comment successful");
      reset();
      refetch();
      return comment.data;
    },
  });
  const onSubmit = (data) => {
    mutateAsync(data);
  };

  //   handle reply func
  const handleReply = () => {
    // do somting
  };

  return (
    <div className="space-y-5">
      {feedbacks?.comments ? (
        <div>
          <h2 className="text-xl font-semibold">
            Comments: {feedbacks?.comments?.length}
          </h2>
          {feedbacks?.comments?.map((comment, idx) => (
            <p key={idx}>{comment.comment} </p>
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
            className="cursor-pointer px-5 py-2 rounded bg-orange-400 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default CommentBox;
