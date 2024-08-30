import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const usePosts = (sortOrder = "descending", page = 1, limit = 5) => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const { data: postsData = { blogs: [], totalPages: 0 }, refetch } = useQuery({
    queryKey: ["posts", user?.email, sortOrder, page, limit],
    queryFn: async () => {
      const res = await axiosCommon.get(
        `/sortblogs?sortOrder=${sortOrder}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  return [postsData.blogs, postsData.totalPages, refetch];
};

export default usePosts;
