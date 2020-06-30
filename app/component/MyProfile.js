import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Myprofileaction from '../actions/myprofileAction';
import * as Loginaction from '../actions/loginActions';
import swal from 'sweetalert';
import ModalCropper from './cropper/imageModal';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { Container } from 'react-bootstrap';
import * as ManagedMediaActions from '../actions/ManagedMediaActions';


class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef()

        this.state = {
            loggedUserId: this.props.loggedUserId,
            profile: {},
            oldpassword: "",
            password: "",
            repassword: "",
            errPassword: "",
            page: "myProfile",
            avatar: this.props.profile.avatar
        }
    }

    componentWillMount() {


        this.props.myprofileAction.getmyprofile(this.props.loggedUserId).then((resp) => {

            let profile = resp;



            this.setState({
                profile: resp
            });

        })
    }





    

// componentWillReceiveProps(nextProps) {
//     if (nextProps.profile.avatar !== this.props.profile.avatar) {
//         //Perform some operation
//         let profile = this.state.profile;
//         profile.avatar = nextProps.profile.avatar
//         this.setState({ profile: profile });

//     }
// }

// componentDidMount() {



//     this.props.myprofileAction.getmyprofile(this.props.loggedUserId).then((resp) => {

//         console.log("profile---->" , resp)

//         this.setState({
//             profile: resp
//         });

//     })
//     // this.scrollup();


// }

componentDidUpdate(prevProps, prevState) {
   
        if (prevProps.profile.avatar != this.props.profile.avatar) {
            this.props.myprofileAction.getmyprofile(this.props.loggedUserId).then((resp) => {


                console.log("profile check", this.props.profile)


                this.setState({
                    profile: resp
                });

            })
        }

    

}

componentWillUnmount() {
    this.props.managedMediaActions.uploadMediaFile({ filename: null, file: null, src: null })

}



onChange = (e) => {
    let profile = this.state.profile;
    profile[e.target.name] = e.target.value;
    this.setState({
        profile
    })
}

onChangePassword = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    }, this.passwordValidations)
}

passwordValidations = () => {
    let passwordString = this.state.password;
    let repasswordString = this.state.repassword;
    let errMessage = "";

    if (passwordString && passwordString.length < 8) {
        errMessage = "Password must be at least 8 characters";
    }
    else if (passwordString != repasswordString) {
        errMessage = "Password and confirm password do not match"
    }

    this.setState({
        errPassword: errMessage
    })

}

onChangeDisplayType = (e) => {

    let profile = this.state.profile;
    let value = this.state.profile.publicUserName ? this.state.profile.publicUserName : "REAL_NAME";

    if (e.target.id == "nicknameBtn") {
        value = 'NICK_NAME';
    }
    else {
        value = 'REAL_NAME';
    }

    profile[e.target.name] = value;
    this.setState({
        profile
    })
}

onSave = () => {



    this.props.myprofileAction.updatemyprofile(this.state.profile).then((resp) => {



        console.log("Uploaded Response", resp)

        swal({
            title: 'User Profile Saved!',
            text: 'The user profile has been saved',
            icon: 'success',
            timer: 1200
        })
        document.body.scrollTo({ top: 0, behavior: 'smooth' })
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    })






    if (this.state.password != "") {
        this.props.loginAction.changePassword(this.state.oldpassword,
            this.state.password, this.state.repassword).then((resp) => swal({
                title: 'Password changed',
                text: 'Password has been changed',
                icon: 'success',
                timer: 900
            })).catch((err) => swal({
                title: 'some error occured',
                text: 'Password save failed',
                icon: 'warning',
                timer: 900
            }))
    }
}

scrollup() {
    document.body.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })

    if (this.state.password != "") {
        this.props.loginAction.changePassword(this.state.oldpassword,
            this.state.password, this.state.repassword).then((resp) => swal({
                title: 'Password changed',
                text: 'Password has been changed',
                icon: 'success',
                timer: 900
            }))
    }
};

scroll() {

    // debugger;
    document.body.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    // scroll.scrollToTop();
}

logout = () => {
    console.log("history",this.props.history)
    this.props.loginAction.Logout().then((resp) => {
        if (resp === true) {
            const { history } = this.props
            history.push("/");
        }
    });
};



