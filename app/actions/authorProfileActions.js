// import * as ActionTypes from './actionTypes';
import * as api from '../api/PublicAuthorApi';

export function loadReducer(type ,data){
    return{
        type:type,
        data:data
    }
}


export function getAuthorProfile(userid){
    return function (dispatch){
           return api.getauthorprofile(userid).then( myprofile =>{    
               myprofile = myprofile || [];
            //    dispatch(loadReducer(ActionTypes.LOAD_MYPROFILE ,myprofile));
               return myprofile;
           })
    };
}

export function getAuthorArticles(userid, pageIndex, pageSize){
    return function (dispatch){
           return api.getauthorArticles(userid, pageIndex, pageSize).then( articles =>{    
               articles = articles || [];
            //    dispatch(loadReducer(ActionTypes.LOAD_MYPROFILE ,articles));
               return articles;
           })
    };
}

export function getAuthorGroups(userid, pageIndex, pageSize){
    return function (dispatch){
           return api.getauthorGroups(userid, pageIndex, pageSize).then( groups =>{    
               groups = groups || [];
            //    dispatch(loadReducer(ActionTypes.LOAD_MYPROFILE ,groups));
               return groups;
           })
    };
}