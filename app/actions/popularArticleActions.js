import * as ActionTypes from './actionTypes';
import * as api from '../api/ArticleApi';


export function loadReducer(type,data) {
    return{
        type,
        data
    }
    
}

export function getPopularArticles(categoryId, pageIndex, pageSize, filter){
    return function (dispatch){
           return api.getPopularArticles(categoryId, pageIndex, pageSize, filter).then( articles =>{              
               articles = articles || {};
               articles.itemsPerPage = pageSize;
               //console.log(articles);
               dispatch(loadReducer(ActionTypes.LOAD_ARTICLES_POPULAR , articles));
               return articles ;
           })
    };
}

export function getLocationArticles(categoryId, pageIndex, pageSize, filter){
    return function (dispatch){
           return api.getPopularArticles(categoryId, pageIndex, pageSize, filter).then( articles =>{
                articles = articles || {};
               articles.itemsPerPage = pageSize;
               //console.log(articles);
               dispatch(loadReducer(ActionTypes.LOAD_ARTICLES_LOCATION ,articles));
               return articles ;
           })
    };
}

export function getAuthorArticles(categoryId, pageIndex, pageSize, filter){
    return function (dispatch){
           return api.getPopularArticles(categoryId, pageIndex, pageSize, filter).then( articles =>{              
               articles = articles || {};
               articles.itemsPerPage = pageSize;
               dispatch(loadReducer(articles));
               return articles ;
           })
    };
}

export function getrelatedArticles(articleId){
    return function (dispatch){
           return api.getRelatedArticles(articleId).then( articles =>{    
               articles = articles || [];
               dispatch(loadReducer(ActionTypes.LOAD_ARTICLES_RELATED ,articles));
               return articles ;
           })
    };
}

export function saveArticle(articledetails){
    return function (dispatch){
           return api.saveArticle(articledetails).then( resp =>{  
               resp = resp || [];
             //  dispatch(loadReducer(ActionTypes.LOAD_ARTICLES_RELATED ,articles));
               return resp ;
           })
    };
}

export function publishArticle(articleId){
    return function (dispatch){
           return api.publishArticle(articleId).then( resp =>{  
               resp = resp || [];
             //  dispatch(loadReducer(ActionTypes.LOAD_ARTICLES_RELATED ,articles));
               return resp ;
           })
    };
}

export function getGuestLocationArticles(lat,lng,radius,pageIndex,pageSize,top){
    return function (dispatch){
           return api.getguestLocationArticles(lat,lng,radius,pageIndex,pageSize,top).then( articles =>{
                articles = articles || {};
               dispatch(loadReducer(ActionTypes.LOAD_GUEST_LOCATION_ARTICLES ,articles));
               return articles ;
           })
    };
}


export function getArticlebySlug(slugId){
    return function (dispatch){
           return api.getarticlebySlug(slugId).then( article =>{
                article = article || {};
               dispatch(loadReducer(ActionTypes.LOAD_ARTICLE ,article));
               return article ;
           })
    };
}

export function RateArticle(data){
    return function (dispatch){
           return api.rateArticle(data).then( resp =>{  
               resp = resp || [];
               return resp ;
           })
    };
}

export function ArticleComments(data){
    return function (dispatch){
           return api.articleComments(data).then( resp =>{  
               resp = resp || [];
               return resp ;
           })
    };
}

export function SubmitComment(data){
    return function (dispatch){
           return api.submitComment(data).then( resp =>{  
               resp = resp || [];
               return resp ;
           })
    };
}

export function ReportInappropriate(data){
    return function (dispatch){
           return api.reportInappropriate(data).then( resp =>{  
               resp = resp || [];
               return resp ;
           })
    };
}