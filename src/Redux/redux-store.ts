// @ts-nocheck
import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from "redux-thunk";
import BranchesReducer from './BranchesReducer';


const reducers = combineReducers({
    BranchesReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))


export default store 