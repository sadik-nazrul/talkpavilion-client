import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../../Hooks/useAuth";
import TagsSelect from "./TagsSelect/TagsSelect";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import PageTitle from "../../../../Components/PageTitle";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useTags from "../../../../Hooks/useTags";

const AddPost = () => {
  const { user } = useAuth();
  const axioSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [tags] = useTags();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.createdAt = new Date().toISOString();
    mutateAsync(data);
  };

  //   Mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const { data: blog } = await axioSecure.post("/add-blog", data);
      return blog;
    },
    onSuccess: () => {
      toast.success("Your Blog successfully addeded");
      navigate("/dashboard/my-posts");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
      <PageTitle title={"Add Post"} />
      {/* Author Info */}
      <div className="lg:flex gap-4 items-center">
        {/* Author Image */}
        <label className="form-control w-full">
          <div className="label">
            <span className="font-bold">Author Image</span>
          </div>
          <div className="input input-bordered w-full flex items-center gap-2">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-10 border"
            />
            <input
              type="text"
              defaultValue={user?.photoURL}
              readOnly
              name="authorPhoto"
              {...register("authorPhoto")}
            />
          </div>
        </label>

        {/* Author name */}
        <label className="form-control w-full">
          <div className="label">
            <span className="font-bold">Author name</span>
          </div>
          <input
            type="text"
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full"
            name="authorName"
            {...register("authorName")}
          />
        </label>

        {/* Author Email */}
        <label className="form-control w-full">
          <div className="label">
            <span className="font-bold">Author Email</span>
          </div>
          <input
            type="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full"
            name="authorEmail"
            {...register("authorEmail")}
          />
        </label>
      </div>

      {/* Post Title */}
      <label className="form-control w-full">
        <div className="label">
          <span className="font-bold">Post Title:</span>
        </div>
        <input
          type="text"
          required
          placeholder="Write your title here"
          className="input input-bordered w-full"
          name="postTitle"
          {...register("postTitle")}
        />
      </label>

      {/* Post Description */}
      <p className="font-bold">Post Description:</p>
      <RichTextEditor control={control} />

      {/* Tag selection */}
      <p className="font-bold">Select your Tags:</p>
      <TagsSelect tags={tags} control={control} />

      <div className="lg:flex gap-4">
        {/* UpVote */}
        <label className="form-control w-full">
          <div className="label">
            <span className="font-bold">UpVote:</span>
          </div>
          <input
            type="number"
            defaultValue={0}
            className="input input-bordered w-full"
            name="upVote"
            min={0}
            {...register("upVote")}
          />
        </label>

        {/* DownVote */}
        <label className="form-control w-full">
          <div className="label">
            <span className="font-bold">DownVote:</span>
          </div>
          <input
            type="number"
            defaultValue={0}
            className="input input-bordered w-full"
            name="downVote"
            min={0}
            {...register("downVote")}
          />
        </label>
      </div>

      <input
        type="submit"
        value="Submit"
        className="cursor-pointer px-5 py-2 rounded bg-orange-400 text-white"
      />
    </form>
  );
};

export default AddPost;
