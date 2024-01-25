import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IVType {
  id: number;
  name: string;
  icon: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IVTypes {
  totalItems: number;
  results: IVType[];
}

export const initialState: IVTypes = {
  totalItems: 0,
  results: [],
};

const vehicleTypeSlice = createSlice({
  name: "vehicleTypes",
  initialState,
  reducers: {
    setVehicleTypes: (state, action) => {
      const { results, totalItems } = action.payload;
      state.totalItems = totalItems;
      state.results = results;
    },
    addVehicleTypes: (state, action: PayloadAction<IVType>) => {
      state.results.push(action.payload);
      state.totalItems++;
    },
    updateVehicleTypes: (state, action: PayloadAction<IVType>) => {
      const updatedVehicleTypes = action.payload;
      const updatedIndex = state.results.findIndex((vtype) => vtype.id === updatedVehicleTypes.id);
      if (updatedIndex !== -1) {
        state.results = state.results.map((VehicleTypes, index) =>
          index === updatedIndex ? updatedVehicleTypes : VehicleTypes
        );
      }
    },
    deleteVehicleTypes: (state, action: PayloadAction<number>) => {
      const VehicleTypesId = action.payload;
      state.results = state.results.filter((vtype) => vtype.id !== VehicleTypesId);
      state.totalItems--;
    },
  },
});

export const { setVehicleTypes, addVehicleTypes, updateVehicleTypes, deleteVehicleTypes } =
  vehicleTypeSlice.actions;
export default vehicleTypeSlice.reducer;
export const vehicleTypesCollection = (state: { vehicleTypes: { results: IVType[] } }) =>
  state.vehicleTypes.results;
