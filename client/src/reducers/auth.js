import { AUTH_USER, SET_CURRENT_USER } from './../actions/auth';
import isEmpty from '../validations/isEmpty';

const initialAppState= {
    isLoggedIn:localStorage.getItem("isLoggedIn"),
    user: {}
}

const reducer = (state=initialAppState, action )=>{
    switch(action.type){
        case  AUTH_USER:
          return [...state, action.payload];
        case SET_CURRENT_USER: 
        console.log(action.payload);
          return {
            ...state,
            isLoggedIn: !isEmpty(action.payload),
            user: action.payload
          };
        default:
          return state;
    } 
}
export default reducer;