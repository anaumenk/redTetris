import axios from "axios";
import { METHODS } from "../constants";
import { localStorageKeys, localStorageService } from "../store";

export const configAxios = (method, url, data = {}) => {
    let response;
    const config = {
        proxy: {
            host: process.env.HOST || "http://localhost",
            port: process.env.PORT || 8000,
        }
    };
    data.token = localStorageService.readItem(localStorageKeys.TOKEN);
    switch (method) {
        case METHODS.GET:
            response = axios.get(url, config).catch(err => {
                if (err.response.status === 400 || err.response.status === 404 || err.response.status === 406) {
                    return err.response;
                }
                console.log(err);
            });
            break;
        case METHODS.POST:
            response = axios.post(url, data, config).catch(err => {
                if (err.response.status === 400 || err.response.status === 404 || err.response.status === 406) {
                    return err.response;
                }
                console.log(err);
            }) || [];
            break;
        default:
            response = [];
    }
    return response;
};
