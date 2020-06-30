import * as ActionTypes from './actionTypes';
import * as api from '../api/ArticleApi';

export function loadReducer(type, data) {
    return {
        type: type,
        data: data
    }
}

export function getMyArticles(pageIndex, pageSize, sorting) {
    return function (dispatch) {
        return api.getMyArticles(pageIndex, pageSize, sorting).then(resp => {
            let articles = resp.articles || [];
            dispatch(loadReducer(ActionTypes.LOAD_MYARTICLE, articles));
            return resp;
        })
    };
}

export function deleteMyArticles(id) {
    return function (dispatch) {
        return api.deleteMyArticles(id).then(resp => {
            resp = resp || [];
            //    dispatch(loadReducer(ActionTypes.LOAD_MYARTICLE ,articles));
            return resp;
        })
    };
}

export function getImageUrl(file) {
    if (!file.directory || !file.fileName) {
        return function(dispatch){
            dispatch(loadReducer(ActionTypes.LOAD_IMAGE_URL, null));
        }

    }
    return function (dispatch) {
        dispatch(loadReducer(ActionTypes.LOAD_IMAGE_URL, `/media/${file.directory}/${file.fileName}`));
    };
}