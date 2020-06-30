import {createStore,combineReducers,applyMiddleware} from 'redux';
import popularArticlesReducer from '../reducers/popularArticlesReducer';
import locationArticlesReducer from '../reducers/locationArticlesReducer';
import eventsReducer from '../reducers/eventsReducer';
import authReducer from '../reducers/authReducer';
import forumReducer from '../reducers/forumReducer';
import relatedarticles from '../reducers/relatedArticlesReducer';
import thunk from 'redux-thunk';
import groupsReducer from '../reducers/groupReducer';
import locationReducer from '../reducers/locationReducer';
import myprofileReducer from '../reducers/myprofileReducer';
import myarticleReducer from '../reducers/myarticleReducer';
import tagsReducer from '../reducers/tagsReducer';
import articleReducer from '../reducers/articleReducer';
import commonReducer from '../reducers/commonReducer';

let rootReducer = combineReducers({
    PopularArticles : popularArticlesReducer,
    Authentication: authReducer,
    LocationArticles : locationArticlesReducer,
    Events : eventsReducer,
    Forum : forumReducer,
    RelatedArticles: relatedarticles,
    Groups : groupsReducer,
    Locations : locationReducer,
    MyProfile : myprofileReducer,
    MyArticle : myarticleReducer,
    UserTags : tagsReducer,
    AboutGroups : groupsReducer,
    Article : articleReducer,
    Common :commonReducer
})


const store = createStore(rootReducer,applyMiddleware(thunk));


window.store = store ;
export default store ;