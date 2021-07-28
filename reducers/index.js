import post from "./post";
import user from "./Auth";
import { applyMiddleware, combineReducers } from "redux";
import { createStore } from "redux";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    user,
    post,
   
})
const middleware = applyMiddleware(thunkMiddleware)
const Store = createStore(rootReducer,middleware)

export default Store
