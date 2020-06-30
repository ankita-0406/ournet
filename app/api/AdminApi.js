import Api from "./Api";

export function getUsers(confirmed, deleted, suspended, pageIndex, pageSize, filter) {
    let url = `/api/ournet/users?confirmed=${confirmed}&deleted=${deleted}&suspended=${suspended}&pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`;
    return GetRequest(url);
}

export function getUserNotifications(pageIndex, pageSize, filter){
    let url = `/api/ournet/notifications/?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`
    return GetRequest(url);
}

export function getUserPopularity(id) {
    let url  = `/api/ournet/author-reputation/?userId=${id}`
    return GetRequest(url)
}

export function suspenduser(userId) {
    let url = `/api/ournet/users/suspend/${userId}`;
    return PutRequest(url);
}

export function deleteuser(userId) {
    let url = `/api/ournet/users/${userId}`;
    return GetRequest(url);
}

export function getArticles(pageIndex, pageSize, filter, showStickyOnly) {
    let url = `/api/ournet/manage-article/all?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}&showStickyOnly=${showStickyOnly}`;
    return GetRequest(url);
}

export function suspendarticle(data) {
    let url = `/api/ournet/article/suspend`;
    return PutRequest(url, data);
}

export function getGroups(pageIndex, pageSize, filter, showStickyOnly) {
    let url = `/api/ournet/manage-group/all?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}&showStickyOnly=${showStickyOnly}`;
    return GetRequest(url);
}

export function suspendgroup(data) {
    let url = `/api/ournet/manage-group/suspend`;
    return PutRequest(url, data);
}

export function publishgroup(groupId) {
    let url = `/api/ournet/manage-group/publish/?groupId=${groupId}`;
    return PutRequest(url);
}

export function getscore() {
    let url = `/api/ournet/public/getAllScoreWeight`;
    return GetRequest(url);
}

export function setscore(data) {
    let url = `/api/ournet/public/scoreWeight`;
    return PostRequest(url, data);
}

export function getInapporpriate(pageIndex, pageSize, filter) {
    let url = `/api/ournet/manage-article/allInappropriate?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`;
    return GetRequest(url);
}

export function getInapporpriatereport(Id, pageIndex, pageSize, filter) {
    let url = `/api/ournet/manage-article/getArticleInappropriate/${Id}?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`;
    return GetRequest(url);
}

export function adduser(data) {
    let url = `/api/ournet/user-profile`;
    return PostRequest(url, data);
}

export function edituser(userId, data) {
    let url = `/api/ournet/user-profile/${userId}`;
    return PostRequest(url, data);
}

export function reportBug(data) {
    let url = `/api/ournet/public/feedback/create-issue`;
    return PostRequest(url, data);
}


function GetRequest(url) {
    return new Promise(function (resolve, reject) {

        let obj = {
            url: url,
            onSuccess: (resp) => {
                resolve(resp);
            },
            onError: (err) => {
                reject();
                console.log('api error', err);
            }
        }

        Api.get(obj.url, obj.onSuccess, obj.onError);

    });
}

function PutRequest(url, data) {
    return new Promise(function (resolve, reject) {

        let obj = {
            url: url,
            data: data,
            onSuccess: (resp) => {
                resolve(resp);
            },
            onError: (err) => {
                reject();
                console.log('api error', err);
            }
        }

        Api.put(obj.url, obj.data, obj.onSuccess, obj.onError);

    });
}

function PostRequest(url, data) {
    return new Promise(function (resolve, reject) {

        let obj = {
            url: url,
            data: data,
            onSuccess: (resp) => {
                resolve(resp);
            },
            onError: (err) => {
                var message = 'some error occured';
                if (err && err.response && err.response.body && err.response.body.errors) {
                    message = err.response.body.errors[0].message;
                    console.log(message);
                }
                reject(message);
            }
        }

        Api.post(obj.url, obj.data, obj.onSuccess, obj.onError);

    });
}