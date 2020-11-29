import { localStorageKeys, localStorageService } from "../store";
import { METHODS } from "../constants";
import axios from "axios";

export const configAxios = (method, url, data = {}) => {
    let response;
    const config = {
        proxy: {
            host: process.env.REACT_APP_HOST,
            port: process.env.REACT_APP_SERVER_PORT,
        }
    };
    data.token = localStorageService.readItem(localStorageKeys.TOKEN);
    switch (method) {
        case METHODS.GET:
            response = axios.get(url, config).catch(err => {
                if (err.response.status === 400 || err.response.status === 404) {
                    return err.response;
                }
                if (err.response.status === 500) {
                    return {
                        data: {
                            error: err
                        },
                    };
                }
                console.log(err);
            });
            break;
        case METHODS.POST:
            response = axios.post(url, data, config).catch(err => {
                if (err.response.status === 400 || err.response.status === 404) {
                    return err.response;
                }
                if (err.response.status === 500) {
                    return {
                        data: {
                            error: err
                        },
                    };
                }
                console.log(err);
            }) || [];
            break;
        default:
            response = [];
    }
    return response;
};
