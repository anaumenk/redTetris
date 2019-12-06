import { combineReducers } from "redux";
import rooms from "./rooms";
import game from "./game";

export default combineReducers({
    rooms,
    game,
})
