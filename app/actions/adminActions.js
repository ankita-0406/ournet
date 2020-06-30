import * as ActionTypes from './actionTypes';
import * as api from '../api/AdminApi';

export function loadReducer(type, data) {
    return {
        type: type,
        data: data
    }
}

export function getallUsers(confirmed, deleted, suspended, pageIndex, pageSize, filter) {
    return function (dispatch) {
        return api.getUsers(confirmed, deleted, suspended, pageIndex, pageSize, filter).then(users => {
            users = users || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , users));
            return users;
        })
    };
}

export function getUserNotifications( pageIndex, pageSize, filter) {
    return function (dispatch) {
        return api.getUserNotifications(pageIndex, pageSize, filter).then(notifications => {
            notifications = notifications || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , notifications));
            return notifications;
        })
    };
}

export function suspendUser(userId) {
    return function (dispatch) {
        return api.suspenduser(userId).then(user => {
            user = user || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , user));
            return user;
        })
    };
}

export function deleteUser(userId) {
    return function (dispatch) {
        return api.deleteuser(userId).then(user => {
            user = user || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , user));
            return user;
        })
    };
}

export function getallArticles(pageIndex, pageSize, filter, showStickyOnly) {
    return function (dispatch) {
        return api.getArticles(pageIndex, pageSize, filter, showStickyOnly).then(articles => {
            articles = articles || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , articles));
            return articles;
        })
    };
}

export function suspendArticle(data) {
    return function (dispatch) {
        return api.suspendarticle(data).then(article => {
            article = article || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , article));
            return article;
        })
    };
}


export function getallGroups(pageIndex, pageSize, filter, showStickyOnly) {
    return function (dispatch) {
        return api.getGroups(pageIndex, pageSize, filter, showStickyOnly).then(groups => {
            groups = groups || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , groups));
            return groups;
        })
    };
}


export function suspendGroup(data) {
    return function (dispatch) {
        return api.suspendgroup(data).then(group => {
            group = group || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , group));
            return group;
        })
    };
}

export function publishGroup(data) {
    return function (dispatch) {
        return api.publishgroup(data).then(group => {
            group = group || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , group));
            return group;
        })
    };
}

export function getallInappropriate(pageIndex, pageSize, filter) {
    return function (dispatch) {
        return api.getInapporpriate(pageIndex, pageSize, filter).then(reports => {
            reports = reports || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , reports));
            return reports;
        })
    };
}

export function getInappropriate(Id, pageIndex, pageSize, filter) {
    return function (dispatch) {
        return api.getInapporpriatereport(Id, pageIndex, pageSize, filter).then(report => {
            report = report || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , report));
            return report;
        })
    };
}

export function getScore(){
    return function (dispatch){
           return api.getscore().then( score =>{              
               score = score || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , score));
               return score ;
           })
    };
}

export function setScore(data){
    return function (dispatch){
           return api.setscore(data).then( score =>{              
               score = score || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , score));
               return score ;
           })
    };
}

export function addUser(data){
    return function (dispatch){
           return api.adduser(data).then( user =>{              
               user = user || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , user));
               return user ;
           })
    };
}

export function editUser(userId, data){
    return function (dispatch){
           return api.edituser(userId, data).then( user =>{              
               user = user || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , user));
               return user ;
           })
    };
}

export function reportBugs(userId, data){
    return function (dispatch){
           return api.reportBug(userId, data).then( user =>{              
               user = user || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , user));
               return user ;
           })
    };
}

export function getUserPopularity(id) {
    return function (dispatch) {
        return api.getUserPopularity(id).then(res => {
            // res = res || {};
            //    dispatch(loadReducer(ActionTypes.LOAD_USERTAGS , res));
            return res;
        })
    };
}