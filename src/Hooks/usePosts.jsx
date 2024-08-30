import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const usePosts = (sortOrder = "descending", page = 1, limit = 3) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: posts = { blogs: [], totalPages: 0 }, refetch } = useQuery({
    queryKey: ["posts", user?.email, sortOrder, page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sortblogs?sortOrder=${sortOrder}&page=${page}&limit${limit}`
      );
      return res.data;
    },
  });

  return [posts.blogs, posts.totalPages, refetch];
};

export default usePosts;
