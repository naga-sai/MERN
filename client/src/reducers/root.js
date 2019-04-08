import postReducer from "./post";
import authReducer from "./auth";
import errorReducer from "./error";
import {combineReducers} from 'redux';

const reducer =combineReducers({
    post:postReducer,
    authReducer,
    errors:errorReducer
});
export default reducer;