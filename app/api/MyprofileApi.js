import Api from "./Api";

export function getmyprofile(userid) {
    let url = `/api/ournet/user-profile/${userid}`;
    return GetRequest(url);
}

export function updateMyProfile(profile){
    let data = profile ;
    let url = '/api/ournet/user-profile';
    return PutRequest(url,data);
}

export function updateAvatar(userId, dirName, fileName){
    let data = '' ;
    let url = `/api/ournet/user-avatar/${userId}?avatarImage=/media/${dirName}/${fileName}`;
    return PutRequest(url,data);
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

function PutRequest(url,data) {
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

        Api.put(obj.url, obj.data , obj.onSuccess, obj.onError);

    });
}