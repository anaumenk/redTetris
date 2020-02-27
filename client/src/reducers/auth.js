import { AUTHENTICATE, UNAUTHENTICATE } from '../actions';
import {UNSENT_INT} from "../constants";

const initialState = {
    isAuthenticated: false,
    user: UNSENT_INT
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.userId
            };
        case UNAUTHENTICATE:
            return {
                ...state,
                isAuthenticated: false,
                user: UNSENT_INT,
            };
        default:
            return state;
    }
}
