import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useBlogs = () => {
  const axiosCommon = useAxiosCommon();
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    isLoading: true,
    queryFn: async () => {
      const { data: blogs } = await axiosCommon.get("/blogs");
      return blogs;
    },
  });

  return [blogs, isLoading];
};

export default useBlogs;
