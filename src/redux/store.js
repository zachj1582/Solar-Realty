import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './UserReducer';
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
    userReducer,
    cartReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));