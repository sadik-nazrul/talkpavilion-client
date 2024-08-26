import PageTitle from "../../Components/PageTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaGoogle, FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;
const image_hosting_api = `${
  import.meta.env.VITE_IMGBB_API
}?key=${image_hosting_key}`;
const Signup = () => {
  const { createUser, signInWithGoogle, updateUser, loading, setLoading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosCommon = useAxiosCommon();
  // Show password state
  const [showPassword, setShowPasword] = useState(false);

  // React Hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const profilePic = { image: data.profilePhoto[0] };
      const { data: userPhoto } = await axiosCommon.post(
        image_hosting_api,
        profilePic,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      data.profilePhoto = userPhoto.data.display_url;
      // Create User
      await createUser(data.email, data.password);
      reset();

      // Update user
      await updateUser(data.name, data.profilePhoto);
      toast.success("Account creation successfull");
      navigate(location.state ? location.state : "/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* +++Google login START+++ */
  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toast.success("Login Successfull");
      navigate(location.state ? location.state : "/");
    } catch (err) {
      toast.error(err.message);
    }
  };
  /* +++Google login END+++ */
  return (
    <div className="flex justify-center items-center min-h-screen bg-login-bg bg-cover bg-center">
      <PageTitle title={"Login"} />
      <div className="p-5 border rounded-md shadow-md lg:w-1/4 w-4/5 bg-[#d8e4e934] space-y-4">
        <h2 className="text-3xl font-semibold text-white">
          Create Your Account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 text-white"
        >
          {/* Name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Your Name</span>
            </div>
            <input
              {...register("name")}
              name="name"
              type="text"
              required
              placeholder="john doe"
              className="input input-bordered w-full bg-[#d8e4e934]"
            />
          </label>

          {/* Email */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Your Email</span>
            </div>
            <input
              {...register("email")}
              name="email"
              type="email"
              required
              placeholder="email@talkpavilion.com"
              className="input input-bordered w-full bg-[#d8e4e934]"
            />
          </label>

          {/* Password */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Password</span>
            </div>
            <div className="relative">
              <input
                {...register("password", {
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                name="password"
                required
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                className="input input-bordered w-full bg-[#d8e4e934]"
              />
              {errors.password?.type === "pattern" && (
                <ul className="text-white">
                  <li>Ensure string has a uppercase letters.</li>
                  <li>Ensure string has a lowercase letters.</li>
                  <li>Ensure string has a digits.</li>
                  <li>Ensure string has a special character.</li>
                </ul>
              )}
              <span
                className="absolute top-4 right-3 cursor-pointer"
                onClick={() => {
                  setShowPasword(!showPassword);
                }}
              >
                {showPassword ? (
                  <FaEyeSlash></FaEyeSlash>
                ) : (
                  <FaRegEye></FaRegEye>
                )}
              </span>
            </div>
          </label>

          {/* Profile picture */}
          <input
            {...register("profilePhoto")}
            type="file"
            required
            className="file-input file-input-bordered w-full bg-[#d8e4e934]"
          />

          {/* Submit Button */}
          <input
            type="submit"
            value="Register"
            className="bg-orange-500 text-white py-2 w-full rounded cursor-pointer"
          />
        </form>

        {/* Create account Link */}
        <p className="text-white">
          Already have Account!!
          <Link to="/signup" className="text-orange-400 underline">
            {" "}
            Login Now
          </Link>
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 bg-orange-500 flex gap-1 items-center rounded justify-center text-white"
        >
          <FaGoogle />
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
