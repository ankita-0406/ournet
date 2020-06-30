import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';



export default function myprofileReducer(state = initialState.MyArticle, action) {

    switch (action.type) {
        case ActionTypes.LOAD_MYARTICLE:
                return update(state, { article: { $set: action.data } }); 
        default:
            return state;
    }

}