import * as ActionTypes from './actionTypes';


export function loadReducer(type,data) {
    return{
        type,
        data
    }    
}

export function updateRadius(){
    return function (dispatch){
        dispatch(loadReducer(ActionTypes.USER_RADIUS , data));
    };
}




