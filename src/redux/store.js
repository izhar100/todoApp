import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as modeReducer } from "./modeReducer/reducer";
import { reducer as todoReducer } from "./todoReducer/reducer";
import thunk from "redux-thunk";

const allReducer=combineReducers({
    modeReducer,
    todoReducer
})

export const store=legacy_createStore(allReducer,applyMiddleware(thunk))