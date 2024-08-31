import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAnnouncements = () => {
  const axioSecure = useAxiosSecure();
  const {
    data: announcements = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["announcements"],
    isLoading: true,
    queryFn: async () => {
      const { data: announcement } = await axioSecure.get("/announcements");
      return announcement;
    },
  });
  return [announcements, refetch, isLoading];
};

export default useAnnouncements;
