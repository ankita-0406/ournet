
import Api from "./Api";

export function AcceptRequest(id) {
    let data = id


    let url = "/api/ournet/notification/accept";
    return PostRequest(url,data);
}

export function DeclineRequest(id) {

   let data =id;
    let url = "api/ournet/notification/decline";

    return PostRequest(url,data);
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



