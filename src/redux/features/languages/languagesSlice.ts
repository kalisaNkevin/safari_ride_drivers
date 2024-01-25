import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface lang {
  id: number;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface langs {
  totalItems: number;
  results: lang[];
}

export const initialState: langs = {
  totalItems: 0,
  results: [],
};

const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setLanguages: (state, action) => {
      const { results, totalItems } = action.payload;
      state.totalItems = totalItems;
      state.results = results;
    },
    addLanguage: (state, action: PayloadAction<lang>) => {
      state.results.push(action.payload);
      state.totalItems++;
    },
    updateLanguage: (state, action: PayloadAction<lang>) => {
      const updatedLanguage = action.payload;
      const updatedIndex = state.results.findIndex((lang) => lang.id === updatedLanguage.id);
      if (updatedIndex !== -1) {
        state.results = state.results.map((language, index) =>
          index === updatedIndex ? updatedLanguage : language
        );
      }
    },
    deleteLanguage: (state, action: PayloadAction<number>) => {
      const languageId = action.payload;
      state.results = state.results.filter((lang) => lang.id !== languageId);
      state.totalItems--;
    },
  },
});

export const { setLanguages, addLanguage, updateLanguage, deleteLanguage } = languagesSlice.actions;
export default languagesSlice.reducer;
export const languagesCollection = (state: { languages: { results: lang[] } }) =>
  state.languages.results;
