import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import moment from "moment";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Myprofileaction from '../actions/myprofileAction';
import * as myarticleAction from '../actions/myarticleAction';
import * as articleAction from "../actions/popularArticleActions";
import { strictEqual } from 'assert';
import swal from 'sweetalert';
import { Container, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';



const SecHeader = styled.div`
padding: 50px 0px 0px 0px;
  align-items: flex-end;
  /* position: relative; */
  display: flex;
  flex-flow: row;
  /* overflow: hidden; */

  justify-content:space-between;
  `;
const SecName = styled.label`
text-align: left;
  font: Bold 40px/34px Lato;
  letter-spacing: 0;
  color: #024b99;

  `;
const SecDesc = styled.label`
  text-align: left;
  font: 26px/30px Lato;
  letter-spacing: 0;
  color: #024b99;
  opacity: 1;
  display: block;
  margin-top: 10px;

`;
const MyArticleSec = styled.div`
-webkit-columns: 2;
  -moz-columns: 2;
  columns: 2;
  -webkit-column-gap: normal;
  -moz-column-gap: normal;
  column-gap: normal;
  padding: 50px 0px;
  @media only screen and (max-width: 480px) {
    -webkit-columns: 1;
    -moz-columns: 1;
    columns: 1;
  }
  `;

const MyArticleBlock = styled.div`
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid-column;
  display: table;
  width: calc(100% - 10px);
  margin: 0px 20px 40px -4px;
  /* margin-left: 5px; */
  /* margin-right:5px: */
  border-radius: 10px;
  overflow: hidden;
`;
const FlexRow = styled.div`
/* position: relative; */
display: flex;
flex-flow: row;
/* overflow: hidden; */
`;
const MyArticleBox = styled.div`
padding: 20px;
background: #fff;
width: 100%;
/* position: relative; */
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  justify-content:space-between;
  @media only screen and (max-width: 480px) {
  
    padding: 10px;

}
  `;
const MyArticleTitle = styled.p`
  width: 180px;
  text-align: left;
  font: Bold 20px/24px Lato;
  letter-spacing: 0;
  color: #000000;
  margin-top: 0px;
  flex: 1;
`;
const MyArticleDeleteBtn = styled.button`
width: 60px;
  height: 60px;
  background: red;
  color: #fff;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font: 30px/30px Lato;
  padding: 0px;
  text-align: center;
  line-height: 60px;
  margin-left: 15px;
`;

const MyArticlePublishBtn = styled.button`
width: 60px;
  height: 60px;
  background: blue;
  color: #fff;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font: 30px/30px Lato;
  padding: 0px;
  text-align: center;
  line-height: 60px;
  margin-left: auto;
`;

const MyArticleEditBtn = styled.button`
  width: 60px;
  height: 60px;
  background: #4fbfae;
  color: #fff;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font: 30px/30px Lato;
  padding: 0px;
  text-align: center;
  line-height: 60px;
  margin-left: 105px;
    @media only screen and (max-width: 480px) {
    margin-left: 20px;
  } 
 
  `;

const MyArticleDetails = styled.div`
margin-top: 30px;
/* position: relative; */
display: flex;
flex-flow: row;
/* overflow: hidden; */
justify-content:space-between;
`;

const Writer = styled.span`
text-align: left;
  font: 14px/14px Lato;
  letter-spacing: 0;
  color: #024b99;
  `;
const LoadMoreBtn = styled.button`
  display: inline-block;
      margin-top: 70px !important;
      margin: 0px 20px;
      height: 60px;
      line-height: 60px;
      width: 332px;
      margin: 50px 0px;
  
      font-size: 0;
      color: #fff;
      background: url(../../img/loading.gif) top left no-repeat;
      border: none;
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



class MyArticle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            pageIndex: 0,
            pageSize: 10,
            userName: "",
            totalArticles: 0,
            fetching: true,
            sorting: "PUBLISHED"
        }
    }

    componentDidMount() {
        this.fetchArticles(this.state.pageSize, this.state.sorting);
        this.props.myprofileaction.getmyprofile(this.props.userId).then((resp) => {
            this.setState({
                userName: resp['firstName'] + " " + resp['lastName']
            })
        })
    }

    fetchArticles = (pageSize, sorting) => {
        this.props.myarticleAction.getMyArticles(this.state.pageIndex, pageSize, sorting).then((resp) => {
           console.log("checking article", resp.articles)
            this.setState({
                articles: resp.articles,
                totalArticles: resp.totalArticles,
                fetching: false
            });
        })
    }

    onPublish = (id , slug) => {

        this.props.articleAction.getArticlebySlug(slug).then((resp) => {
            if(resp.indroduction!="" && resp.tagName.length!==0 && resp.groups.length!==0 && resp.address!=""){
                swal({
                    title: "Are you sure?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            this.props.articleAction.publishArticle(id).then((resp) => {
                                swal({
                                    title: 'Article Publish!',
                                    text: 'The Article was Published Successfully',
                                    icon: 'success',
                                    timer: 1200
                                })
                                this.fetchArticles(this.state.pageSize, this.state.sorting);
                            })
                        }
                    });
            }
            else{
                swal({
                    title: "Missing!",
                    text: "Some Fields are Missing, You Cannot Publish",
                    icon: "warning",
                    button: "Ok",
                  });

            }
          });

        
    }

    onDelete = (id) => {
        console.log(id);

        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.myarticleAction.deleteMyArticles(id).then((resp) => {
                        swal({
                            title: 'Article Deleted!',
                            text: 'The Article was Deleted Successfully',
                            icon: 'success',
                            timer: 1200
                        })
                        this.fetchArticles(this.state.pageSize, this.state.sorting);
                    })
                }
            });
        //for warning message

    }

    onChangeItemsPage() {
        if (this.state.totalArticles > this.state.pageSize) {
            let itemsPerPage = this.state.pageSize + 10;
            this.setState({
                pageSize: itemsPerPage
            })
            this.fetchArticles(itemsPerPage, this.state.sorting);
        }
        else {
            swal({
                title: "That's it",
                icon: 'warning',
                timer: 1000
            })
        }
    }

    sorting = (sorting) => {
        this.fetchArticles(this.state.pageSize, sorting);
        this.setState({ sorting });
    }

    scrollUp = () => {
        document.body.scrollTo({ top: 0, behavior: 'smooth' })
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }

    render() {
        return (
            <React.Fragment>
                <Header currentUrl={this.props.currentUrl} />
                <Container>
                {/* <div className="row">
                    <div className="rightcolumn"> */}
                    <div className="section">
                        <SecHeader>
                            <div className="secTitle">
                                <SecName>My Articles</SecName>
                                <SecDesc>Check and edit your articles.</SecDesc>
                            </div>
                            <div>
                                <Dropdown className="filter-btn" >
                                    <Dropdown.Toggle id="dropdown-basic" className="btn btn-light btn-lg secDesc"> <i className="fa fa-sort-amount-asc" aria-hidden="true"></i> {this.state.sorting} </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-content">
                                        <Dropdown.Item onClick={() => this.sorting("PUBLISHED")} > <p>Published</p> </Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.sorting("SUSPENDED")} > <p> Suspended </p></Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.sorting("DRAFT")} > <p>Draft</p> </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </SecHeader>
                        <MyArticleSec>
                            {this.state.articles.map((article) => {
                                return (
                                    <MyArticleBlock key={article.id}>
                                        <FlexRow>
                                            <MyArticleBox>
                                                <div className="myArticleDesc flexRow evenSpace">
                                                    <Link to={`/article/${article.slug}`}>
                                                        <p className="myArticleTitle">{article.title}</p>
                                                    </Link>
                                                    
                                                    <MyArticleEditBtn
                                                        type="button"
                                                        onClick={() => { this.props.history.push(`/editarticle/${article.slug}`) }}>
                                                        <i className="fa fa-pencil"></i>
                                                    </MyArticleEditBtn>
                                                    <If condition={this.state.sorting == "DRAFT"}>
                                                        <MyArticlePublishBtn onClick={() => this.onPublish(article.id , article.slug)}>
                                                            <i className="fa fa-paper-plane-o"></i>
                                                        </MyArticlePublishBtn>
                                                    </If>
                                                    <MyArticleDeleteBtn
                                                        onClick={() => this.onDelete(article.id)}>
                                                        <i className="fa fa-trash-o"></i>
                                                    </MyArticleDeleteBtn>
                                                </div>
                                                <MyArticleDetails>
                                                    <div>
                                                        <Writer>{moment(article.createdDate).format("MMM D, YYYY")}</Writer>
                                                    </div>
                                                    <FlexRow>
                                                        <div>
                                                            <span className="cmnt"><i className="fa fa-comments-o"></i><span>0 chats</span></span>
                                                        </div>
                                                        <div>
                                                            <span className="bkmrk"><i className="fa fa-eye"></i><span>{article.views} Views</span></span>
                                                        </div>
                                                    </FlexRow>
                                                </MyArticleDetails>
                                            </MyArticleBox>
                                        </FlexRow>
                                    </MyArticleBlock>
                                )
                            })}
                        </MyArticleSec>
                    </div>
                    <div className="haCenter">
                        {this.state.fetching ? <div className="spinner-grow text-primary" style={{ "width": "3rem", "height": "3rem" }} role="status">
                            <span className="sr-only">Loading...</span> </div> :
                            <LoadMoreBtn type="button" onClick={(e) => this.onChangeItemsPage(e)}>Load More Articles</LoadMoreBtn>}
                    </div>
                    <div className="haCenter">

                        <UpBtn type="button" onClick={() => this.scrollUp()}><i className="fa fa-angle-up" aria-hidden=""></i></UpBtn>
                    </div>
                    {/* </div>
                    </div> */}
                </Container>
                <Footer />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let author = state.MyProfile.profile.firstName + " " + state.MyProfile.profile.lastName;
    let userId = state.Authentication.loggedUserId;
    return {
        currentUrl,
        author,
        userId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        myprofileaction: bindActionCreators(Myprofileaction, dispatch),
        myarticleAction: bindActionCreators(myarticleAction, dispatch),
        articleAction:  bindActionCreators(articleAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyArticle);