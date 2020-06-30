import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';



export default function groupsReducer(state = initialState.Groups, action) {

    switch (action.type) {
        case ActionTypes.LOAD_GROUPS:
            return update(state, { groups: { $set: action.data.groups } });
        case ActionTypes.LOAD_GROUP_ARTICLES:
            return update(state, { group_articles: { $set: action.data.articles } });
        case ActionTypes.LOAD_GROUP_INFO:
            return update(state, { group: { $set: action.data.group } });
        case ActionTypes.LOAD_USER_GROUPS:
            return update(state, { group: { $set: action.data.groups } });
        case ActionTypes.USER_JOIN_GROUP:
            return update(state, { joins: { $set: action.data } });
        default:
            return state;
    }

}