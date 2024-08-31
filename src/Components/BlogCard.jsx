import { CiClock2 } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import useBlogs from "../Hooks/useBlogs";

const BlogCard = ({ post }) => {
  const voteCount = post?.upVote + post?.downVote;
  const postId = post?._id;
  const [blogs] = useBlogs();

  // Find the number of comments for the current post
  const commentsCount =
    blogs.find((blog) => blog._id === postId)?.comments.length || 0;

  return (
    <Link to={`/blog/${postId}`}>
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
          <div className="flex gap-1 items-center">
            <FaRegComment />
            {commentsCount}
          </div>
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
