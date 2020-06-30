import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';


export default function relatedArticlesReducer(state = initialState.RelatedArticles, action) {
    switch (action.type) {
        case ActionTypes.LOAD_ARTICLES_RELATED:
           return update(state, { articles: { $set: action.data.articles }, itemsPerPage: { $set: action.data.itemsPerPage }, totalArticles: { $set: action.data.totalArticles } });       
        default:
            return state;
    }
}