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
            return search;
        })
    };
}


export function getGroups(pageIndex, pageSize, filter) {
    return function (dispatch) {
        return api.searchGroups(pageIndex, pageSize, filter).then(search => {
            search = search || {};
            //    events.itemsPerPage = pageSize;
            //    dispatch(loadReducer(ActionTypes.LOAD_EVENTS , events));
            return search;
        })
    };
}