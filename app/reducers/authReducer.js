import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import Cookies from "universal-cookie";
import update from 'react-addons-update';


const cookie = new Cookies();




export default function authReducer(state = initialState, action) {

    switch (action.type) {
        case ActionTypes.LOGIN:
            return action.data
        default:
             let uniqueKey = cookie.get('unique_user_key', {path: '/'});
             let authToken = cookie.get('auth_token', {path: '/'});
             let loggedIn = cookie.get('loggedIn', {path: '/'});
             let loggedUserId = cookie.get('loggedUserId', {path: '/'});
             let role = cookie.get('role', {path: '/'});
             if(uniqueKey && authToken && loggedIn){
                 return {
                    loggedIn,
                    loggedUserId,
                    role 
                 }
             }
            return state;
    }

}