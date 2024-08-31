import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useArticles = () => {
  const axiosCommon = useAxiosCommon();

  //   Get articles
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosCommon.get("/blogs");
      return res.data;
    },
  });

  return;
};

export default useArticles;
