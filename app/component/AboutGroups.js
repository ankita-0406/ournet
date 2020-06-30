import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import moment from "moment";

import { Row, Col, Container, Modal, Button } from 'react-bootstrap';
import '../../style/component/AboutGroup.css';
import '../../style/component/HomeArticles.css';
import * as PopActions from '../actions/groupActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import * as myarticleAction from '../actions/myarticleAction';
import { getOrientation } from 'get-orientation';
import ArticleCards from "../common/articleCards";
import Meta from '../common/Meta';


const BannerSec = styled.div`
position: relative;
    background: #eee;
    `;

const BannerImg = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: auto;
    height: 327px;
    border-radius: 10px 10px 0px 0px;
    background: #fff;
    @media only screen and (max-width:480px) {
    width:100%;

    }

`;



const GroupDetailFoot = styled.div`
    padding: 20px 25px 25px;
    background: #FFF;
    max-width: 470px;
    border-radius: 10px;
    position: absolute;
    bottom: -52px;
    margin-left: 153px;
    /* max-width: 94%; */
    /* left: 11px; */
    /* padding: 15px; */
    @media only screen and (max-width:480px) {

     padding: 15px 15px 15px;
    max-width: 339px;
    bottom: -52px;
    margin-left: 20px;
    margin-top: 20px;
    /* width: 78%; */
    height: 50%;
    line-height: -10;
    }
    
`;

const GroupName = styled.label`

text-align: left;
    font: 40px/42px Lato;
    letter-spacing: 0;
    color: #BB4D9A;
`;
const GroupDetails = styled.div`

margin-top: 30px;
    display: inline-block;
display:flex;
	flex-flow:row;
justify-content:space-between;
@media only screen and (max-width:480px) {
    margin-top: 5px;

}

`;

const Stamp = styled.label`
  font: bold 10px/18px Lato;
  letter-spacing: 0;
  color: #212529;
  text-transform: uppercase;
  display: block;
  font-family: "Lato", sans-serif;

  `;
const StampMri = styled.label`
  font: bold 10px/18px Lato;
  letter-spacing: 0;
  color: #212529;
  text-transform: uppercase;
  display: block;
  margin-right: 25px !important;
  font-family: "Lato", sans-serif;

  `;


const Detail = styled.span`
  text-align: left;
  font: bold 14px/14px Lato;
  letter-spacing: 0;
  color: #BB4D9A;
  display: block;
  margin-top: 5px;
  `;

const FullArticle = styled.div`

padding: 130px 143px 50px 143px;
`;

const PopularTitle = styled.label`
color: #024B99;
font-size: 20px;
`;

const PopularArticles = styled.div`

  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: 0px;
  `;

const Article = styled.div`

  border-radius: 10px;
  margin: 30px;
  float: left;
  `;
const ArticleImg = styled.img`
width: 100%;
height: 170px;
background: #fff;
border-radius: 10px 10px 0px 0px;
`;

const ArticleFoot = styled.div`

    padding: 15px;
    background: #fff;
    border-radius: 0px 0px 10px 10px;
`;

const ArticleLink = styled.div`
    position: relative;
    display: block;
    background: #fff;
    `;

const ArticleTitle = styled.p`
 font: Bold 14px/16px Lato;

`;
const ArticleWriter = styled.label`
 font: Bold 14px/14px Lato;
    letter-spacing: 0;
    color: #A3A3A3;
    margin-top: 5px;
`;
const ArticleActions = styled.label`
 margin-top: 15px;
    align-items: center;

 display: flex;
    flex-flow: row;
justify-content:space-between;
`;
const TimeStamp = styled.label`
 font: Bold 13px/14px Lato;
    letter-spacing: 0;
    color: #024B99;
`;
const LeaveGroupButton = styled.button`

 width: auto;
    height: 60px;
    margin: 0px 25px 50px 25px;
    padding: 0 50px;

    position: relative;
    overflow: hidden;
    background: #4FBFAE;
    border: 1px solid #4FBFAE;
    border-radius: 10px;
    text-align: center;
    font: Bold 16px/19px Lato;
    letter-spacing: 0;
    text-transform: uppercase;
    cursor: pointer;
    color: #fff;
    transform: translateX(0);
    background: transparent !important;
    border: 1px solid #FB531F !important;
    color: #FB531F !important;


`;
const InviteFriendButton = styled.button`
 width: auto;
    height: 60px;
    margin: 0px 25px 50px 25px;
    padding: 0 50px;
    position: relative;
    overflow: hidden;
    background: #4FBFAE;
    border: 1px solid #4FBFAE;
    border-radius: 10px;
    text-align: center;
    font: Bold 16px/19px Lato;
    letter-spacing: 0;
    text-transform: uppercase;
    cursor: pointer;
    color: #fff;
    transform: translateX(0);
