import { combineReducers } from "redux";
import rooms from "./rooms";
import player from "./player";
import game from "./game";

export default combineReducers({
    rooms,
    player,
    game,
})
