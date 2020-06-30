import React, { Component, Fragment } from 'react';
import Footer from './Footer';
import Header from './Header';
import '../../style/component/NewForum.css';
import * as Myprofileaction from '../actions/myprofileAction';
import * as ForumActions from '../actions/forumActions';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from "react-bootstrap";

class NewForum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            userName: '',
            communityId: this.props.communityId
        }
        this.validator = new SimpleReactValidator({
            messages: {
                // required: "Please specify a password"
            },
        })
    }

    onChangeItems = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentDidMount() {
        this.props.myprofileaction.getmyprofile(this.props.userId).then((resp) => {
            this.setState({
                userName: resp['firstName'] + " " + resp['lastName']
            })
        })
    }

    cancel = () => {
        this.props.history.goBack();
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
                    const { history } = this.props
                    history.push("/forum");
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


    render() {
        return (
            <Fragment>
                <Header />
                <Container>
                    <div className="section">
                        <div className="secHeader flexRow evenSpace">
                            <div className="secTitle">
                                <label className="secName">New Thread</label><br />
                                <label className="secDesc">by {this.state.userName}</label>
                            </div>
                        </div>
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
                    </div>

                    <div className="haCenter">
                        <button type="button" className="forumcancelBtn btn-fill-blue" onClick={this.onSave}>SAVE</button>
                        <button type="button" className=" forumsaveBtn btn-fill-blue btn-solid-border" onClick={this.cancel}>CANCEL</button>                       
                    </div>

                    <div className="haCenter">
                        <button type="button" className="upBtn"><i className="fa fa-angle-up" aria-hidden=""></i></button>
                    </div>
                </Container>
                <Footer />
            </Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    // let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let userId = state.Authentication.loggedUserId;
    let communityId = state.Locations.locations[0].communityId ? state.Locations.locations[0].communityId : "";
    return {
        userId,
        communityId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        myprofileaction: bindActionCreators(Myprofileaction, dispatch),
        forumActions: bindActionCreators(ForumActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewForum);