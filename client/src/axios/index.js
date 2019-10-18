import axios from "axios";
import { METHODS } from "../constants";

export const configAxios = (method, url, data) => {
    let response;
    const config = {
        proxy: {
            host: process.env.HOST || "http://localhost",
            port: process.env.PORT || 8000,
        }
    };
    switch (method) {
        case METHODS.GET:
            response = axios.get(url, config).catch(err => console.log(err));
            break;
        case METHODS.POST:
            response = axios.post(url, data, config).catch(err => console.log(err));
            break;
        default:
            response = [];
    }
    return response;
};
