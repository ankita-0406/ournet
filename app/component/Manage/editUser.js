import React, { Component } from 'react';
import Header from "../Header";
import Footer from "../Footer";
import AdminHeader from './adminHeader';
import * as UserActions from '../../actions/adminActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import { Container } from 'react-bootstrap';

class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedUserId: this.props.loggedUserId,
            firstName: "",
            middleName: "",
            lastName: "",
            username: "",
            email: "",
            description: "",
            roleCode: "",
            publicName: "USER_NAME",
        }
    }

    componentDidMount() {
        this.scrollup();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log([e.target.name], e.target.value);
    }

    onChangeDisplayType = (e) => {
        let value = "REAL_NAME";
        if (e.target.id == "nicknameBtn") {
            value = 'USER_NAME';
        }
        else {
            value = 'REAL_NAME';
        }
        console.log(value);
        this.setState({
            publicName: value
        })
    }

    onSave = () => {
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            description: this.state.description,
            roleCode: this.state.roleCode,
            publicName: this.state.publicName,
        }
        console.log(data);
        this.props.userActions.addUser(data).then((resp) => swal({
            title: 'User Profile Saved!',
            text: 'The user profile has been saved',
            icon: 'success',
            timer: 900
        })).catch((c) => swal({
            title: 'Error',
            text: c,
            icon: 'error',
            timer: 2000
        }));
    }

    scrollup() {
        window.scrollTo(0, 0);
    };


    render() {
        return (
            <React.Fragment>
                <Header currentUrl={this.props.currentUrl} />
                <AdminHeader currentUrl={this.props.currentUrl} />
                <Container>
                    <div className="section">
                        <div className="page-title-admin"><h1>Edit User - user.name </h1></div>
                        <div className="profileSec adduser-top">
                            <div className="flexRow evenSpace">
                                <div className="box profileDisplayBox">
                                    <div className="profilePicHolder profilePicHolder-admin">
                                        <img src="img/empty-avatar.png" className="profilePic" alt="Image" name="profilePic" />
                                        {/* <button type="button" className="camIcon">
                                            <i className="fa fa-camera"></i>
                                        </button> */}
                                    </div>
                                    <div className="name nameAdmin">
                                        <label className="firstName">{this.state.firstName}</label>
                                        <label className="lastName">{this.state.lastName}</label>
                                    </div>
                                    {/* <div className="haCenter profileDetails">
                                        <div>
                                            <label className="stamp">MEMBER SINCE</label>
                                            <span className="details timeDetail">Aug, 2017</span>
                                        </div>
                                    </div> */}
                                    <div className="flexRow evenSpace profileDetails">
                                        <div>
                                            <label className="stamp">ARTICLES</label>
                                            <span className="details">0</span>
                                        </div>
                                        <div>
                                            <label className="stamp">GROUPS</label>
                                            <span className="details">0</span>
                                        </div>
                                        <div>
                                            <label className="stamp">EVENTS</label>
                                            <span className="details">0</span>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="box profileFieldBox box-right">
                                    <div className="flexColumn evenSpace">
                                        <div className="profilefieldBox">
                                            <label className="fieldTitle">First Name</label>
                                            <div className="flexRow">
                                                <input type="text" className="profilefield" name="firstName" onChange={this.onChange} value={this.state.firstName} />
                                            </div>
                                        </div>
                                        <div className="profilefieldBox">
                                            <label className="fieldTitle">Middle Name</label>
                                            <div className="flexRow">
                                                <input type="text" className="profilefield" name="middleName" onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="profilefieldBox">
                                            <label className="fieldTitle">Last Name</label>
                                            <div className="flexRow">
                                                <input type="text" className="profilefield" name="lastName" onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="flexRow evenSpace profilefieldBox">
                                            <div className="coverSpace">
                                                <label className="fieldTitle">Profile Name / Nickname</label>
                                                <div className="flexRow">
                                                    <input type="text" className="profilefield" name="username" onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="peopleseeBox">
                                                <label className="fieldTitle">Which one would people see?</label>
                                                <div className="flexRow">
                                                    <div className="customRadioBtn flexIB">
                                                        <input type="radio" className="" name="publicUserName" id="fullnameBtn" onChange={this.onChangeDisplayType} checked={this.state.publicName == "REAL_NAME"} />
                                                        <label htmlFor="fullnameBtn">Full Name</label>
                                                    </div>
                                                    <div className="customRadioBtn flexIB">
                                                        <input type="radio" className="" name="publicUserName" id="nicknameBtn" onChange={this.onChangeDisplayType} checked={this.state.publicName == "USER_NAME"} />
                                                        <label htmlFor="nicknameBtn">Nick Name</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profilefieldBox">
                                            <label className="fieldTitle">E-mail address</label>
                                            <div className="flexRow">
                                                <input type="mail" className="profilefield" name="email" onChange={this.onChange} />
                                            </div>
                                        </div><div className="profilefieldBox">
                                            <label className="fieldTitle">Tell us briefly about you</label>
                                            <div className="flexRow">
                                                <textarea className="profilefield" name="description" onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="profilefieldBox">
                                            <label className="fieldTitle">User Type</label>
                                            <select name="roleCode" className="fieldTitle profilefield" onChange={this.onChange} >
                                                <option value="author">Author</option>
                                                <option value="admin">Admin</option>
                                                <option value="superuser">Super User</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="haCenter">
                        <button type="button" disabled={this.state.errPassword} className="profilesaveBtn btn-fill-blue" onClick={() => this.onSave()}>Save</button>
                    </div>
                    <div className="haCenter">
                        <button type="button" className="upBtn" onClick={(e) => this.scrollup(e)}><i className="fa fa-angle-up" aria-hidden=""></i></button>
                    </div>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    return {
        currentUrl
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
