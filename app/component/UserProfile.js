import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import moment from "moment";
import { Link } from 'react-router-dom';
import * as Myprofileaction from '../actions/authorProfileActions';
import * as Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// const Scroll = require('react-scroll');
// var scroll = Scroll.animateScroll;

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            articles: [],
            groups: [],
            //     [{ firstName: 'Lakshya', lastName: 'Tyagi' },
            //     { articles: '2', groups: 33 },
            //     { events: '3', lastName: 68 }],
            pageIndex: 0,
            dimg: "../../img/empty-avatar.png",
            pageSize: 10,
            totalArticles: 0
        }
    }

    componentDidMount() {
        this.props.myprofileAction.getAuthorProfile(this.props.userId).then((resp) => {
            this.setState({
                profile: resp
            });
        })

        this.props.myprofileAction.getAuthorArticles(this.props.userId, this.state.pageIndex, this.state.pageSize).then((resp) => {
            this.setState({
                articles: resp.articles
            });
            this.resize();
        })

        this.props.myprofileAction.getAuthorGroups(this.props.userId, this.state.pageIndex, this.state.pageSize).then((resp) => {
            this.setState({
                groups: resp.groups
            });
        })
        this.scrollup();
    }

    resize() {
        function resizeGridItem(item) {
            let grid = document.getElementsByClassName("popularArticles")[0];
            let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
            let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
            let rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = "span " + rowSpan;
        }

        function resizeAllGridItems() {
            let allItems = document.getElementsByClassName("article");
            for (let x = 0; x < allItems.length; x++) {
                resizeGridItem(allItems[x]);
            }
        }
        window.onload = resizeAllGridItems();
        window.addEventListener("resize", resizeAllGridItems);
    }

    scrollup() {
        window.scrollTo(0, 0);
    };

    render() {
        return (
            <div>
                <Header />
                <Container>
                    <div className="section">
                        <div className="secHeader flexRow evenSpace">
                            <div className="secTitle">
                                <label className="secName">{this.state.profile['username']}'s profile</label><br />
                            </div>
                        </div>
                        <div className="profileSec">
                            <div className="flexRow evenSpace">
                                <div className="box profileDisplayBox">
                                    <div className="profilePicHolder">
                                        <img src={this.state.profile['avatar'] ? this.state.profile['avatar'] : this.state.dimg} className="profilePic" alt="Image" name="profilePic" />
                                    </div>
                                    <div className="name">
                                        <label className="firstName">{this.state.profile['firstName']}</label>
                                        <label className="lastName">{this.state.profile['lastName']}</label>
                                    </div>
                                    <div className="haCenter profileDetails">
                                        <div>
                                            <label className="stamp">MEMBER SINCE</label>
                                            <span className="details timeDetail">Aug, 2017</span>
                                        </div>
                                    </div>
                                    <div className="flexRow evenSpace profileDetails">
                                        <div>
                                            <label className="stamp">ARTICLES</label>
                                            <span className="details">{this.state.profile['articles']}</span>
                                        </div>
                                        <div>
                                            <label className="stamp">
                                            COMMUNITIES</label>
                                            <span className="details">{this.state.profile['groups']}</span>
                                        </div>
                                        <div>
                                            <label className="stamp">EVENTS</label>
                                            <span className="details">{this.state.profile['events']}</span>
                                        </div>
                                    </div>
                                    <div className="haCenter profileDetails">
                                        <div>
                                            <label className="stamp">AUDIENCE ENGAGEMENT</label>
                                            <div className="profielRating">
                                                <span className="ratingStar"><i className="fa fa-star"></i></span>
                                                <span className="ratingStar"><i className="fa fa-star"></i></span>
                                                <span className="ratingStar"><i className="fa fa-star"></i></span>
                                                <span className="ratingStar"><i className="fa fa-star"></i></span>
                                                <span className="ratingStar"><i className="fa fa-star"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box profileFieldBox userBioSec">
                                    <div className="flexColumn evenSpace">
                                        <div className="userbioBox">
                                            <label className="secName">Biography</label>{this.state.profile['description'] ? this.state.profile['description'] : "Bio is not provided by the User!"}</div>
                                        <div className="profilefieldBox profileuserArticleBox">
                                            <label className="popularTitle">Articles</label>
                                            <div className="popularArticles" >
                                                {this.state.articles.map((article) => {
                                                    return (
                                                        <div className="article" key={article.id}>
                                                            <Link to={`/article/${article.slug}`}>
                                                                <div className="content">
                                                                    <img src={article.image ? article.image : this.state.dimg} alt="article image" name="articleimg" className="articleImg" />
                                                                    <div className="articleFoot">
                                                                        <div className="articleDesc">
                                                                            <p className="articleTitle">{article.title}</p>
                                                                            <label className="articleWriter">{article.author.firstName} {article.author.lastName}</label>
                                                                        </div>
                                                                        <div className="articleActions flexRow evenSpace">
                                                                            <label className="timeStamp">{moment(article.date).format("MMM D, YYYY")}</label>
                                                                            <div>
                                                                                {/* <span className="action actionCmnt"><i className="fa fa-comment-o" aria-hidden="true" /></span> */}
                                                                                <span className="action actionBookmrk"><i className="fa fa-bookmark" aria-hidden="true" /></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="profilefieldBox profileuserArticleBox">
                                            <label className="popularTitle">Communities</label>
                                            <div className="popularArticles" >
                                                {this.state.groups.map((group) => {
                                                    return (
                                                        <div className="article" key={group.id}>
                                                            <Link to={`/aboutgroups/${group.id}`}>
                                                                <div className="content">
                                                                    <img src={group.image ? group.image : this.state.dimg} alt="article image" name="articleimg" className="articleImg" />
                                                                    <div className="articleFoot">
                                                                        <div className="articleDesc">
                                                                            <p className="articleTitle">{group.name}</p>
                                                                            <label className="articleWriter">{group.owner.firstName} {group.owner.lastName}</label>
                                                                        </div>
                                                                        <div className="articleActions flexRow evenSpace">
                                                                            <label className="timeStamp">{moment(group.owner.created).format("MMM D, YYYY")}</label>
                                                                            <div>
                                                                                {/* <span className="action actionCmnt"><i className="fa fa-comment-o" aria-hidden="true" /></span> */}
                                                                                <span className="action actionBookmrk"><i className="fa fa-bookmark" aria-hidden="true" /></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="haCenter">
                        <button type="button" className="upBtn" onClick={this.scrollup}><i className="fa fa-angle-up" aria-hidden=""></i></button>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let userId = ownProps.match.params.id;
    // let loggedUserId = state.Authentication.loggedUserId;
    // let profile = state.MyProfile.profile;
    return {
        // loggedUserId,
        // profile,
        currentUrl,
        userId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        myprofileAction: bindActionCreators(Myprofileaction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);