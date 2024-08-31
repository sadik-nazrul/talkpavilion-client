import { useState } from "react";
import BlogCard from "../../../Components/BlogCard";
import useSortBlogs from "../../../Hooks/useSortBlogs";
import SectionIntro from "../../../Components/Shared/SectionIntro/SectionIntro";

const Blogs = () => {
  const [page, setPage] = useState(1);

  // Fetch posts using the custom hook
  const [posts, totalPages] = useSortBlogs(page);

  // Handle page navigation
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <SectionIntro
        title={"Populer Blogs"}
        subtitle={
          "Discover the hottest topics and most engaging conversations from our vibrant community."
        }
      />

      {/* Blog Posts Grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {posts?.map((post) => (
          <BlogCard key={post?._id} post={post} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`py-2 px-5 rounded ${
            page === 1
              ? "border text-orange-500 cursor-not-allowed"
              : "bg-orange-500 text-white cursor-pointer"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`py-2 px-5 rounded ${
            page === totalPages
              ? "border text-orange-500 cursor-not-allowed"
              : "bg-orange-500 text-white cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blogs;
