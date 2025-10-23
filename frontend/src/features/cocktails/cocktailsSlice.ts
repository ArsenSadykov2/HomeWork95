import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import type { Cocktail } from "../../types";
import {createCocktail, deleteCocktail, fetchAllCocktails, fetchCocktailById, toggleCocktailPublished } from "./cocktailsThunks.ts";


interface CocktailsState {
    items: Cocktail[];
    item: Cocktail | null;
    fetchLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
    togglePublishedLoading: boolean;
}

const initialState: CocktailsState = {
    items: [],
    item: null,
    fetchLoading: false,
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
            .addCase(fetchAllCocktails.fulfilled, (state, {payload: albums}) => {
                state.items = albums;
                state.fetchLoading = false;
            })
            .addCase(fetchAllCocktails.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(fetchCocktailById.pending,(state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchCocktailById.fulfilled,(state, {payload: albums}) => {
                state.items = albums;
                state.fetchLoading = false;
            })
            .addCase(fetchCocktailById.rejected,(state) => {
                state.fetchLoading = false;
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
            .addCase(toggleCocktailPublished.fulfilled,(state, {payload: album}) => {
                state.togglePublishedLoading = false;
                const index = state.items.findIndex(albumId => albumId._id === album._id);
                if (index !== -1) {
                    state.items[index] = album;
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
export const selectCocktailCreateLoading = (state: RootState) => state.cocktails.createLoading;
export const selectCocktailDeleteLoading = (state: RootState) => state.cocktails.deleteLoading;
export const selectCocktailTogglePublishedLoading = (state: RootState) => state.cocktails.togglePublishedLoading;