import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/auth/authSlice";
import usersSlice from "./features/users/usersSlice";
import vehicleTypeSlice from "./features/vehicles/vehicleTypeSlice";
import languagesSlice from "./features/languages/languagesSlice";
import reportsSlice from "./features/reports/reportsSlice";
import notificationsSlice from "./features/notifications/notificationsSlice";
import DocsSlice from "./features/DriverDocs/DocsSlice";

export interface RootState {
  auth: ReturnType<typeof AuthSlice>;
}

export interface RootStateUsers {
  data(data: any): unknown;
  users: ReturnType<typeof usersSlice>;
}

export interface RootStateVTypes {
  data(data: any): unknown;
  vehicleTypes: ReturnType<typeof vehicleTypeSlice>;
}

export interface RootStateLang {
  data(data: any): unknown;
  languages: ReturnType<typeof languagesSlice>;
}
export interface RootStateReports {
  data(data: any): unknown;
  reports: ReturnType<typeof reportsSlice>;
}
export interface RootStateNotif {
  data(data: any): unknown;
  notifications: ReturnType<typeof notificationsSlice>;
}

export interface RootStateDrvierDocs {
  data(data: any): unknown;
  driverdocs: ReturnType<typeof DocsSlice>;
}

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    users: usersSlice,
    vehicleTypes: vehicleTypeSlice,
    languages: languagesSlice,
    reports: reportsSlice,
    notifications: notificationsSlice,
    driverdocs: DocsSlice,
  },
});

export default store;
