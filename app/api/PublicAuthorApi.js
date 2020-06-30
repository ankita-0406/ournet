import Api from "./Api";

export function getauthorprofile(userid) {
    let url = `/api/ournet/public/user-profile/${userid}`;
    return GetRequest(url);
}

export function getauthorArticles(userid, pageIndex, pageSize) {
    let url = `/api/ournet/public/article/author?userId=${userid}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return GetRequest(url);
}

export function getauthorGroups(userid, pageIndex, pageSize) {
    let url = `/api/ournet/public/group/author?userId=${userid}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
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