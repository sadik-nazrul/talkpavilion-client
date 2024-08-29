import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import PageTitle from "../../../../Components/PageTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddAnnouncement = () => {
  const { user } = useAuth();
  const axioSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.createdAt = new Date().toISOString();
    mutateAsync(data);
  };

  //   Mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const { data: announce } = await axioSecure.post("/announce", data);
      return announce;
    },
    onSuccess: () => {
      toast.success("Announcemnet added successfull");
      navigate("/dashboard/announcement");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="p-5">
      <PageTitle title={"Add Announcements"} />
      <h2 className="text-2xl font-semibold text-center">
        Add Your Announcement Here
      </h2>
      <div className="divider">OR</div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="lg:flex gap-4">
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

          {/* Author Name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="font-bold">Author Name</span>
            </div>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              required
              name="author"
              {...register("author")}
              className="input input-bordered w-full"
            />
          </label>
        </div>

        {/* Title */}
        <label className="form-control w-full">
          <div className="label">
            <span className="font-bold">Title</span>
          </div>
          <input
            type="text"
            placeholder="Type your title"
            required
            name="title"
            {...register("title")}
            className="input input-bordered w-full"
          />
        </label>

        {/* Description */}
        <label className="form-control">
          <div className="label">
            <span className="font-bold">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Description"
            name="description"
            {...register("description")}
          ></textarea>
        </label>

        <input
          type="submit"
          value="Add"
          className="cursor-pointer px-5 py-2 rounded bg-orange-400 text-white"
        />
      </form>
    </div>
  );
};

export default AddAnnouncement;
