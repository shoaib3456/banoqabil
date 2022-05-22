import { combineReducers } from 'redux';
import loginReducer from './loginReducer/loginReducer';

export const rootReducer =  combineReducers ({
    loginReducer: loginReducer
});