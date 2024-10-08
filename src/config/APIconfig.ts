import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const habiticaAPIconf:AxiosRequestConfig = {
    baseURL: "https://habitica.com/api/v3",
    headers: {
        "X-Client" : "7a8b3571-68cc-4e1a-8946-03ebe28ec759-EMfH" 
    }
}

export const axiosInstance:AxiosInstance = axios.create(habiticaAPIconf);