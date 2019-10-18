import { CREATE_ROOM, GET_ROOMS } from '../actions';

const initialState = {
    rooms: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ROOMS:
            return {
                ...state,
                rooms: action.payload.rooms
            };
        case CREATE_ROOM:
            return {
                ...state,
                rooms: [...state.rooms, action.payload.room]
            };
        default:
            return state;
    }
}
