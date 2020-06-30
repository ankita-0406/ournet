import * as ActionTypes from './actionTypes';
import * as api from '../api/AuthApi';
import * as forgot from '../api/ForgotApi';
import Cookies from "universal-cookie";
import { rejects } from 'assert';


const cookie = new Cookies();

export function loginDetails(data) {
    return {
        type: ActionTypes.LOGIN,
        data: data
    }
}

export function login(username, password) {
    return function (dispatch) {
        return api.login(username, password).then(response => {
            let data = { loggedIn: true, loggedUserId: response.userId, role: response.role }
            dispatch(loginDetails(data));

            cookie.remove('auth_token', { path: '/' });
            cookie.set('auth_token', response.token, { path: '/' });
            cookie.set('loggedIn', true, { path: '/' });
            cookie.set('loggedUserId', response.userId, { path: '/' });
            cookie.set('role', response.role, { path: '/' });
            return true;
        })
    };
}

export function ForgotPassword(data) {
    return function (dispatch) {
        return forgot.forgotPassword(data).then(response => {
            return true;
        })
    };
}

export function Logout(data) {
    return function (dispatch) {
        let data = { loggedIn: false, loggedUserId: null , role: '' }
        dispatch(loginDetails(data));
        return api.logout(data).then(response => {
            cookie.remove('auth_token', { path: '/' });
            cookie.remove('loggedIn', { path: '/' });
            cookie.remove('loggedUserId', { path: '/' });
            cookie.remove('role', { path: '/' });
            return true;
        })
    };
}

export function changePassword(oldPassword, newPassword, reEnterNewPassword) {
    return function (dispatch) {
        let data = { oldPassword, newPassword, reEnterNewPassword }
        return api.changePassword(data).then(response => {
            return true;
        })
    };
}

export function Register(data) {
    return function (dispatch) {
        return api.register(data).then(response => {
            return true;
        })
    };
}

export function ConfirmRegistration(data) {
    return function (dispatch) {
        return api.confirmRegistration(data).then(response => {
            return true;
        })
    };
}

export function Resetpassword(password, data) {
    return function (dispatch) {
        return api.resetPassword(password, data).then(response => {
            return true;
        })
    };
}
