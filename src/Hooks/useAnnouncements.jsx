import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAnnouncements = () => {
  const axioSecure = useAxiosSecure();
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data: announcement } = await axioSecure.get("/announcements");
      return announcement;
    },
  });
  return [announcements, isLoading];
};

export default useAnnouncements;
