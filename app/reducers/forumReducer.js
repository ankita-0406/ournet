import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';



export default function forumReducer(state = initialState.Forums, action) {
    switch (action.type) {
        case ActionTypes.LOAD_FORUMS:
                return update(state, { forums: { $set: action.data.topics }, itemsPerPage: { $set: action.data.itemsPerPage }, totalCommunities: { $set: action.data.totalCommunities } }); 
        default:
            return state;
    }

}