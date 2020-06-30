import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';



export default function tagsReducer(state = initialState.UserTags, action) {

    switch (action.type) {
        case ActionTypes.LOAD_USERTAGS:
            return update(state, { tags: { $set: action.data } });
        case ActionTypes.LOAD_ALLTAGS:
            return update(state, { alltags: { $set: action.data } });
        default:
            return state;
    }

}