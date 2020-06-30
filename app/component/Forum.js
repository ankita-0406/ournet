import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import moment from "moment";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../style/component/NewForum.css';
import '../../style/component/Forum.css';
import { bindActionCreators } from 'redux';
import * as ForumActions from '../actions/forumActions';
import UUID from "../util/communityIds";
import { Container, Row, Col } from "react-bootstrap";
import SimpleReactValidator from 'simple-react-validator';
import Meta from '../common/Meta';
import LeftColumn from "../common/leftColumn"


class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            locationTag: this.props.city,
            totalForums: '',
            forums: [],
            onlyMineTopics: false,
            order: "CHRONOLOGICAL",
            pageIndex: 0,
            pageSize: 15,
            filter: '',
            toggle: -1,
            communityId: '',
            message: ''
        }
        this.validator = new SimpleReactValidator({
            messages: {
                // required: "Please specify a password"
            },
        })
    }

    componentDidMount() {
        let communityId = UUID.getCommunityID(this.props.city);
        this.setState({ communityId });
        console.log("community", communityId, this.props.city);
        if (communityId != null) {
            this.fetchForums(this.state.pageSize, communityId)
        }
        this.newThread()
    }

    fetchForums = (itemsPerPage, communityId) => {
        this.props.forumActions.getForums(communityId, this.state.onlyMineTopics, this.state.order, this.state.pageIndex, itemsPerPage, this.state.filter).then((resp) => {
            this.setState({
                forums: resp.topics,
                totalForums: resp.totalCommunities
            });
        })
    }



    onChangeItemsPage = () => {
        if (this.state.totalForums > this.state.pageSize) {
            let itemsPerPage = this.state.pageSize + 10;
            this.setState({
                pageSize: itemsPerPage
            })
            this.fetchForums(itemsPerPage, this.state.communityId);
        }
        else {
            swal({
                title: "That's it",
                icon: 'warning',
                timer: 1000
            })
        }
    }

    onChangeItems = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onCancel = () => {
        this.setState({ new: false })
    }

    newThread = () => {
        if (this.state.locationTag) {
            if (this.props.isLoggedIn) {
                this.setState({ message: 'NEW THREAD' })
            }
            else {
                this.setState({ message: 'Login - NEW THREAD' })
            }
        }
        else {
            this.setState({ message: 'Choose Location' })
        }
    }

    onClickButton = () => {
        const { history } = this.props
        if (this.state.locationTag) {
            if (this.props.isLoggedIn) {
                // history.push('/newforum')
                this.setState({ new: !this.state.new, message: 'NEW THREAD' })
            }
            else {
                history.push("/login");
            }
        }
        else {
            history.push("/location");
        }
    }

    onSave = () => {
        let data = {};
        data.title = this.state.title;
        data.description = this.state.description;
        data.communityId = this.state.communityId;
        if (this.validator.allValid()) {
            this.props.forumActions.NewForum(data).then((resp) => {
                if (resp == true) {
                    swal({
                        title: 'Forum published successfully!',
                        text: 'Forum has been published successfully',
                        icon: 'success',
                        timer: 900
                    })
                    this.fetchForums(this.state.pageSize, this.state.communityId);
                    this.onCancel();
                }
            }).catch((err) => swal({
                title: 'Email Not Vaild!',
                text: err,
                icon: 'error',
                timer: 1200
            }));
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    scrollup() {
        document.body.scrollTo({ top: 0, behavior: 'smooth' })
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }

    render() {
        return (
            <React.Fragment>
                {/* <Header currentUrl={this.props.currentUrl} /> */}
                <Meta title="Chat" />
                <Container fluid>
                <div class="row">
                        {/* <LeftColumn path={this.props.path} /> */}

                        <div className="rightcolumn">
                        <div className="section">
                            <div className="secHeader flexRow evenSpace">
                                <Row>
                                    <Col className="s-width">
                                        <div className="flexRow">
                                            <div className="secTitle" style={{marginLeft: '20px'}} >
                                                <label className="secName">Chat</label><br />
                                                <label className="secDesc">{this.props.address ? this.props.address : "Chat, discuss, comment, interact"}</label>
                                            </div>
                                            {/* <Link to={this.state.locationTag ? (this.props.isLoggedIn ? "/newforum" : "/login") : "/location"}><button type="button" className="forumHeaderBtn btn-fill-blue">{this.state.locationTag ? "NEW THREAD" : "Choose Location"}</button></Link> */}

                                            {/* <div className="secTitle">
                                        <label className="secNameGroup">Group Forum </label><br />
                                        <label className="secDescGroup">{this.state.group.name}</label>
                                    </div> */}
                                            {/* <If condition={!this.state.new}> */}
                                            {/* <Link to={this.state.locationTag ? (this.props.isLoggedIn ? "/newforum" : "/login") : "/location"}>

                                        </Link> */}
                                            <div className="haCenter" style={{ marginRight: 'inherit' }}>
                                                <button type="button" className="forumHeaderBtn btn-fill-blue" onClick={() => this.onClickButton()}>{this.state.message}</button>
                                            </div>
                                            {/* </If> */}
                                        </div>
                                    </Col>
                                    {/* <Col> */}
                                    <If condition={this.state.new}>
                                        <Col>
                                            <div className="newForumSec">
                                                <div className="box">
                                                    <div className="forumFieldBox">
                                                        <label className="fieldTitle">Title</label>
                                                        <div className="flexRow">
                                                            <input id="title" type="text" onChange={this.onChangeItems} className="forumField " placeholder="Title" />
                                                        </div>
                                                        <span style={{ "color": "#a94442" }}> {this.validator.message('Title', this.state.title, 'required|string')} </span>
                                                    </div>
                                                    <div className="forumFieldBox">
                                                        <label className="fieldTitle">Topic Description</label>
                                                        <div className="flexRow">
                                                            <textarea id="description" type="text" onChange={this.onChangeItems} className="forumField descField" placeholder="Up to 3000 characters" ></textarea>
                                                        </div>
                                                        <span style={{ "color": "#a94442" }}> {this.validator.message('Description', this.state.description, 'required|string')} </span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="haCenter">
                                                <div className="buttonWidth">
                                                    <button type="button" className="forumcancelBtn btn-fill-blue" onClick={this.onSave}>SAVE</button>
                                                    <button type="button" className=" forumsaveBtn btn-fill-blue btn-solid-border" onClick={this.onCancel}>CANCEL</button>
                                                </div>
                                            </div>
                                        </Col>

                                    </If>
                                    {/* </Col> */}
                                </Row>
                            </div>
                            <If condition={this.props.city}>
                                <div className="forumSec">
                                    {this.state.forums.map((forum, key) => {
                                        return (
                                            <div className="topicBlock" key={forum.id}>
                                                <div className="flexRow">
                                                    <div className="topicBox flexColumn evenSpace">
                                                        <div className="topicDesc flexRow">
                                                            <Link to={`/userprofile/${forum.author.userId}`}>
                                                                <div className="topicProfileImg topicProfiletext">{forum.author.firstName.charAt(0)}</div>
                                                            </Link>
                                                            <div className="topicContentWrap">
                                                                <Link to={`/comment/${forum.id}`}>
                                                                    <p className="topicAuthorDesc"><span>{forum.author.firstName} {forum.author.lastName}</span>{moment(forum.date).format("MMM D, YYYY")}</p>
                                                                    <p className="topicDetails">{forum.title}</p>
                                                                    <p className="topic-reply"><i className="fa fa-reply" aria-hidden="true"></i> {forum.replies} Reply</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="haCenter">
                                    <button type="button" className="loadmoreBtn rating-loading btn-fill-blue loadmoreButtonClass" onClick={this.onChangeItemsPage}>Load More</button>
                                </div>
                            </If>
                            <If condition={!this.props.city}>
                                <label className="logout"> Choose a location to get started! </label>
                            </If>
                        </div>
                        </div>
                        
                   </div>
                   </Container>
                   <div className="haCenter">
                            <button type="button" className="upBtn"><i className="fa fa-angle-up" aria-hidden="" onClick={(e) => this.scrollup(e)}></i></button>
                        </div>
                <Footer />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let isLoggedIn = state.Authentication.loggedIn;
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let city = state.Locations.locations[0].locationTag ? state.Locations.locations[0].locationTag : "";
    let path = ownProps.location ? ownProps.location.pathname : ""
    let address = state.Locations.locations[0].address

    return {
        isLoggedIn,
        currentUrl,
        city,
        path,
        address
    };
}

function mapDispatchToProps(dispatch) {
    return {
        forumActions: bindActionCreators(ForumActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Forum);