import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const BlogSearch = () => {
  const axiosCommon = useAxiosCommon();
  const [selectedTag, setSelectedTag] = useState("");

  const { data: tagblogs, refetch } = useQuery({
    queryKey: ["tagblogs", selectedTag],
    queryFn: async () => {
      if (selectedTag) {
        const { data: blogs } = await axiosCommon.get(
          `/blog?tag=${selectedTag}`
        );
        return blogs;
      }
      return [];
    },
    enabled: false, // Disable automatic refetching, we'll handle it manually
  });

  useEffect(() => {
    // Refetch whenever selectedTag changes
    if (selectedTag) {
      refetch();
    }
  }, [selectedTag, refetch]);

  const handleSearchChange = (event) => {
    setSelectedTag(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-124px)] bg-banner-bg bg-cover bg-center">
      <input
        type="text"
        value={selectedTag}
        onChange={handleSearchChange}
        placeholder="Enter tag to search"
        className="border py-4 px-5 rounded-t rounded-b-none lg:w-1/2 focus:outline-none"
      />

      {tagblogs && tagblogs.length > 0 && (
        <div className="lg:w-1/2 shadow bg-orange-100 p-x4 rounded-b">
          <ul className="space-y-4">
            {tagblogs.map((blog) => (
              <li key={blog._id}>
                <NavLink
                  to={`/blog/${blog?._id}`}
                  end
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-orange-400 hover:text-white ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  {blog.postTitle}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogSearch;
