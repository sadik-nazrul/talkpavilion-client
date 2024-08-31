import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const useSortBlogs = (page = 1, limit = 5) => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  // Define the query function to fetch posts data
  const { data: postsData = { blogs: [], totalPages: 0 } } = useQuery({
    queryKey: ["posts", user?.email, page, limit],
    queryFn: async () => {
      const res = await axiosCommon.get(
        `/sortblogs?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  // Return the posts, total pages, and refetch function
  return [postsData.blogs, postsData.totalPages];
};

export default useSortBlogs;
