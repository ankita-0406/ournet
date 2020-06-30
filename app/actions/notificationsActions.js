import * as api from "../api/NotificationsApi";

export function AcceptRequest(id) {
    return function (dispatch) {
        return api.AcceptRequest(id).then(resp => {
            resp = resp || {};
            return resp;
        })
    }

}

export function DeclineRequest(id){

return function(dispatch){
 return api.DeclineRequest(id).then(resp =>{
resp= resp ||{};
return resp;

 })


}

}