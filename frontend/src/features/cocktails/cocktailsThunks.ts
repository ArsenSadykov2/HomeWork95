import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {Cocktail, CocktailMutation} from "../../types";


export const fetchAllCocktails = createAsyncThunk<Cocktail[], void>(
    'cocktails/fetchAllCocktails',
    async () => {
        const response = await axiosApi.get<Cocktail[]>('/cocktails');
        return response.data;
    }
);

export const fetchCocktailById = createAsyncThunk<Cocktail[], string>(
    'cocktails/fetchCocktailById',
    async (cocktailId) => {
        const response = await axiosApi.get<Cocktail[]>('/cocktails/' + cocktailId);
        return response.data || null;
    }
);

export const createCocktail = createAsyncThunk<void, CocktailMutation>(
    'cocktails/createCocktail',
    async (cocktailToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(cocktailToAdd) as (keyof CocktailMutation)[];
        keys.forEach(key => {
            const value = cocktailToAdd[key] as (keyof CocktailMutation);
            if(value !== null) {
                formData.append(key, value);
            }
        })
        await axiosApi.post('/cocktails', formData);
    }
);

export const deleteCocktail = createAsyncThunk<void, string>(
    'cocktails/deleteCocktail',
    async (cocktailId: string) => {
        await axiosApi.delete(`/cocktails/${cocktailId}`);
    }
);

export const toggleCocktailPublished = createAsyncThunk<Cocktail,string>(
    'cocktails/togglePublished',
    async (cocktailId: string) => {
        const response = await axiosApi.patch(`/cocktails/${cocktailId}/togglePublished`);
        return response.data.album;
    }
);
