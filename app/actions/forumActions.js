import * as ActionTypes from './actionTypes';
import * as api from '../api/ForumApi';

export function loadReducer(type ,data){
    return{
        type:type,
        data:data
    }
}


export function getForums(communityId, onlyMineTopics, order, pageIndex, pageSize, filter){
    return function (dispatch){
           return api.getForums(communityId, onlyMineTopics, order, pageIndex, pageSize, filter).then( forum =>{              
               forum = forum || {};
               forum.itemsPerPage = pageSize;
               dispatch(loadReducer(ActionTypes.LOAD_FORUMS , forum));
               return forum ;
           })
    };
}

export function NewForum(data) {
    return function (dispatch) {
        return api.newForum(data).then(response => {           
            return true;
        })
    };
}

export function GetThread(topicId, pageIndex, pageSize) {
    return function (dispatch) {
        return api.getThread(topicId, pageIndex, pageSize).then(forum => {           
            forum = forum || {};
            // forum.itemsPerPage = pageSize;
            return forum ;
        })
    };
}

export function PostThread(data) {
    return function (dispatch) {
        return api.postThread(data).then(forum => {           
            forum = forum || {};
            // forum.itemsPerPage = pageSize;
            return forum ;
        })
    };
}

export function PostReply(data) {
    return function (dispatch) {
        return api.postReply(data).then(reply => {           
            reply = reply || {};
            // reply.itemsPerPage = pageSize;
            return reply ;
        })
    };
}