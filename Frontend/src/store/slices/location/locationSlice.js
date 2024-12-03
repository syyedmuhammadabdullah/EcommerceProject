import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries,fetchStates,fetchCities,fetchTowns, } from "../../../index";
const initialState = {
    loading: false,
    error: null,
    countries: null,
    states: null,
    cities: null,
    towns: null,
    villages: null
};
const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
        //fetchCountries
        .addCase(fetchCountries.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.countries = action.payload;
        })
        .addCase(fetchCountries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //fetchStates
        .addCase(fetchStates.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchStates.fulfilled, (state, action) => {
            state.loading = false;
            state.states = action.payload;
        })
        .addCase(fetchStates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

        //fetchCities
        .addCase(fetchCities.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCities.fulfilled, (state, action) => {
            state.loading = false;
            state.cities = action.payload;
        })
        .addCase(fetchCities.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //fetchTowns
        .addCase(fetchTowns.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTowns.fulfilled, (state, action) => {
            state.loading = false;
            state.towns = action.payload;
        })
        .addCase(fetchTowns.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
       
    },
});
export default locationSlice.reducer;