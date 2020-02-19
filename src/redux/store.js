import {createStore, combineReducers, applyMiddleware} from 'redux';
import UserReducer from './UserReducer';

export default createStore(UserReducer);