import axios from "axios";
import { makeUseAxios } from "axios-hooks"
import { API_HOST } from "Constant";

export const axiosInstance = axios.create({
    baseURL: API_HOST
});

export const useAxios = makeUseAxios({
    axios: axiosInstance
});