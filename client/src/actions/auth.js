import axios from "axios";
import jwt_decode from "jwt-decode";
import {GET_ERRORS} from './error';
import setAuthToken from "../utils/setAuthToken";
export const REGISTER_USER = "REGISTER_USER";
export const AUTH_USER = "AUTH_USER";
export const SET_CURRENT_USER = "SET_CURRENT_USER";



export const registerUser = (user,history) => {
  return dispatch => {
    axios
      .post("http://localhost:3000/api/user/saveUser", user)
      .then(res => {
        history.push('/login')
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
};

// Log user out
export const logout = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Login - Get User Token
export const authUser = credentials => dispatch => {
  axios
    .post("http://localhost:3000/api/user/authenticate", credentials)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem("token", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      localStorage.setItem("isLoggedIn", true);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log("error"));
};

// Set logged in user
export const setCurrentUser = decoded => {
  console.log(decoded);
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
