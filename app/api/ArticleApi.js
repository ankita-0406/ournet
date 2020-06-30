import Api from "./Api";


export function getPopularArticles(pageIndex, pageSize, filter, priority) {
    let url = `/api/ournet/article/popular?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}&top=${priority}`;
    return GetRequest(url);
}

export function getRelatedArticles(articleId){
    let url = `/api/ournet/public/article/related/${articleId}`;
    return GetRequest(url);
}

export function getMyArticles(pageIndex, pageSize, sorting){
    let url = `/api/ournet/manage-article/current-user?pageIndex=${pageIndex}&pageSize=${pageSize}&order=DATE&filter=${sorting}`;
    return GetRequest(url);
}

export function deleteMyArticles(articleId){
    let url = `/api/ournet/article?articleId=${articleId}`
    return DeleteRequest(url);
}

export function rateArticle(rating){
    let url = `/api/ournet/public/article/rating`;
    return PutRequest(url,rating);
}

export function saveArticle(articleDetails){
    let data = articleDetails
    let url = `/api/ournet/article`;
    return PostRequest(url,data);
}

export function publishArticle(articleId){
    let data = {}
    let url = `/api/ournet/article/publish/?articleId=${articleId}`;
    return PutRequest(url,data);
}

export function getguestLocationArticles(lat,lng,radius,pageIndex,pageSize,top){
    let url = `/api/ournet/public/article/popular/guestUser?latitude=${lat}&longitude=${lng}&radius=${radius}&pageIndex=${pageIndex}&pageSize=${pageSize}&top=${top}`;
    return GetRequest(url);
}

export function getarticlebySlug(slugId){
    let url = `/api/ournet/public/article/by-slug/${slugId}`;
    return GetRequest(url);
}

export function getAllArticlesToManage(pageIndex,pageSize,filter,showStickyOnly){
    let url = `/api/ournet/manage-article/all?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}&showStickyOnly=${showStickyOnly}`;
    return GetRequest(url);
}

export function articleComments(slugId){
    let url = `/api/ournet/public/article-comment/${slugId}`;
    return GetRequest(url);
}

export function submitComment(data){
    let url = `/api/ournet/article-comment`;
    return PostRequest(url,data);
}

export function reportInappropriate(data){
    let url = `/api/ournet/public/article/report-inappropriate`;
    return PostRequest(url,data);
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

function DeleteRequest(url) {
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

        Api.delete(obj.url, obj.onSuccess, obj.onError);

    });
}