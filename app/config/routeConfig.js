import React from 'react';
import Home from '../component/Home';
// import Home from '../common/leftColumn';
import Sidebar from '../component/Sidebar';
import Article from '../component/Article';
import Forum from "../component/Forum";
// import Forum from "../common/leftColumn";
import Classified from "../component/Classified";
import Events from "../component/Events";
// import Events from "../common/leftColumn"
import AroundMe from "../component/AroundMe";
import Login from "../component/Login";
import Location from "../component/Location";
import Group from "../component/Groups";
import MyProfile from "../component/MyProfile";
import Tags from "../component/Tags";
import AboutGroups from "../component/AboutGroups";
import Register from "../component/Register";
import CheckMail from "../component/CheckMail";
import NewArticle from "../component/NewArticle";
import MyArticle from "../component/MyArticle";
import ForgotPassword from "../component/ForgotPassword";
import NewGroup from "../component/NewGroup";
import NewGroups from "../component/NewGroups";
import NewGroupTwo from "../component/NewGroupTwo";
// import NewGroupThird from "../component/NewGroupThird";
import NewGroupFourth from "../component/NewGroupFourth";
import Event from "../component/NewEvent";
import HomeLayout from "../component/HomeLayout";
import GroupEvents from "../component/GroupEvents"


import EditArticle from "../component/EditArticle";
import Confirmation from "../component/Confirmation";
import ResetPassword from "../component/ResetPassword";
import Confirm from "../component/Confirm";
import GroupForum from "../component/groupforum";
import Search from "../component/search";
import New from "../component/UserProfile";
import ManageUsers from "../component/Manage/ManageUsers";
import ManageArticles from "../component/Manage/ManageArticles";
import ManageGroups from "../component/Manage/ManageGroups";
import Score from "../component/Manage/ScoreParameter";
import Inappropriate from "../component/Manage/InappropiateReports";
import AddUser from "../component/Manage/addUser";
import CommentSection from "../component/commentsection";
import EditUser from "../component/Manage/editUser";
import NewForum from "../component/NewForum";
import Notifications from "../component/notifications";



export const pages = {
    Home: "home",
    Sidebar: "sidebar",
    Article: 'article',
    Forum: "forum",
    NewForum:"newforum",
    Classified: "classified",
    Events: "events",
    AroundMe: "aroundme",
    Login: 'login',
    Location: "location",
    Group: "group",
    MyProfile: "myprofile",
    Tags: 'tags',
    AboutGroups: 'aboutgroups',
    Register: "register",
    CheckMail: "checkmail",
    NewArticle: "newarticle",
    MyArticle: "myarticle",
    ForgotPassword: "forgotpassword",
    NewGroup: "newgroup",
    NewGroups: "newgroups",
    NewGroupTwo: "newgrouptwo",
    // NewGroupThird: "newgroupthird",
    NewGroupFourth: "newgroupfourth",
    Event: "newevent",
    HomeLayout: "homelayout",
    GroupEvents:"groupevents",

    
    EditArticle: "editarticle",
    Confirmation: "confirmation",
    ResetPassword: "reset-password",
    Confirm: "confirm",
    GroupForum: "groupforum",
    Search: "search",
    New: "userprofile",
    ManageUsers: "manageusers",
    ManageArticles: "managearticles",
    ManageGroups: "managegroups",
    Score: "scoreparameter",
    Inappropriate: "inappropriate",
    AddUser: "adduser",
    CommentSection: "comment",
    EditUser: "edituser",
    Notifications:"notifications",
}

