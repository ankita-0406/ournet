import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';


export default function locationReducer(state = initialState.Locations, action) {
    switch (action.type) {
        case ActionTypes.LOAD_LOCATIONS:
            return update(state, { locations: { $set: action.data.locations } });
        case ActionTypes.LOAD_GUEST_LOCATION:
            return update(state, { locations: { $set: action.data } });
        case "cookieClose":
            console.log("reducer trigerred//........")
            return update(state, { cookieAccpet: { $set: action.data } });

        default:
            return state;
    }
}