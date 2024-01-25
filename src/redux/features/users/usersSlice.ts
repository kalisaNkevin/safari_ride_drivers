import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id: number;
  fullName: string;
  email: string | null;
  phoneNumber: string;
  profileImage: string | null;
  description: string | null;
  gender: string | null;
  location: string | null;
  momoPay: string | null;
  emergencyNumber: string | null;
  isVerified: true;
  createdAt: string;
  updatedAt: string;
  userType: {
    id: number;
    name: number;
  };
}

export interface IUsers {
  totalItems: number;
  results: IUser[];
}

export const initialState: IUsers = {
  totalItems: 0,
  results: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      const { results, totalItems } = action.payload;
      state.totalItems = totalItems;
      state.results = results;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
export const usersCollection = (state: { users: { results: IUser[] } }) => state.users.results;
