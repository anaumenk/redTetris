import { SET_PLAYER } from '../actions';

const initialState = {
    player: {
        id: 0,
        name: ""
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PLAYER:
            return {
                ...state,
                player: action.payload.player
            };
        default:
            return state;
    }
}
