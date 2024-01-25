import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Report {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  title: string;
  description: string;
  isRead: boolean;
  active: boolean;
  createdAt: string;
}

export interface Reports {
  totalItems: number;
  results: Report[];
}

export const initialState: Reports = {
  totalItems: 0,
  results: [],
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReports: (state, action) => {
      const { results, totalItems } = action.payload;
      state.totalItems = totalItems;
      state.results = results;
    },
    deleteReport: (state, action: PayloadAction<number>) => {
      const ReportId = action.payload;
      state.results = state.results.filter((report) => report.id !== ReportId);
      state.totalItems--;
    },
  },
});

export const { setReports, deleteReport } = reportsSlice.actions;
export default reportsSlice.reducer;
export const reportsCollection = (state: { reports: { results: Report[] } }) =>
  state.reports.results;
