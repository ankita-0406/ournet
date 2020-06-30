import Api from "./Api";

export function searchGroups(pageIndex, pageSize, filter) {
    let url = `/api/ournet/public/search/mysql/group?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`;
    return GetRequest(url);
}

export function searchArticles(pageIndex, pageSize, filter) {
    let url = `/api/ournet/public/search/mysql/article?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`;
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