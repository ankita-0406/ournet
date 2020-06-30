import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';


export default function commonReducer(state = initialState.Common, action) {
    switch (action.type) {
        case ActionTypes.USER_RADIUS:
            return update(state, { raduis: { $set: action.data } });     
        default:
            return state;
    }
}