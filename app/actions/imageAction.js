import * as ActionTypes from './actionTypes';
import * as api from '../api/SearchApi';

export function loadReducer(type, data) {
    return {
        type: type,
        data: data
    }
}

export function getArticles(pageIndex, pageSize, filter) {
    return function (dispatch) {
        return api.searchArticles(pageIndex, pageSize, filter).then(search => {
            search = search || {};
            dispatch(loadReducer(ActionTypes.CROPPED_IMAGE, events));
            return search;
        })
    };
}
