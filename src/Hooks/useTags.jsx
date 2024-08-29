import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useTags = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data: tag } = await axiosSecure.get("/tags");
      return tag;
    },
  });
  return [tags];
};

export default useTags;
