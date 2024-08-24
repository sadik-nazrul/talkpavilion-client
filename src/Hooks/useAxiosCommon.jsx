import axios from "axios";
const axiosCommon = axios.create({
  baseURL: import.meta.env.VITE_TALKPAVILION_API,
});
const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
