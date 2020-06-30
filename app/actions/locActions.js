import * as ActionTypes from './actionTypes';
import * as api from '../api/LocationApi';


export function loadReducer(type, data) {
    return {
        type,
        data
    }
}

export function getLocationDetails() {
    return function (dispatch) {
        return api.getLocations().then(locations => {
            locations = locations || {};
            dispatch(loadReducer(ActionTypes.LOAD_LOCATIONS, locations));
            return locations;
        })
    };
}

export function updateLocationDetails(locs) {
    return function (dispatch) {
        return api.updateUserLocations(locs).then(resp => {
            resp = resp || {};
            dispatch(loadReducer(ActionTypes.LOAD_LOCATIONS, resp));
            return resp;
        })
    };
}

export function updateLocationDetailsForGuestUser(locations) {
    return function (dispatch) {
        if (locations.length != 0) {
            console.log("sdafjgd" , locations)
   
            dispatch(loadReducer(ActionTypes.LOAD_GUEST_LOCATION, locations));
        }
        const wait = time => new Promise((resolve) => setTimeout(resolve, time));
        return wait(1000).then(() => {
            console.log('locAction => updateLocationDetailsForGuestUser!')
            return true;
        });


    };
}

export function updateUserLocationfromradius(radius) {
    return function (dispatch) {
        return api.updateUserLocationfromradius(radius).then(resp => {
            resp = resp || {};
            dispatch(loadReducer(ActionTypes.USER_RADIUS, radius));
            return resp;
        })
    };
}

export function updateCookie(payLoad){
    return function(dispatch){
        dispatch(loadReducer("cookieClose" , payLoad))
        return;
    }
}

