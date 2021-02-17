import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import infoReducer from "./info-reducer";

let reducersBunch = combineReducers({
  infoReducer: infoReducer,
});
let store = createStore(reducersBunch, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;