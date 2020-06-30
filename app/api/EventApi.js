import Api from "./Api";


export function getEvents(pageIndex, pageSize, filter) {
    let url = `/api/ournet/event/published?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}&order=date&top=0`;
    return GetRequest(url);
}

export function getEventsGuest(lat, lng, radius, pageIndex, pageSize) {
    let url = `/api/ournet/public/event/guestUser/?latitude=${lat}&longitude=${lng}&radius=${radius}&pageIndex=${pageIndex}&pageSize=${pageSize}&top=0`;
    return GetRequest(url);
}

export function postEvent(data) {
    let url = `/api/ournet/event`;
    return PostRequest(url,data);
}

export function postEventComment(data){
    let url = `/api/ournet/event-topic-comment`
    return PostRequest(url , data)
}

export function getEventTopicComment(eventTopicId){
    let url  = `/api/ournet/public/event-topic-comment/${eventTopicId}?&pageIndex=0&pageSize=12`
    return GetRequest(url)
}

export function publishEvent(id) {
    let data = {};
    let url = `/api/ournet/event/publish/?eventId=${id}`;
    return PutRequest(url,data);
}

export function getEventsForum(eventId){
    let url = `/api/ournet/public/event-topic/${eventId}?&onlyMineTopics=false&order=CHRONOLOGICAL&pageIndex=0&pageSize=12&filter=`;
    return GetRequest(url)
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

function PostRequest(url,data) {
    return new Promise(function (resolve, reject) {

        let obj = {
            url: url,
            data:data,
            onSuccess: (resp) => {
                resolve(resp);
            },
            onError: (err) => {
                reject();
                console.log('api error', err);
            }
        }

        Api.post(obj.url, obj.data , obj.onSuccess, obj.onError);

    });
}

function PutRequest(url ,data){
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

        Api.put(obj.url,obj.data,obj.onSuccess,obj.onError);

    });
}