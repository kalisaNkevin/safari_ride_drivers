import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boolean } from "yup";

export interface not {
  id: number;
  title: string;
  isRead: boolean;
  content: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  notificationTypeId: number;
}

export interface nots {
  totalItems: number;
  results: not[];
}

export const initialState: nots = {
  totalItems: 0,
  results: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      const { results, totalItems } = action.payload;
      state.totalItems = totalItems;
      state.results = results;
    },
    updateNotification: (state, action: PayloadAction<not>) => {
      const updatedNotification = action.payload;
      const updatedIndex = state.results.findIndex((not) => not.id === updatedNotification.id);
      if (updatedIndex !== -1) {
        state.results = state.results.map((Notification, index) =>
          index === updatedIndex ? updatedNotification : Notification
        );
      }
    },
  },
});

export const { setNotifications, updateNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
export const notificationsCollection = (state: { notifications: { results: not[] } }) =>
  state.notifications.results;
