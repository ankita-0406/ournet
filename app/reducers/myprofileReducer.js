import * as ActionTypes from '../actions/actionTypes';
import initialState from '../config/initialState';
import update from 'react-addons-update';



export default function myprofileReducer(state = initialState.Myprofile, action) {

    switch (action.type) {
        case ActionTypes.LOAD_MYPROFILE:
            return update(state, { profile: { $set: action.data } });
        case ActionTypes.LOAD_USER_PROFILE:
            console.log("my state", state)
            return update(state, { profilePicture: { $set: action.data } });
        case ActionTypes.LOAD_DUMMY_IMAGE:
            console.log("state", state)
            return update(state, { img: { $set: action.data } });
        case ActionTypes.LOAD_ARTICLE_IMAGE:
            console.log("state Load" , state)
            return update(state, { articleImage: { $set: action.data } });
        case ActionTypes.LOAD_IMAGE_URL:
            return update(state, {aricleImageUrl:{$set : action.data}})    
        case ActionTypes.LOAD_PROFILE_IMAGE_URL:
            return update(state, {profileImageUrl:{$set : action.data}}) 


        default:
            return state;
    }

}