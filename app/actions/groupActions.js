import * as ActionTypes from './actionTypes';
import * as api from '../api/GroupApi';

export function loadReducer(type, data) {
    return {
        type: type,
        data: data
    }
}

export function getGroups() {
    return function (dispatch) {
        return api.getGroups().then(groups => {
            groups = groups || [];
            dispatch(loadReducer(ActionTypes.LOAD_GROUPS, groups));
            return groups;
        })
    };
}

export function getUserGroups(pageIndex, pageSize, top) {
    return function (dispatch) {
        return api.getuserGroups(pageIndex, pageSize, top).then(groups => {
            groups = groups || [];
            dispatch(loadReducer(ActionTypes.LOAD_USER_GROUPS, groups));
            return groups;
        })
    };
}

export function getGroupArticles(groupId, pageIndex, pageSize, filter) {
    return function (dispatch) {
        return api.getgroupArticles(groupId, pageIndex, pageSize, filter).then(group_articles => {
            group_articles = group_articles || [];
            dispatch(loadReducer(ActionTypes.LOAD_GROUP_ARTICLES, group_articles));
            return group_articles;
        })
    };
}

export function getGroupEvents(id){
    return function (dispatch) {
        return api.getGroupEvents(id).then(resp => {
            resp = resp || []
            return resp;
        })
    };

}


export function updateGroupArticles(data) {
    return function (dispatch) {
        return api.updategroupArticles(data).then(resp => {
            return resp;
        })
    };
}



export function getGroupInfo(groupId) {
    return function (dispatch) {
        return api.getgroupInfo(groupId).then(groups => {
            groups = groups || [];
            dispatch(loadReducer(ActionTypes.LOAD_GROUP_INFO, groups));
            return groups;
        })
    };
}

export function JoinGroup(data) {
    return function (dispatch) {
        return api.joinGroup(data).then(groups => {
            groups = groups || [];
            //    dispatch(loadReducer(ActionTypes.LOAD_GROUP_INFO ,groups));
            return groups;
        })
    };
}

export function LeaveGroup(data) {
    return function (dispatch) {
        return api.leaveGroup(data).then(groups => {
            groups = groups || [];
            //    dispatch(loadReducer(ActionTypes.LOAD_GROUP_INFO ,groups));
            return groups;
        })
    };
}

export function PublishGroup(data) {
    return function (dispatch) {
        return api.publishGroup(data).then(resp => {
            resp = resp || [];
            //  dispatch(loadReducer(ActionTypes.LOAD_ARTICLES_RELATED ,articles));
            return resp;
        })
    };
}

export function getGroupForums(communityId, onlyMineTopics, order, pageIndex, pageSize, filter) {
    return function (dispatch) {
        return api.getgroupForums(communityId, onlyMineTopics, order, pageIndex, pageSize, filter).then(forum => {
            forum = forum || {};
            forum.itemsPerPage = pageSize;
            dispatch(loadReducer(ActionTypes.LOAD_FORUMS, forum));
            return forum;
        })
    };
}

export function PublishForum(data) {
    return function (dispatch) {
        return api.publishForum(data).then(resp => {
            resp = resp || [];
            //  dispatch(loadReducer(ActionTypes.LOAD_ARTICLES_RELATED ,articles));
            return resp;
        })
    };
}

export function getMembers(query) {
    return function (dispatch) {
        return api.getMembers(query).then(resp => {
            resp = resp || [];
            //  dispatch(loadReducer(ActionTypes.LOAD_ARTICLES_RELATED ,articles));
            return resp;
        })
    };
}


export function getAdmins(query) {
    return function (dispatch) {
        return api.getAdmins(query).then(resp => {
            resp = resp || [];
            //  dispatch(loadReducer(ActionTypes.LOAD_ARTICLES_RELATED ,articles));
            return resp;
        })
    };
}