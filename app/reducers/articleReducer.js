import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';



export default function articleReducer(state = initialState.Article, action) {

    switch (action.type) {
        case ActionTypes.LOAD_ARTICLE:
            return update(state, { article: { $set: action.data } });
       

        default:
            return state;
    }

}