import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import parse from "html-react-parser";
import AuthorBox from "./AuthorBox/AuthorBox";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";
import {
  FaClock,
  FaFacebook,
  FaLinkedin,
  FaReddit,
  FaThumbsDown,
  FaThumbsUp,
  FaTwitter,
} from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import CommentBox from "./CommentBox/CommentBox";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shareUrl = `${import.meta.env.VITE_URL}/${location.pathname}`;
  const url = useParams();
  const axioSecure = useAxiosSecure();
  const [disabled, setDisabled] = useState(false);
  const { user } = useAuth();

  const {
    authorName,
    authorPhoto,
    authorEmail,
    postTitle,
    postDescription,
    createdAt,
    tags,
    _id,
  } = useLoaderData();
  const description = parse(postDescription);

  // Mutation hook for sending vote data
  const { mutateAsync } = useMutation({
    mutationFn: async (vote) => {
      if (user?.email !== authorEmail) {
        const res = await axioSecure.put("/vote", vote);
        if (res.data.modifiedCount > 0) {
          toast.success("Your vote sucessfully counted");
          setDisabled(true);
        }
        return res.data;
      }
      return toast.error("Action not Allowed cause You are the Author");
    },
  });

  // Handle vote submission
  const handleVote = (vote, id) => {
    if (user?.email) {
      const voteData = { vote, id: id.id };
      mutateAsync(voteData);
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <div>
      <div className="w-full bg-orange-100 h-[30vh] flex justify-center items-center">
        <div className="contaner">
          <h2 className="text-2xl font-bold">{postTitle}</h2>
        </div>
      </div>
      <div className="grid grid-cols-4 container mx-auto gap-5 py-5">
        <div className="shadow shadow-orange-200 rounded-xl p-5 col-span-3">
          {description}

          <div className="flex justify-evenly py-10">
            <h2 className="text-xl font-bold">Tags:</h2>
            {tags.map((tag, idx) => (
              <p className="underline" key={idx}>
                {tag?.value}
              </p>
            ))}
          </div>

          {/* Comment */}
          <CommentBox postId={_id} author={authorEmail} />
        </div>

        {/* sidebar */}
        <div className="col-span-1 border p-5 rounded-xl space-y-4">
          <AuthorBox
            name={authorName}
            photo={authorPhoto}
            email={authorEmail}
          />

          {/* Share Option */}
          <div>
            <h2 className="text-xl font-bold">Share the Post:</h2>
            <div className="flex gap-4 py-3 rounded justify-center bg-orange-400 px-4 text-white">
              <FacebookShareButton url={shareUrl}>
                <FaFacebook size={30} />
              </FacebookShareButton>

              <LinkedinShareButton url={shareUrl}>
                <FaLinkedin size={30} />
              </LinkedinShareButton>

              <RedditShareButton url={shareUrl}>
                <FaReddit size={30} />
              </RedditShareButton>

              <TwitterShareButton url={shareUrl}>
                <FaTwitter size={30} />
              </TwitterShareButton>
            </div>
          </div>

          {/* Vote option */}
          <div>
            <h2 className="text-xl font-bold">Vote Now:</h2>
            <div className="flex gap-4">
              <button disabled={disabled} onClick={() => handleVote(1, url)}>
                <FaThumbsUp size={30} />
              </button>
              <button disabled={disabled} onClick={() => handleVote(0, url)}>
                <FaThumbsDown size={30} />
              </button>
            </div>
          </div>

          {/* Publishe date */}
          <div>
            <h2 className="text-xl font-bold">Published On:</h2>
            <p className="flex gap-1 items-center">
              <FaClock />
              {createdAt
                ? new Date(createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true, // or false if you prefer 24-hour time format
                  })
                : "Not Found"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
