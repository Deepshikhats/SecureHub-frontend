import { axiosInstance, axiosAuthInstance } from "../utils/interceptor";
import { setStorageItem } from "../utils/storageUtils";

const loginUser = async (payload: LoginUserCredentials) => {
  try {
    const response = await axiosAuthInstance.post("/login", payload);
    setStorageItem("_at", response.data.accessToken);
    setStorageItem("_rt", response.data.refreshToken);
    return response.data.message;
  } catch (error) {
    throw error;
  }
};
const registerUser = async (payload: SignupUserCredentials) => {
  try {
    const response = await axiosAuthInstance.post("/sign-up", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const validateToken = async () => {
  try {
    const response = await axiosInstance.get("/validate-token");
    return response.data.status;
  } catch (error) {
    return false;
  }
};

export default { loginUser, registerUser, validateToken };
