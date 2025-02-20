import { useQuery } from "@tanstack/react-query";
import useAuth from "./use-auth";
import useAxios from "./use-axios";

const useGetTasks = (keys = [], status = "", options = {}) => {
  const axios = useAxios();
  const {
    user: { email },
  } = useAuth();
  const fetchData = async () => {
    const data = await axios.get(`/tasks/${email}?status=${status}`);
    return data.data;
  };
  return useQuery({
    queryKey: keys,
    queryFn: fetchData,
    ...options,
  });
};

export default useGetTasks;
