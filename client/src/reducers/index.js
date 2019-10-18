import { combineReducers } from "redux";
import rooms from "./rooms";
import player from "./player";

export default combineReducers({
    rooms,
    player
})
