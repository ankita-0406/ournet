import Api from "./Api";

export function getUserTags(userid) {
    let url = `/api/ournet/tag/getUserTags/${userid}`;
    return GetRequest(url);
}

export function getAllTags() {
    let url = `/api/ournet/tag/all`;
    return GetRequest(url);
}


export function updateTags(tags, Atags) {
    let data = {};
    tags = tags.join(",");
    Atags = Atags.join(",");
    let url = `/api/ournet/tag/preferredTags?preferredTags=${tags}&antiTags=${Atags}`;
    return PostRequest(url ,data);
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