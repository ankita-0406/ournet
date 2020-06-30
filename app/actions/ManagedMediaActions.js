import * as ActionTypes from './actionTypes';
import * as api from '../api/MediaApi';
const MAX_FILE_SIZE_MB = 1;

export function loadReducer(type, data) {
    return {
        type: type,
        data: data
    }
}

export function uploadMediaFile(articleImg) {




    return function (dispatch) {

        // console.log("profileImg:",profileImg);
        dispatch(loadReducer(ActionTypes.LOAD_ARTICLE_IMAGE, articleImg.src));
        // const wait = time => new Promise((resolve) => setTimeout(resolve, time));
        // return wait(200).then(() => {
        //     console.log('myprofileAction => updateUserProfileImg!')
        //     return true;
        // });
        if (articleImg.file) {
            return api.uploadNewFile(articleImg.filename, articleImg.file).then(savedMedia => {
                console.log("uploaded to db", savedMedia)
                return savedMedia;
            }).catch((err) => {
                console.log(err);
            })
        }


    };






}

export function getCurrentUserMedias() {

    return api.getCurrentUserMedias().then((resp) => {
        console.log(resp);
        return resp;
    })

}

// export function uploadMediaFile(fileName, file, formatMessage, onSuccess, onError) {
//     if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
//         api.uploadNewFile(fileName, file, (res)=> {
//             swal({
//                 text: 'file has been uploaded',
//                 timer: 1000,
//                 type: 'success'
//             });
//             onSuccess && onSuccess(res);
//         }, (err)=> {
//             let message = err.response.body.message;
//             if (err.status == 403) {
//                 message = "error in file ";
//             }
//             onError ? onError(message) : swal({text: message, type: 'error'});
//         });
//     } else {
//         swal({
//             text: 'max size error',
//             type: 'error'
//         });
//     }
// }