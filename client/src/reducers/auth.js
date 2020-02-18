import { AUTHENTICATE, UNAUTHENTICATE } from '../actions';

const initialState = {
    isAuthenticated: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE:
            console.log("true")
            return {
                ...state,
                isAuthenticated: true
            };
        case UNAUTHENTICATE:
            return { isAuthenticated: false };
        default:
            return state;
    }
}
