import ManageMediaActions from '../actions/ManagedMediaActions';
const MAX_FILE_SIZE_MB = 1;

// module.exports = {
//     uploadMediaFile(fileName, file, formatMessage, onSuccess, onError) {
//         if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
//             ManageMediaActions.uploadNewFile(fileName, file, (res)=> {
//                 swal({
//                     text: 'file has been uploaded',
//                     timer: 1000,
//                     type: 'success'
//                 });
//                 onSuccess && onSuccess(res);
//             }, (err)=> {
//                 let message = err.response.body.message;
//                 if (err.status == 403) {
//                     message = "error in file ";
//                 }
//                 onError ? onError(message) : swal({text: message, type: 'error'});
//             });
//         } else {
//             swal({
//                 text: 'max size error',
//                 type: 'error'
//             });
//         }
//     }
// };