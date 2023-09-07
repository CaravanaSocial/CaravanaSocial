import {configureStore} from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./Reducers/Reducers";


const store = configureStore({
    reducer: reducer, 
    applyMiddleware: applyMiddleware(thunk)
});

export default store;