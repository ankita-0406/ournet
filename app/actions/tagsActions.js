import * as ActionTypes from './actionTypes';
import * as api from '../api/TagsApi';

export function loadReducer(type ,data){
    return{
        type:type,
        data:data
    }
}

export function getUserTags(userid){
    return function (dispatch){
           return api.getUserTags(userid).then( tags =>{              
               tags = tags || {};
               dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , tags));
               return tags ;
           })
    };
}

export function getAllTags(){
    return function (dispatch){
           return api.getAllTags().then( alltags =>{              
               alltags = alltags || {};
               dispatch(loadReducer(ActionTypes.LOAD_ALLTAGS , alltags));
               return alltags ;
           })
    };
}

export function UpdateTags(tags, Atags){
    return function (dispatch){
           return api.updateTags(tags, Atags).then( alltags =>{              
               alltags = alltags || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_ALLTAGS , alltags));
               return alltags ;
           })
    };
}