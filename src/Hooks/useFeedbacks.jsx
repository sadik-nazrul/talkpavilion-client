import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useFeedbacks = ({ postId }) => {
  const axiosCommon = useAxiosCommon();

  //   Get Comment
  const { data: feedbacks = [], refetch } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosCommon.get(`/blog/${postId}/comments`);
      return res.data;
    },
  });
  return [feedbacks, refetch];
};

export default useFeedbacks;
