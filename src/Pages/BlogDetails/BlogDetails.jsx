import { useLoaderData, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import AuthorBox from "./AuthorBox/AuthorBox";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";
import { FaFacebook, FaLinkedin, FaReddit, FaTwitter } from "react-icons/fa6";

const BlogDetails = () => {
  const location = useLocation();
  const shareUrl = `${import.meta.env.VITE_URL}/${location.pathname}`;

  const {
    authorName,
    authorPhoto,
    authorEmail,
    postTitle,
    postDescription,
    createdAt,
    tags,
    upVote,
    downVote,
    _id,
  } = useLoaderData();
  const description = parse(postDescription);

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
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
