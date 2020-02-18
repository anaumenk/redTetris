import {AUTHENTICATE, UNAUTHENTICATE} from "./index";
import {localStorageKeys, localStorageService} from "../store";
import {configAxios} from "../axios";
import {API, METHODS} from "../constants";

export const authenticate = () => dispatch => {
    dispatch({
        type: AUTHENTICATE,
    })
};

export const unauthenticate = () => dispatch => {
    dispatch({
        type: UNAUTHENTICATE,
    })
};

export function logIn(token) {
    return async (dispatch) => {
        await localStorageService.createOrUpdateItem(localStorageKeys.TOKEN, token);
        dispatch(authenticate());
    };
}
export function logOut() {
    return async (dispatch) => {
        await localStorageService.clear();
        dispatch(unauthenticate());
    };
}
export function checkAuthentication() {
    return async (dispatch) => {
        configAxios(METHODS.POST, API.CHECK_TOKEN).then((res) => {
            dispatch(!res.error ? authenticate(): unauthenticate());
        })
        // console.log(auth)
        // const formattedAuth = typeof auth === "string" ?
        //     JSON.parse(auth) :
        //     null;
        // formattedAuth ? dispatch(authenticate()) : dispatch(unauthenticate());
    };
}