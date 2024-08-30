import { useState } from "react";
import BlogCard from "../../../Components/BlogCard";
import usePosts from "../../../Hooks/usePosts";

const Blogs = () => {
  const [sortOrder, setSortOrder] = useState("descending");
  const [page, setPage] = useState(1);
  const [posts, totalPages, refetch] = usePosts(sortOrder, page);

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
      {/* Sort Order Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {posts?.map((post) => (
          <BlogCard key={post?._id} post={post} />
        ))}
      </div>

      {/* Pagination Controls */}
      {posts.length > 5 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={`py-2 px-5 rounded ${
              page === 1
                ? "border text-orange-500 cursor-not-allowed"
                : "bg-orange-500 text-white cursor-pointer"
            } `}
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
            } `}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
