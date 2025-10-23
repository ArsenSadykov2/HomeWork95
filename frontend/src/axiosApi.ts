import axios, {AxiosHeaders} from "axios";
import {apiUrl} from "../globalConstants.ts";
import type {RootState} from "./app/store.ts";
import type {Store} from "@reduxjs/toolkit";

const axiosApi = axios.create({
    baseURL: apiUrl,
});

export const addInterceptors = (store: Store<RootState>) => {
    axiosApi.interceptors.request.use((config) => {
        const token = store.getState().users.user?.token;
        const headers = config.headers as AxiosHeaders;
        headers.set('Authorization', token);
        return config;
    });
};

export default axiosApi;