import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';


export default function locationArticlesReducer(state = initialState.LocationArticles, action) {
    switch (action.type) {
        case ActionTypes.LOAD_GUEST_LOCATION_ARTICLES:
            return update(state, { articles: { $set: action.data.articles } });
        case ActionTypes.LOAD_ARTICLES_LOCATION:
            return update(state, { articles: { $set: action.data.articles }, itemsPerPage: { $set: action.data.itemsPerPage }, totalArticles: { $set: action.data.totalArticles } });
      

        default:
            return state;
    }
}