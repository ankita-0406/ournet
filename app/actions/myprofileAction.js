import * as ActionTypes from './actionTypes';
import * as api from '../api/MyprofileApi';

export function loadReducer(type, data) {
    return {
        type: type,
        data: data
    }
}

export function getmyprofile(userid) {
    return function (dispatch) {
        return api.getmyprofile(userid).then(myprofile => {
            myprofile = myprofile || [];
            dispatch(loadReducer(ActionTypes.LOAD_MYPROFILE, myprofile));
            return myprofile;
        })
    };
}

export function updateUserProfile(profileImg) {
    return function (dispatch) {
        if (profileImg != 0) {
            console.log("profileImg:", profileImg);
            dispatch(loadReducer(ActionTypes.LOAD_USER_PROFILE, profileImg));
        }
        const wait = time => new Promise((resolve) => setTimeout(resolve, time));
        return wait(1000).then(() => {
            console.log('myprofileAction => updateUserProfileImg!')
            return true;
        });
    };
}

export function updateImageHolder(profileImg) {
    return function (dispatch) {
        if (profileImg != 0) {

            dispatch(loadReducer(ActionTypes.LOAD_DUMMY_IMAGE, profileImg));
        }
        const wait = time => new Promise((resolve) => setTimeout(resolve, time));
        return wait(1000).then(() => {
            console.log('myprofileAction => updateUserProfileImg!')
            return true;
        });
    };
}

export function updatemyprofile(profile) {

    let data = {};
    data.description = profile.description;
    data.email = profile.email;
    data.firstName = profile.firstName;
    data.lastName = profile.lastName;
    data.middleName = profile.middleName;
    data.publicName = profile.publicUserName;
    data.roleCode = profile.roleCode;
    data.userId = profile.userId;
    data.username = profile.username;
    // data.avatar = profile.avatar;

    return function (dispatch) {
        return api.updateMyProfile(data).then(myprofile => {
            myprofile = myprofile || [];
            dispatch(loadReducer(ActionTypes.LOAD_MYPROFILE, myprofile));
            return myprofile;
        })
    };
}

export function getImageUrl(userId, file) {
    return function (dispatch) {
        return api.updateAvatar(userId, file.directory, file.fileName).then(myprofile => {
            myprofile = myprofile || [];
            dispatch(loadReducer(ActionTypes.LOAD_PROFILE_IMAGE_URL, `/media/${file.directory}/${file.fileName}`));
            return myprofile;
        })
    }
}