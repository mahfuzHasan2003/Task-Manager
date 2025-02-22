import axios from "axios";

const useAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  });
  return instance;
};

export default useAxios;
