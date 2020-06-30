import Api from "./Api";


export function getForums(communityId, onlyMineTopics, order, pageIndex, pageSize, filter) {
    let url = `/api/ournet/public/community-topic/${communityId}?onlyMineTopics=${onlyMineTopics}&order=${order}&pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`;
    return GetRequest(url);
}

export function newForum(data) {
    let url = `/api/ournet/community-topic`;
    return PostRequest(url, data);
}

export function getThread(topicId, pageIndex, pageSize) {
    let url = `/api/ournet/public/community-topic-comment/${topicId}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return GetRequest(url);
}

export function postThread(data) {
    let url = `/api/ournet/community-topic-comment`;
    return PostRequest(url, data);
}

export function postReply(data ) {
    let url = `/api/ournet/community-topic-comment`;
    return PostRequest(url, data);
}


function PostRequest(url ,data){
    return new Promise(function(resolve,reject){

        let obj = {
            url : url ,
            data : data,
            onSuccess: (resp)=>{
                resolve(resp);
            },
            onError:(err) =>{
                reject();
                console.log('api error' , err);
            }
        }

        Api.post(obj.url,obj.data,obj.onSuccess,obj.onError);

    });
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