`;
const UpBtn = styled.button`
background: #F9A61B;
height: 40px;
width: 40px;
line-height: 40px;
border-radius: 50%;
border: none;
color: #fff;
cursor: pointer;
font-size: 1.5rem;
margin-top: 75px;
outline: none;
`;
class AboutGroups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            group: [],
            groupId: this.props.groupId,
            articles: [],
            pageIndex: 0,
            pageSize: 12,
            filter: '',
            totalArticles: '',
            currentUserMember: false,
            dimg: "../../img/design.png",
            show: false,
            sorting: "PUBLISHED",
            articlesUser: [],
            group_articles: [],
            groupsof: [],
            got: [],
            articleId: [],
            id: [],
            checked: []
        }
    }

    componentDidMount() {

        this.props.popActions.getGroupArticles(this.props.groupId, this.state.pageIndex, this.state.pageSize, this.state.filter).then((resp) => {


            this.setState({

                totalArticles: resp.totalArticles,
                articles: resp.articles,
            });
            this.resize();

        })

        this.fetchArticles(this.state.pageIndex, this.state.pageSize, this.state.sorting);
        this.fetchGroupArticles(this.props.groupId, this.state.pageSize, this.state.pageIndex, this.state.filter);
        if (this.props.currentgroup == null) {
            this.fetchGroups(this.props.groupId);
        }
        else {
            console.log("group name", this.props.currentGroup)
            this.setState({
                group: this.props.currentgroup,
                currentUserMember: this.props.currentgroup.currentUserMember
            });
        }
        window.scrollTo(0, 0);
    }

    // componentDidUpdate = (prevProps , prevState) =>{

    //     if(this.state.articles.length!=prevState.articles.length){
    //         console.log()
    //         this.setState({
    //             id:this.state.articles
    //         })
    //     }
    // }

    fetchArticles = (pageIndex, pageSize, sorting) => {
        this.props.myarticleAction.getMyArticles(pageIndex, pageSize, sorting).then((resp) => {
            console.log("Articles user", resp);
            let arr = [];
            for (let i = 0; i < resp.articles.length; i++) {

                arr[i] = resp.articles[i].id;


            }

            let checked = [];
            for (let i = 0; i < arr.length; i++) {
                checked[i] = 0
            }

            console.log(arr);

            //console.log("users all articles ids =", resp.articles[0].id  );
            this.setState({
                articlesUser: resp.articles,
                articleId: arr,
                fetching: false,
                //checked:checked
            });
        })
    }


    fetchGroupArticles = (groupId, pageSize, pageIndex, filter) => {

        this.props.popActions.getGroupArticles(groupId, pageIndex, pageSize, filter).then((resp) => {

            console.log("new one of mine", resp);

            let arr = [];
            for (let i = 0; i < resp.articles.length; i++) {

                arr[i] = resp.articles[i].id;


            }

            console.log(arr);
            //console.log("id os group articles ", resp.articles[0].id);

            this.setState({

                id: arr,

                group_articles: resp.group_articles

            });
            this.resize();

        })
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }
    isPresent = (index) => {
        if (this.state.id.indexOf(this.state.articleId[index]) != -1) {
            return true;
        }
        return false;

    }
    isAbsent = (e, index) => {

        let articleId = this.state.articleId[index]
        let arr = [];
        arr = this.state.id;
        let idIndex = arr.indexOf(articleId)
        if (idIndex != -1) {

            arr.splice(idIndex, 1);

        }
        if (idIndex == -1) {

            arr.push(articleId)
        }


        this.setState({
            id: arr,
            checked: false
        });
    }

    // resize() {
    //     function resizeGridItem(item) {
    //         let grid = document.getElementsByClassName("popularArticles")[0];
    //         let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    //         let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    //         let rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    //         item.style.gridRowEnd = "span " + rowSpan;
    //     }

    //     function resizeAllGridItems() {
    //         let allItems = document.getElementsByClassName("article");
    //         for (let x = 0; x < allItems.length; x++) {
    //             resizeGridItem(allItems[x]);
    //         }
    //     }
    //     window.onload = resizeAllGridItems();
    //     window.addEventListener("resize", resizeAllGridItems);
    // }

    resize() {
        function resizeGridItem(item) {
            let grid = document.getElementsByClassName("first")[0];
            let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
            let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
            let rowSpan = Math.ceil((item.querySelector('.card').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = "span " + rowSpan;
        }

        function resizeAllGridItems() {
            let allItems = document.getElementsByClassName("articleCombine");
            for (let x = 0; x < allItems.length; x++) {
                resizeGridItem(allItems[x]);
            }
        }
        window.onload = resizeAllGridItems();
        window.addEventListener("resize", resizeAllGridItems);
    }


    fetchGroups = (groupId) => {
        this.props.popActions.getGroupInfo(groupId).then((group) => {
            this.setState({
                group: group.group,
                currentUserMember: group.currentUserMember
            });
        })
    }


    groupAction = (flag) => {
        let data = {};
        data.groupId = this.state.groupId;
        if (flag == 0) {
            this.props.popActions.LeaveGroup(data).then((resp) => {
                this.setState({
                    currentUserMember: resp.currentUserMember
                });
                console.log("Leave Group response", resp);
            })
        }
        if (flag == 1) {
            this.props.popActions.JoinGroup(data).then((resp) => {
                this.setState({
                    currentUserMember: resp.currentUserMember
                });
                console.log("Join Group response", resp);
            })
        }
    }

    scrollup() {
        document.body.scrollTo({ top: 0, behavior: 'smooth' })
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onArticleLink = () => {

        const data = {
            articleId: this.state.id,
            groupId: this.props.groupId
        }

        this.props.popActions.updateGroupArticles(data).then(res => {


            this.props.popActions.getGroupArticles(this.props.groupId, this.state.pageIndex, this.state.pageSize, this.state.filter).then((resp) => {
                this.setState({

                    totalArticles: resp.totalArticles,
                    articles: resp.articles,
                });
                this.resize();

            })




            this.setState({
                show: false
            })

        })

    }


    render() {
        console.log("group naem", this.state.group)
        const { group } = this.state
        return (
            <React.Fragment>
                <Meta title={this.state.group.name} />
                {/* <Header currentUrl={this.props.currentUrl} /> */}
                {/*
               <div className="bannerSec">
                    <img src={group.image} alt="group banner" name="groupbannerimage" className="bannerImg" />
                    <div className="grpDetailFoot describergrp">
                        <div className="grpDesc">
                            <label className="grpName">{this.state.group.name}</label>
                        </div>
                        <div className="grpDetails flexRow evenSpace">
                            <div className="">
                                <label className="stamp">GROUPTYPE</label>
                                <span className="detail">{this.state.group.groupType}</span>
                            </div>
                */}
                <Container fluid>
                <div class="row">
                <div className="rightcolumn">

                <BannerSec>
                    <BannerImg src={group.image} alt="group banner" name="groupbannerimage"></BannerImg>
                    <GroupDetailFoot>
                        <div className="grpDesc">
                            <GroupName>{this.state.group.name}</GroupName>
                        </div>
                        <GroupDetails>
                            <div className="">
                                <Stamp>GROUPTYPE</Stamp>
                                <Detail>{this.state.group.groupType}</Detail>
                            </div>



                            {/* <div className="">
                                <label className="stamp">Members</label>
                                <span className="detail">{this.state.group.numMembers}</span>
                            </div>
                            <div className="">
                                <label className="stamp grpdistance">DISTANCE</label>
                                <span className="detail">0</span>
                            </div> */}

                            {/*
                            <div className="">
                                <label className="stamp mri">ARTICLES</label>
                                <span className="detail">{this.state.totalArticles}</span>
                            </div>

                        </div>
                        <div className="grpDetails flexRow evenSpace">

                            <div className="">
                                <label className="stamp">LOCATION</label>
                                <span className="detail">{this.state.group.address}</span>
                            </div>
                            <div className="">
                                <label className="stamp"></label>
                                <span className="detail"></span>
                            </div>
                        </div>
                    </div>
                </div>

                        */}

                            <div className="">
                                <StampMri>ARTICLES</StampMri>

                                <Detail>{this.state.totalArticles}</Detail>
                            </div>

                        </GroupDetails>
                        <GroupDetails>

                            <div className="">
                                <Stamp>Location</Stamp>
                                <Detail>{this.state.group.address}</Detail>

                            </div>
                        </GroupDetails>


                    </GroupDetailFoot>

                </BannerSec>



                <div className="fullArticlegrp">
                    <div className="sC-buton">
                    <PopularTitle><b> COMMUNITY ARTICLES </b></PopularTitle>
                    <Link to={{
                        pathname: "/newarticle",
                        group: this.state.group
                    }} >
                        <button type="button" className="inviteFriendBtn btn-fill-blue"  >CREATE ARTICLE </button>
                    </Link>

                    <label className="LinkArticle">
                        {this.state.group.groupType == "PUBLIC" &&
                            <button type="button" className="inviteFriendBtn btn-fill-blue" onClick={() => this.setState({ show: true })}>LINK ARTICLES</button>
                        }
                    </label>
                    </div>
                    <ArticleCards articles={this.state.articles} />
                    {/* <div className="popularArticles">

                         {this.state.articles.map((article) => {
                            return (
                                <div className="article" key={article.id}>
                                    <div className="content">
                                        <img src={article.image ? article.image : this.state.dimg} alt="article image" name="articleimg" className="articleImg" />
                                        <div className="articleFoot">
                                            <div className="articleDesc">
                                                <Link to={`/article/${article.slug}`} className="article_link">
                                                    <p className="articleTitle">{article.title}</p>
                                                    <p className="articleIntro">{article.introduction}</p>
                                                </Link>
                                                <label className="articleWriter">Michael Brodie</label>
                                            </div>
                                            <div className="articleActions flexRow evenSpace">
                                                <label className="timeStamp">{moment(article.createdDate).format("MMM D, YYYY")}</label>
                                                <div>
                                                    <span className="action actionCmnt"><i className="fa fa-comment-o" aria-hidden="true"></i></span>
                                                    <span className="action actionBookmrk"><i className="fa fa-bookmark" aria-hidden="true"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        }
                    </div>*/}
                    </div>

               

                <div className="haCenter">
                    <Choose>
                        <When condition={!this.props.isLoggedIn}>
                            <Link to="/login">
                                <button type="button" className="leaveGrpBtn btn-fill-blue btn-org-border">JOIN COMMUNITY</button>
                            </Link>
                        </When>
                    </Choose>
                    {/*  <div className="LinkArticle">
                        {this.state.group.groupType == "PUBLIC" &&
                            <button type="button" className="inviteFriendBtn btn-fill-blue" onClick={() => this.setState({ show: true })}>LINK ARTICLES</button>
                        }
                    </div> */}

                    <Choose>
                        <When condition={this.props.isLoggedIn}>
                            <button type="button" className={this.state.currentUserMember ? "leaveGrpBtn btn-fill-blue btn-org-border" : "inviteFriendBtn  btn-fill-blue btn-org-border"} onClick={(e) => this.state.currentUserMember ? this.groupAction(0) : this.groupAction(1)}>
                                {this.state.currentUserMember ? "LEAVE GROUP" : "JOIN GROUP"}
                            </button>
                        </When>
                    </Choose>
                    <button type="button" className="inviteFriendBtn btn-fill-blue">INVITE FRIENDS</button>

                    {/*}  <Link to={{
                        pathname:"/newarticle",
                        group:this.state.group
                    }} >
                    <button type="button" className="inviteFriendBtn btn-fill-blue">CREATE ARTICLE</button>
                  
                </Link>*/}
                </div>
                {/*  {this.e ? joinGroup(this.props.groupId) : */}
                {/* <div className="rightfixedbox">
                        <button type="button" className="commentBtn">
                            <i className="fa fa-comment"></i>
                        </button>
                    </div> */}

                <div>



                    <Modal show={this.state.show} onHide={() => this.handleClose()} size="lg"

                        aria-labelledby="contained-modal-title-vcenter"
                        centered >
                        <Modal.Header closeButton>
                            <Modal.Title>  Link Your Article With {this.state.group.name}</Modal.Title>
                        </Modal.Header>


                        <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>

                            <div className="grid-container">
                                {this.state.articlesUser.map((article, index) => (



                                    <div key={index} className={this.isPresent(index) == true ? "grid-item-T" : "grid-item"} onClick={(e) => this.isAbsent(e, index)}>

                                        <div className="articleCombine card-content">


                                            <div className="cardModal">
                                                <div className="imgWrapperCentre">
                                                    <img src={article.image} className="card-img-top-Modal" alt="..." />
                                                </div>
                                                <div className="card-body secondModal">
                                                    <h5 className="card-title-Modal">{article.title}</h5>
                                                    <p className="articleIntro">{article.introduction.split("").splice(0, 20).join("")}</p>




                                                </div>


                                            </div>
                                            <label className="shift-right">
                                                <input type="checkbox" className="checkStyle" checked={this.isPresent(index)} />
                                                <span className="checkmark"></span>

                                            </label>

                                        </div>

                                    </div>


                                ))}

                            </div>
                        </Modal.Body>
                      <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>
                                Close
                        </Button>
                            <Button variant="primary" onClick={() => this.onArticleLink()}>

                                Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                 </div>
                </div>
                </Container>
                <div className="haCenter">
                    <button type="button" className="upBtn" onClick={(e) => this.scrollup(e)}><i className="fa fa-angle-up" aria-hidden=""></i></button>
                </div>

                <Footer />
            </React.Fragment >
        )
    }
}

function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : ""
    let groupId = ownProps.match.params.id;
    let currentgroup = state.Groups.groups.find(x => x.id == groupId);
    if (currentgroup == 0) {
        currentgroup = state.Groups.group.find(x => x.id == groupId);
    }
    let isLoggedIn = state.Authentication.loggedIn;

    return {
        currentUrl,
        currentgroup,
        groupId,
        isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        popActions: bindActionCreators(PopActions, dispatch),
        myarticleAction: bindActionCreators(myarticleAction, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutGroups);