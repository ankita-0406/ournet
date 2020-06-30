import Api from './Api';




export function uploadNewFile(fileName, file){
    var fd = new FormData();
    fd.append("file", file);
    let url = `/api/ournet/media/current-user?fileName=${fileName}.jpg`;
    return  PostMultiPartRequest(url,file);
   // return Api.postMultipart(`/api/ournet/media/current-user?fileName=${fileName}`, fd)
}


export function getCurrentUserMedias(){
    let url = `/api/ournet/media/current-user?pageIndex=0&pageSize=50&filter=`;    
    return GetRequest(url);
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

function PostMultiPartRequest(url,data) {
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

        Api.postMultipart(obj.url, obj.data , obj.onSuccess, obj.onError);

    });
}


