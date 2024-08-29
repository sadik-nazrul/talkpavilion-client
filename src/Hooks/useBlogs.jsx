import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useBlogs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogsuser?email=${user?.email}`);
      return res.data;
    },
  });
  return [blogs, refetch];
};

export default useBlogs;