export const ComponentList = {
    Home: { Component: Home, Name: pages.Home, Path: "/" },
    Sidebar: { Component: Sidebar, Name: pages.Sidebar, Path: "/sidebar" },
    Article: { Component: Article, Name: pages.Article, Path: "/article/:id" },
    Forum: { Component: Forum, Name: pages.Article, Path: "/forum" },
    NewForum: { Component: NewForum, Name: pages.Article, Path: "/newforum" },
    Classified: { Component: Classified, Name: pages.Article, Path: "/classified" },
    Events: { Component: Events, Name: pages.Article, Path: "/events" },
    AroundMe: { Component: AroundMe, Name: pages.Article, Path: "/aroundme" },
    Login: { Component: Login, Name: pages.Login, Path: "/login" },
    Location: { Component: Location, Name: pages.Location, Path: "/location" },
    Group: { Component: Group, Name: pages.Group, Path: "/group" },
    MyProfile: { Component: MyProfile, Name: pages.MyProfile, Path: "/myprofile" },
    Tags: { Component: Tags, Name: pages.Tags, Path: "/tags" },
    AboutGroups: { Component: AboutGroups, Name: pages.AboutGroups, Path: "/aboutgroups/:id" },
    Register: { Component: Register, Name: pages.Register, Path: "/register" },
    CheckMail: { Component: CheckMail, Name: pages.CheckMail, Path: "/check-confirmation-email" },
    NewArticle: { Component: NewArticle, Name: pages.NewArticle, Path: "/newarticle" },
    MyArticle: { Component: MyArticle, Name: pages.MyArticle, Path: "/myarticle" },
    ForgotPassword: { Component: ForgotPassword, Name: pages.ForgotPassword, Path: "/forgotpassword" },
    NewGroup: { Component: NewGroup, Name: pages.NewGroup, Path: "/newgroup" },
    NewGroups: { Component: NewGroups, Name: pages.NewGroups, Path: "/newgroups" },
    NewGroupTwo: {Component: NewGroupTwo, Name: pages.NewGroupTwo, Path:"/newgrouptwo"},
    // NewGroupThird: { Component: NewGroupThird, Name: pages.NewGroupThird, Path: "/newgroupthird" },
    NewGroupFourth: { Component: NewGroupFourth, Name: pages.NewGroupFourth, Path: "/newgroupfourth" },
    Event: { Component: Event, Name: pages.Event, Path: "/newevent" },
    HomeLayout: { Component: HomeLayout, Name: pages.HomeLayout, Path: "/homelayout" },
    GroupEvents: { Component: GroupEvents, Name: pages.GroupEvents, Path: "/groupevents/:id" },


    EditArticle: { Component: EditArticle, Name: pages.EditArticle, Path: "/editarticle/:id" },
    Confirmation: { Component: Confirmation, Name: pages.Confirmation, Path: "/confirmation" },
    ResetPassword: { Component: ResetPassword, Name: pages.ResetPassword, Path: "/reset-password/:confirmation_code" },
    Confirm: { Component: Confirm, Name: pages.Confirm, Path: "/confirm/:confirmation_code" },
    GroupForum: { Component: GroupForum, Name: pages.GroupForum, Path: "/groupforum/:id" },
    Search: { Component: Search, Name: pages.Search, Path: "/search/:text" },
    New: { Component: New, Name: pages.New, Path: "/userprofile/:id" },
    ManageUsers: { Component: ManageUsers, Name: pages.ManageUsers, Path: "/manageusers" },
    ManageArticles: { Component: ManageArticles, Name: pages.ManageArticles, Path: "/managearticles" },
    ManageGroups: { Component: ManageGroups, Name: pages.ManageGroups, Path: "/managegroups" },
    Score: { Component: Score, Name: pages.Score, Path: "/scoreparameter" },
    Inappropriate: { Component: Inappropriate, Name: pages.Inappropriate, Path: "/inappropriate" },
    AddUser: { Component: AddUser, Name: pages.AddUser, Path: "/adduser" },
    CommentSection: { Component: CommentSection, Name: pages.CommentSection, Path: "/comment/:id" },
    EditUser: { Component: EditUser, Name: pages.EditUser, Path: "/admin/edituser/:id" },
    Notifications: { Component: Notifications , Name: pages.Notifications , Path:"/notifications" },
}

