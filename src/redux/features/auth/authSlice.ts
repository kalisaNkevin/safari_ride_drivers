import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuth {
  user: {
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
  } | null;
  tokens?: {
    accessToken?: string | null;
    refreshToken?: string | null;
  };
  isLoggedIn: boolean;
}

export const initialState: IAuth = {
  user: null,
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuth>) => {
      const { user, tokens } = action.payload;
      state.user = user;
      state.tokens = tokens;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state = initialState;
    },
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
  },
});

export const { setCredentials, logOut, setTokens } = AuthSlice.actions;
export default AuthSlice.reducer;
export const selectCurrentUser = (state: { auth: { user: any } }) => state.auth.user;
export const selectCurrentToken = (state: { auth: { tokens: any } }) =>
  state.auth.tokens.accessToken;
