import apiUrlV1 from "utils/axiosInstance";

interface TokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

const UpdateToken = async (): Promise<TokenResponse["data"]> => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await apiUrlV1.post<TokenResponse>("/auth/refreshToken", {
    token: refreshToken,
  });
  const data = response.data.data;
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};

export default UpdateToken;
