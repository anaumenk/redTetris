import {AUTHENTICATE, UNAUTHENTICATE} from "./index";
import {localStorageKeys, localStorageService} from "../store";
import {configAxios} from "../axios";
import {API, METHODS, ROUTES} from "../constants";

export const authenticate = (userId) => dispatch => {
    dispatch({
        type: AUTHENTICATE,
        payload: {
            userId
        }
    })
};

export const unauthenticate = () => dispatch => {
    dispatch({
        type: UNAUTHENTICATE,
    })
};

export function logIn(token, userId) {
    return async (dispatch) => {
        await localStorageService.createOrUpdateItem(localStorageKeys.TOKEN, token);
        dispatch(authenticate(userId));
    };
}
export function logOut() {
    return async (dispatch) => {
        await localStorageService.clear();
        dispatch(unauthenticate());
    };
}
export function checkAuthentication(history) {
    return async (dispatch) => {
        configAxios(METHODS.POST, API.CHECK_TOKEN).then((res) => {
            if (res && res.data) {
                if (!res.data.error){
                    dispatch(authenticate(res.data.data._id));
                } else {
                    history && history.push(ROUTES.ENTER);
                    dispatch(unauthenticate());
                }
            }
        })
    };
}
