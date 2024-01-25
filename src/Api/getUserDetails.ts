import apiUrlV1 from "utils/axiosInstance";

interface UserResponse {
  data: UserData;
}

interface UserData {
  id?: number;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
  description?: string;
  gender?: string;
  location?: string;
  momoPay?: string;
  emergencyNumber?: string;
  isVerified?: boolean;
  active?: boolean;
  userType?: {
    id?: number;
    name?: string;
  };
  settings?: {
    id?: number;
    twoFA?: boolean;
    themeMode?: string;
    languageId?: number;
  };
}

const getUserDetails = async (token: string): Promise<UserData> => {
  const response = await apiUrlV1.get<UserResponse>("/profile/get", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export default getUserDetails;
