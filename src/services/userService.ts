import { axiosInstance } from "../utils/interceptor";

const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/user-details");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { getUserDetails };
