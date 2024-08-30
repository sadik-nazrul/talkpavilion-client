import { CiClock2 } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  const voteCount = post?.upVote + post?.downVote;

  return (
    <Link to={`/blog/${post._id}`}>
      <div className="shadow rounded-md p-4 flex flex-col gap-4">
        <div className="flex gap-4">
          <img
            className="w-16 rounded-full"
            src={post?.authorPhoto}
            alt={post?.authorName}
          />
          <h2 className="text-lg font-medium">{post?.postTitle}</h2>
        </div>

        <div className="divider"></div>

        <div className="flex justify-between">
          <p className="flex gap-1 items-center">
            <CiClock2 />
            {post?.createdAt
              ? new Date(post.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Not Found"}
          </p>
          <p className="flex gap-1 items-center">
            <FaRegComment />
            {post?.commentCount || "No Data"}
          </p>
          <p className="flex gap-1 items-center">
            <LiaVoteYeaSolid />
            {voteCount || "No Data"}
          </p>
        </div>

        <div className="divider"></div>

        <div className="flex justify-evenly">
          {post?.tags.map((tag, idx) => (
            <p className="underline" key={idx}>
              {tag.value}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
