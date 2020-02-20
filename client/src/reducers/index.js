import { combineReducers } from "redux";
import rooms from "./rooms";
import game from "./game";
import auth from "./auth";

export default combineReducers({
    rooms,
    game,
    auth
})
