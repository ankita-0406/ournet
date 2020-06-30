import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import moment from "moment";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import '../../style/component/Forum.css';
import SimpleReactValidator from 'simple-react-validator';
import { bindActionCreators } from 'redux';
import * as PopActions from '../actions/groupActions';
import Commentsection from './commentsection';

class groupForum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            groupId: this.props.groupId,
            forums: [],
            onlyMineTopics: false,
            order: "CHRONOLOGICAL",
            pageIndex: 0,
            pageSize: 15,
            filter: '',
            toggle: -1,
            new: false,
            title: '',
            description: ''
        }
        this.validator = new SimpleReactValidator({
            messages: {
                // required: "Please specify a password"
            },
        })
    }

    componentDidMount() {
        this.fetchGroupsForums();
        if (this.props.currentgroup == null) {
            this.fetchGroups(this.props.groupId);
        }
        else {
            this.setState({
                group: this.props.currentgroup,
                currentUserMember: this.props.currentgroup.currentUserMember
            });
        }
        window.scrollTo(0, 0);
    }

    fetchGroupsForums = () => {
        this.props.popActions.getGroupForums(this.state.groupId, this.state.onlyMineTopics, this.state.order, this.state.pageIndex, this.state.pageSize, this.state.filter).then((resp) => {
            this.setState({
                forums: resp.topics
            });
        })
    }


    fetchGroups = (groupId) => {
        this.props.popActions.getGroupInfo(groupId).then((group) => {
            this.setState({
                group: group.group,
                currentUserMember: group.currentUserMember
            });
        })
    }

    scrollup = () => {
        document.body.scrollTo({ top: 0, behavior: 'smooth' })
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }

    newThread = () => {
        this.setState({ new: !this.state.new })
    }

    onChangeItems = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onCancel = () => {
        this.setState({ new: false })
    }

    onSave = () => {
        let data = {};
        data.title = this.state.title;
        data.description = this.state.description;
        data.groupId = this.state.groupId;
        if (this.validator.allValid()) {
            this.props.popActions.PublishForum(data).then((resp) => {
                swal({
                    title: 'Group forum published successfully!',
                    text: 'Group forum has been published successfully',
                    icon: 'success',
                    timer: 900
                })
                this.fetchGroupsForums();
                this.onCancel();

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

    render() {
        return (
            <React.Fragment>
                {/* <Header currentUrl={this.props.currentUrl} /> */}
                <Container fluid>
                    <div class="row">
                        <div className="rightcolumn">
                            <div className="section">
                                <div className="secHeader flexRow evenSpace">
                                    <Row>
                                        {/* <Col> */}
                                        <div className="secTitle" style={{ padding: '0 0 0 20px' }}>
                                            <label className="secNameGroup" >Community chat </label><br />
                                            <label className="secDescGroup">{this.state.group.name}</label>
                                        </div>
                                        <If condition={!this.state.new}>
                                            <button style={{ marginLeft: '650px' }} type="button" className="forumHeaderBtn btn-fill-blue" onClick={this.newThread}>NEW THREAD</button>
                                        </If>
                                        {/* </Col> */}


                                        <Col>
                                            <If condition={this.state.new}>
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
                                                    <button type="button" className="forumcancelBtn btn-fill-blue" onClick={this.onSave}>SAVE</button>
                                                    <button type="button" className=" forumsaveBtn btn-fill-blue btn-solid-border" onClick={this.onCancel}>CANCEL</button>
                                                </div>
                                            </If>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="forumSec">
                                    {this.state.forums.map((forum, key) => {
                                        return (
                                            <div className="topicBlock" key={forum.id}>
                                                <div className="flexRow">
                                                    <div className="topicBox flexColumn evenSpace">
                                                        <div className="topicDesc flexRow">
                                                            <Link to={{
                                                                pathname: `/userprofile/${forum.author.userId}`,
                                                                group: true
                                                            }}>



                                                                <div className="topicProfileImg topicProfiletext">{forum.author.firstName.charAt(0)}</div>
                                                            </Link>
                                                            <div className="topicContentWrap">
                                                                <Link to={{
                                                                    pathname: `/comment/${forum.id}`,
                                                                    group: true
                                                                }}>
                                                                    <p className="topicAuthorDesc"><span>{forum.author.username}</span>{moment(forum.date).format("MMM D, YYYY")}</p>
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

                            </div>
                        </div>
                    </div>
                </Container>
                            <div className="haCenter" onClick={this.scrollup}>
                                <button type="button" className="upBtn"><i className="fa fa-angle-up" aria-hidden=""></i></button>
                            </div>
                <Footer />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let groupId = ownProps.match.params.id;
    let currentgroup = state.Groups.groups.find(x => x.id === groupId);

    return {
        currentUrl,
        groupId,
        currentgroup
    };
}

function mapDispatchToProps(dispatch) {
    return {
        popActions: bindActionCreators(PopActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(groupForum);