import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface doc {
  id: number;
  identity: {
    result: {
      documentNumber: string;
      firstName: string;
      lastName: string;
      fullName: string;
      age: number;
      dob: string;
      dob_day: number;
      dob_month: number;
      dob_year: number;
      documentType: string;
      documentSide: string;
      issuerOrg_full: string;
      issuerOrg_iso2: string;
      issuerOrg_iso3: string;
      nationality_full: string;
      nationality_iso2: string;
      nationality_iso3: string;
      internalId: string;
    };
    face: {
      isIdentical: boolean;
      confidence: string;
    };
    verification: {
      passed: boolean;
      result: {
        face: boolean;
      };
    };
    authentication: {
      score: number;
    };
    vaultid: string;
    matchrate: number;
    executionTime: number;
    responseID: string;
    quota: number;
    credit: number;
  };
  availabilityStatus: string;
  driverLicence: string | null;
  isVerified: string;
  active: boolean;
  identityImage: string | null;
  faceImage: string | null;
  driverLicenceImage: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface docs {
  totalItems: number;
  results: doc[];
}

export const initialState: docs = {
  totalItems: 0,
  results: [],
};

const DocsSlice = createSlice({
  name: "Docs",
  initialState,
  reducers: {
    setDocs: (state, action) => {
      const { results, totalItems } = action.payload;
      state.totalItems = totalItems;
      state.results = results;
    },
    updateDoc: (state: { results: doc[] }, action: PayloadAction<doc>) => {
      const updatedDoc = action.payload;
      const updatedIndex = state.results.findIndex((doc) => doc.id === updatedDoc.id);
      if (updatedIndex !== -1) {
        state.results = state.results.map((Doc, index) =>
          index === updatedIndex ? updatedDoc : Doc
        );
      }
    },
  },
});

export const { setDocs, updateDoc } = DocsSlice.actions;
export default DocsSlice.reducer;
export const DocsCollection = (state: { Docs: { results: doc[] } }) => state.Docs.results;
