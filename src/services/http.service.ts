import axios from "axios";
import { httpClient } from "~/server/axios";

export const httpService = (endpoint: string, wcredentials = true) => {
    if (endpoint.includes("http://") || endpoint.includes("https://")) {
        return axios.get(endpoint, {
            headers: {
                "Accept": "application/json",
            },
            withCredentials: false,
        });
    }

    else {
        return httpClient.get(endpoint, {
            headers: {},
            withCredentials: wcredentials,
        });
    }
}