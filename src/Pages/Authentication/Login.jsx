import { useEffect, useRef, useState } from "react";
import PageTitle from "../../Components/PageTitle";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaGoogle, FaRegEye } from "react-icons/fa6";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "../../Components/Shared/Loading";

const Login = () => {
  const { googleSignIn, loading, setLoading, resetPass, signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Show password state
  const [showPassword, setShowPasword] = useState(false);

  console.log(location);

  // React Hook form
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signin(data.email, data.password);
      toast.success("Signin Successfull");
      navigate(location.state ? location.state : "/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* +++PassWord Reset Start+++ */
  const [email, setEmail] = useState("");
  const handleReset = async () => {
    if (!email) {
      return toast.error("Write a valid email first");
    }
    try {
      await resetPass(email);
      toast.success("Check Your Email for change password");
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  /* +++PassWord Reset End+++ */

  /* +++Captcha related work START+++ */
  const [disabled, setDisabled] = useState(true);
  const captchaRef = useRef(null);
  // Captcha Engine
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        loadCaptchaEnginge(6);
      } catch (error) {
        console.error("Captcha initialization failed:", error);
      }
    }, 100); // Adjust as necessary

    return () => clearTimeout(timer);
  }, []);

  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  /* +++Captcha related work END+++ */

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

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-login-bg bg-cover bg-center">
      <PageTitle title={"Login"} />
      <div className="p-5 border rounded-md shadow-md lg:w-1/4 w-4/5 bg-[#d8e4e934] space-y-4">
        <h2 className="text-3xl font-semibold text-white">Login Now</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 text-white"
        >
          {/* Email */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Your Email</span>
            </div>
            <input
              {...register("email")}
              name="email"
              type="email"
              onBlur={(e) => setEmail(e.target.value)}
              required
              placeholder="email@talkpavilion.com"
              className="input input-bordered w-full bg-[#d8e4e934]"
            />
          </label>

          {/* Email */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Password</span>
            </div>
            <div className="relative">
              <input
                {...register("password")}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                className="input input-bordered w-full bg-[#d8e4e934]"
              />
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

          {/* captcha */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Captcha</span>
            </div>
            <LoadCanvasTemplate />
            <input
              onBlur={handleValidateCaptcha}
              ref={captchaRef}
              name="captcha"
              type="text"
              placeholder="Validate above captcha"
              className="input input-bordered w-full bg-[#d8e4e934]"
            />
          </label>

          {/* Submit Button */}
          <input
            disabled={disabled}
            type="submit"
            value="Login"
            className={`bg-orange-500 text-white py-2 w-full rounded ${
              disabled ? "cursor-not-allowed bg-[#d8e4e934]" : "cursor-pointer"
            }`}
          />
        </form>

        {/* Reset Password */}
        <div className="space-y-1">
          <button
            onClick={handleReset}
            className="text-xs hover:underline hover:text-rose-500 text-gray-400"
          >
            Forgot password?
          </button>
        </div>

        {/* Create account Link */}
        <p className="text-white">
          Don't have any Account!!
          <Link to="/signup" className="text-orange-400 underline">
            {" "}
            Create Account
          </Link>
        </p>

        {/* Google Login */}
        <button
          disabled={loading}
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

export default Login;