render() {

    console.log("state", this.state.profile)

    return (
        <React.Fragment>
            <Header currentUrl={this.props.currentUrl} />
            <Container>
                <div className="section">
                    <div className="secHeader flexRow evenSpace">
                        <div className="secTitle">
                            <label className="secName">My Profile</label><br />
                            <label className="secDesc">Stay updated with you personal information.</label>
                        </div>
                    </div>
                    <div className="profileSec">
                        <div className="flexRow evenSpace">
                            <div className="box profileDisplayBox">
                                <div className="profilePicHolder">
                                    <img src={!this.state.profile.avatar ? "img/empty-avatar.png" : this.state.profile.avatar} className="profilePic" alt="Image" name="profilePic" />
                                    <ModalCropper page={this.state.page} aspectRatio={1 / 1} />
                                </div>
                                <div className="name">
                                    <label className="firstName">{this.state.profile['firstName']}</label>
                                    <label className="lastName">{this.state.profile['lastName']}</label>
                                </div>
                                <div className="haCenter profileDetails">
                                    <div>
                                        <label className="stamp">ROLE</label>
                                        <span className="details timeDetail">{this.state.profile.roleCode ? this.state.profile.roleCode.toUpperCase() : ""}</span>
                                    </div>
                                </div>
                                <div className="flexRow evenSpace profileDetails">
                                    <div>
                                        <label className="stamp">ARTICLES</label>
                                        <span className="details">{this.state.profile['articles']}</span>
                                    </div>
                                    <div>
                                        <label className="stamp">COMMUNITIES</label>
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
                            <div className="box profileFieldBox box-right">
                                <div className="flexColumn evenSpace">
                                    <div className="profilefieldBox">
                                        <label className="fieldTitle">First Name</label>
                                        <div className="flexRow">
                                            <input type="text" className="profilefield" name="firstName" onChange={this.onChange} defaultValue={this.state.profile['firstName']} />
                                        </div>
                                    </div>
                                    <div className="profilefieldBox">
                                        <label className="fieldTitle">Last Name</label>
                                        <div className="flexRow">
                                            <input type="text" className="profilefield" name="lastName" onChange={this.onChange} defaultValue={this.state.profile['lastName']} />
                                        </div>
                                    </div>
                                    <div className="flexRow evenSpace profilefieldBox">
                                        <div className="coverSpace">
                                            <label className="fieldTitle">Profile Name / Nickname</label>
                                            <div className="flexRow">
                                                <input type="text" className="profilefield" name="username" onChange={this.onChange} defaultValue={this.state.profile['username']} />
                                            </div>
                                        </div>
                                        <div className="peopleseeBox">
                                            <label className="fieldTitle">Which one would people see?</label>
                                            <div className="flexRow">
                                                <div className="customRadioBtn flexIB">
                                                    <input type="radio" className="" name="publicUserName" id="fullnameBtn" checked={this.state.profile['publicUserName'] == "REAL_NAME"}
                                                        onChange={this.onChangeDisplayType} />
                                                    <label htmlFor="fullnameBtn">Full Name</label>
                                                </div>
                                                <div className="customRadioBtn flexIB">
                                                    <input type="radio" className="" name="publicUserName" id="nicknameBtn" checked={this.state.profile['publicUserName'] == "NICK_NAME"}
                                                        onChange={this.onChangeDisplayType} />
                                                    <label htmlFor="nicknameBtn">Nick Name</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profilefieldBox">
                                        <label className="fieldTitle">E-mail address</label>
                                        <div className="flexRow">
                                            <input type="mail" className="profilefield" name="email" onChange={this.onChange} defaultValue={this.state.profile['email']} />
                                        </div>
                                    </div><div className="profilefieldBox">
                                        <label className="fieldTitle">Tell us briefly about you</label>
                                        <div className="flexRow">
                                            <textarea className="profilefield" name="description" onChange={this.onChange} defaultValue={this.state.profile['description']} placeholder="Up to 300 character"></textarea>
                                        </div>
                                    </div>
                                    <div className="profilefieldBox">
                                        <label className="fieldTitle">Old Password</label>
                                        <div className="flexRow">
                                            <input type="password" name="oldpassword" className="profilefield" onChange={this.onChangePassword} placeholder="•••••••••••" />
                                        </div>

                                    </div>
                                    <div className="profilefieldBox">
                                        <label className="fieldTitle">New Password</label>
                                        <div className="flexRow">
                                            <input type="password" name="password" className="profilefield" onChange={this.onChangePassword} placeholder="•••••••••••" />
                                        </div>
                                        <span style={{ "color": "#a94442" }}> {this.state.errPassword} </span>
                                    </div>
                                    <div className="profilefieldBox">
                                        <label className="fieldTitle">Confirm Password</label>
                                        <div className="flexRow">
                                            <input type="password" name="repassword" onChange={this.onChangePassword} className="profilefield" placeholder="•••••••••••" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="haCenter">
                    <button type="button" disabled={this.state.errPassword} className="profilesaveBtn btn-fill-blue" onClick={() => this.onSave()}>Save</button>
                    <button type="button" className="profilesaveBtnL btn-fill-blue btn-solid-border" onClick={() => this.logout()}>Log Off</button>
                </div>
                <div className="haCenter">
                    <button type="button" className="upBtn">
                        <a className="fa fa-angle-up" onClick={() => this.scroll()}></a>
                    </button>
                </div>
            </Container>
            <Footer />
        </React.Fragment>
    )
}
}

function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let loggedUserId = state.Authentication.loggedUserId;
    let profile = state.MyProfile.profile;
    let profileImage = state.MyProfile.profilePicture;
    let avatar = state.MyProfile.profile.avatar;
    let isLoggedIn = state.Authentication.loggedIn
    return {
        loggedUserId,
        profile,
        currentUrl,
        profileImage,
        avatar,
        isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        myprofileAction: bindActionCreators(Myprofileaction, dispatch),
        loginAction: bindActionCreators(Loginaction, dispatch),
        managedMediaActions: bindActionCreators(ManagedMediaActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
