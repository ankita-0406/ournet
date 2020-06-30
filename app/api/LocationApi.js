import Api from "./Api";



export function getLocations() {
    let url = `/api/ournet/user-locations`;
    return GetRequest(url);
}

export function updateUserLocations(locations){
    let data = {locations} ;
    let url = '/api/ournet/user-locations';
    return PutRequest(url,data);
}

export function updateUserLocationfromradius(radius){
    let data = {};
    let url = `/api/ournet/user-locations/updateUserRadius?radius=${radius}`;
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