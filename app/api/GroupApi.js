import Api from "./Api";

export function getGroups() {
    let url = `/api/ournet/public/group/published/?pageIndex=0&pageSize=9&filter=`;
    return GetRequest(url);
}


export function getMembers(query) {
    let url = `/api/ournet/not-members/match/${query}`;
    return GetRequest(url);
}

export function getAdmins(query) {
    let url = `/api/ournet/users/match/${query}`;
    return GetRequest(url);
}

// export function getGroups() {
//     let url = `/api/ournet/public/group/published/?filter=`;
//     return GetRequest(url);
// }


export function getgroupArticles(groupId, pageIndex, pageSize, filter) {
    let url = `/api/ournet/public/group-articles/published/?groupId=${groupId}&pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`;
    return GetRequest(url);
}

export function getGroupEvents(id){
    let url = `/api/ournet/public/group-events/published/?groupId=${id}&pageIndex=0&pageSize=12&filter=`
    return GetRequest(url)
}

export function updategroupArticles(data) {
    let url = `/api/ournet/group-articles/update`;
    return PutRequest(url, data);
}

export function getgroupInfo(groupId) {
    let url = `/api/ournet/public/group/${groupId}`;
    return GetRequest(url);
}

export function getuserGroups(pageIndex, pageSize, top) {
    let url = `/api/ournet/manage-group/current-user?pageIndex=${pageIndex}&pageSize=${pageSize}&order=DATE&filter=&top=${top}`;
    return GetRequest(url);
}

export function joinGroup(groupId) {
    let data = groupId;
    let url = `/api/ournet/group/join`;
    return PostRequest(url, data);
}

export function leaveGroup(groupId) {
    let data = groupId;
    let url = `/api/ournet/group/leave`;
    return PostRequest(url, data);
}

export function getgroupForums(groupId, onlyMineTopics, order, pageIndex, pageSize, filter) {
    let url = `/api/ournet/public/group-topic/${groupId}?onlyMineTopics=${onlyMineTopics}&order=${order}&pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`;
    return GetRequest(url);
}

export function publishGroup(groupData) {
    let data = groupData
    let url = `/api/ournet/group`;
    return PostRequest(url, data);
}

export function publishForum(forumData) {
    let data = forumData
    let url = `/api/ournet/group-topic`;
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

function PostRequest(url, data) {
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

        Api.post(obj.url, obj.data, obj.onSuccess, obj.onError);

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
                console.log("api error", err);
            }
        }


        Api.put(obj.url, obj.data, obj.onSuccess, obj.onError);
    });






}


