import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ISchedule {
  client_schedules: any;
  id: number;
  from: string;
  to: string;
  date: string;
  ride: boolean;
  weight: number;
  sits: number;
  fareAmount: number;
  delivery: boolean;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  driverId: number;
  driver: {
    id: number;
    availabilityStatus: string;
    driverLicence: string | null;
    isVerified: boolean;
    identityImage: string | null;
    faceImage: string | null;
    driverLicenceImage: string | null;
    user: {
      id: number;
      fullName: string;
      email: string;
      phoneNumber: string;
      profileImage: string;
      description: string;
      gender: string;
      location: string | null;
      momoPay: string;
      emergencyNumber: string;
      isVerified: boolean;
    };
  };
  vehicle: {
    id: number;
    plateNumber: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    driverId: number;
    vehicleTypeId: number;
    vehicleType: {
      id: number;
      name: string;
      icon: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface ISchedules {
  totalItems: number;
  results: ISchedule[];
}

export const initialState: ISchedules = {
  totalItems: 0,
  results: [],
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    setSchedules: (state, action) => {
      const { results, totalItems } = action.payload;
      state.totalItems = totalItems;
      state.results = results;
    },
  },
});

export const { setSchedules } = schedulesSlice.actions;
export default schedulesSlice.reducer;
export const schedulesCollection = (state: { schedules: { results: ISchedule[] } }) =>
  state.schedules?.results;