export const Routes = [
    { name: ComponentList.Home.Name, component: ComponentList.Home.Component, path: ComponentList.Home.Path },
    { name: ComponentList.Sidebar.Name, component: ComponentList.Sidebar.Component, path: ComponentList.Sidebar.Path },
    { name: ComponentList.Article.Name, component: ComponentList.Article.Component, path: ComponentList.Article.Path },
    { name: ComponentList.Forum.Name, component: ComponentList.Forum.Component, path: ComponentList.Forum.Path },
    { name: ComponentList.NewForum.Name, component: ComponentList.NewForum.Component, path: ComponentList.NewForum.Path },
    { name: ComponentList.Classified.Name, component: ComponentList.Classified.Component, path: ComponentList.Classified.Path },
    { name: ComponentList.Events.Name, component: ComponentList.Events.Component, path: ComponentList.Events.Path },
    { name: ComponentList.AroundMe.Name, component: ComponentList.AroundMe.Component, path: ComponentList.AroundMe.Path },
    { name: ComponentList.Login.Name, component: ComponentList.Login.Component, path: ComponentList.Login.Path },
    { name: ComponentList.Location.Name, component: ComponentList.Location.Component, path: ComponentList.Location.Path },
    { name: ComponentList.Group.Name, component: ComponentList.Group.Component, path: ComponentList.Group.Path },
    { name: ComponentList.MyProfile.Name, component: ComponentList.MyProfile.Component, path: ComponentList.MyProfile.Path },
    { name: ComponentList.Tags.Name, component: ComponentList.Tags.Component, path: ComponentList.Tags.Path },
    { name: ComponentList.AboutGroups.Name, component: ComponentList.AboutGroups.Component, path: ComponentList.AboutGroups.Path },
    { name: ComponentList.Register.Name, component: ComponentList.Register.Component, path: ComponentList.Register.Path },
    { name: ComponentList.CheckMail.Name, component: ComponentList.CheckMail.Component, path: ComponentList.CheckMail.Path },
    { name: ComponentList.NewArticle.Name, component: ComponentList.NewArticle.Component, path: ComponentList.NewArticle.Path },
    { name: ComponentList.MyArticle.Name, component: ComponentList.MyArticle.Component, path: ComponentList.MyArticle.Path },
    { name: ComponentList.ForgotPassword.Name, component: ComponentList.ForgotPassword.Component, path: ComponentList.ForgotPassword.Path },
    { name: ComponentList.NewGroup.Name, component: ComponentList.NewGroup.Component, path: ComponentList.NewGroup.Path },
    { name: ComponentList.NewGroups.Name, component: ComponentList.NewGroups.Component, path: ComponentList.NewGroups.Path },
    { name: ComponentList.NewGroupTwo.Name, component: ComponentList.NewGroupTwo.Component, path: ComponentList.NewGroupTwo.Path },
    // { name: ComponentList.NewGroupThird.Name, component: ComponentList.NewGroupThird.Component, path: ComponentList.NewGroupThird.Path },
    { name: ComponentList.NewGroupFourth.Name, component: ComponentList.NewGroupFourth.Component, path: ComponentList.NewGroupFourth.Path },
    { name: ComponentList.Event.Name, component: ComponentList.Event.Component, path: ComponentList.Event.Path },
    { name: ComponentList.HomeLayout.Name, component: ComponentList.HomeLayout.Component, path: ComponentList.HomeLayout.Path },
    { name: ComponentList.GroupEvents.Name, component: ComponentList.GroupEvents.Component, path: ComponentList.GroupEvents.Path },

    { name: ComponentList.EditArticle.Name, component: ComponentList.EditArticle.Component, path: ComponentList.EditArticle.Path },
    { name: ComponentList.Confirmation.Name, component: ComponentList.Confirmation.Component, path: ComponentList.Confirmation.Path },
    { name: ComponentList.ResetPassword.Name, component: ComponentList.ResetPassword.Component, path: ComponentList.ResetPassword.Path },
    { name: ComponentList.Confirm.Name, component: ComponentList.Confirm.Component, path: ComponentList.Confirm.Path },
    { name: ComponentList.GroupForum.Name, component: ComponentList.GroupForum.Component, path: ComponentList.GroupForum.Path },
    { name: ComponentList.Search.Name, component: ComponentList.Search.Component, path: ComponentList.Search.Path },
    { name: ComponentList.New.Name, component: ComponentList.New.Component, path: ComponentList.New.Path },
    { name: ComponentList.ManageUsers.Name, component: ComponentList.ManageUsers.Component, path: ComponentList.ManageUsers.Path },
    { name: ComponentList.ManageArticles.Name, component: ComponentList.ManageArticles.Component, path: ComponentList.ManageArticles.Path },
    { name: ComponentList.ManageGroups.Name, component: ComponentList.ManageGroups.Component, path: ComponentList.ManageGroups.Path },
    { name: ComponentList.Score.Name, component: ComponentList.Score.Component, path: ComponentList.Score.Path },
    { name: ComponentList.Inappropriate.Name, component: ComponentList.Inappropriate.Component, path: ComponentList.Inappropriate.Path },
    { name: ComponentList.AddUser.Name, component: ComponentList.AddUser.Component, path: ComponentList.AddUser.Path },
    { name: ComponentList.CommentSection.Name, component: ComponentList.CommentSection.Component, path: ComponentList.CommentSection.Path },
    { name: ComponentList.EditUser.Name, component: ComponentList.EditUser.Component, path: ComponentList.EditUser.Path },
    { name: ComponentList.Notifications.Name, component: ComponentList.Notifications.Component, path: ComponentList.Notifications.Path },
    { name: ComponentList.HomeLayout.Name, comment: ComponentList.HomeLayout.Component,path: ComponentList.HomeLayout.Path }
]