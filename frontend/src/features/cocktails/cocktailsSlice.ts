import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import type { Cocktail } from "../../types";
import {createCocktail, deleteCocktail, fetchAllCocktails, fetchCocktailById, toggleCocktailPublished } from "./cocktailsThunks.ts";

interface CocktailsState {
    items: Cocktail[];
    currentCocktail: Cocktail | null;
    fetchLoading: boolean;
    currentCocktailLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
    togglePublishedLoading: boolean;
}

const initialState: CocktailsState = {
    items: [],
    currentCocktail: null,
    fetchLoading: false,
    currentCocktailLoading: false,
    createLoading: false,
    deleteLoading: false,
    togglePublishedLoading: false,
}

export const cocktailsSlice = createSlice({
    name: "cocktails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCocktails.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllCocktails.fulfilled, (state, {payload: cocktails}) => {
                state.items = cocktails;
                state.fetchLoading = false;
            })
            .addCase(fetchAllCocktails.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(fetchCocktailById.pending,(state) => {
                state.currentCocktailLoading = true;
            })
            .addCase(fetchCocktailById.fulfilled,(state, {payload: cocktail}) => {
                state.currentCocktail = cocktail;
                state.currentCocktailLoading = false;
            })
            .addCase(fetchCocktailById.rejected,(state) => {
                state.currentCocktailLoading = false;
            })

            .addCase(createCocktail.pending,(state) => {
                state.createLoading = true;
            })
            .addCase(createCocktail.fulfilled,(state) => {
                state.createLoading = false;
            })
            .addCase(createCocktail.rejected,(state) => {
                state.createLoading = false;
            })

            .addCase(deleteCocktail.pending,(state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteCocktail.fulfilled,(state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteCocktail.rejected,(state) => {
                state.deleteLoading = false;
            })

            .addCase(toggleCocktailPublished.pending,(state) => {
                state.togglePublishedLoading = true;
            })
            .addCase(toggleCocktailPublished.fulfilled,(state, {payload: cocktail}) => {
                state.togglePublishedLoading = false;
                const index = state.items.findIndex(item => item._id === cocktail._id);
                if (index !== -1) {
                    state.items[index] = cocktail;
                }
            })
            .addCase(toggleCocktailPublished.rejected,(state) => {
                state.togglePublishedLoading = false;
            })
    }
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.fetchLoading;
export const selectCurrentCocktail = (state: RootState) => state.cocktails.currentCocktail;
export const selectCurrentCocktailLoading = (state: RootState) => state.cocktails.currentCocktailLoading;
export const selectCocktailCreateLoading = (state: RootState) => state.cocktails.createLoading;
export const selectCocktailDeleteLoading = (state: RootState) => state.cocktails.deleteLoading;
export const selectCocktailTogglePublishedLoading = (state: RootState) => state.cocktails.togglePublishedLoading;