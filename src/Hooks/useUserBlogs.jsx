import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserBlogs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userBlogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userBlogs", user?.email],
    isLoading: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogsuser?email=${user?.email}`);
      return res.data;
    },
  });
  return [userBlogs, refetch, isLoading];
};

export default useUserBlogs;
