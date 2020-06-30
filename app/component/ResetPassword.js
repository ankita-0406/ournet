import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PopActions from '../actions/loginActions';
import SimpleReactValidator from 'simple-react-validator';
import styled from 'styled-components'

// const ConfirmNew = styled.div`
// 	display: table;
//     position: absolute;
//     width: 100%;
//     height: 100%;
// 	left: 0px;
//     right: 0px;
//     top: 0px;
// 	bottom: 0px;
// 	overflow:auto;
// `;


class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cpassword: "",
            password: ""
        }
        this.validator = new SimpleReactValidator({
            validators: {
                passwordValidate: {  // name the rule
                  message: 'Passwords do not Match!',
                  rule: (val, params, validator) => {
                    return this.state.password === this.state.cpassword;
                  }
                },
              }
        })
    }

    onchangedata = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target.value);
    }


    onSave = () => {
        if (this.validator.allValid()) {
            this.props.popActions.Resetpassword(this.state.password, this.props.confirmation_code).then((resp) => {
                if (resp === true) {
                    const { history } = this.props
                    history.push("/login");
                }
            }).catch((err) => swal({
                title: 'Error!',
                text: err,
                icon: 'error',
                timer: 1200
            }))
        }
        else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div className="confirmNew">
                <div className="confirmOuter flexRow vaCenter haCenter">
                    <div className="confirmloginBox">
                        <div className="logoHolder flexRow  vaCenter haCenter">
                            <img src="../../img/images/logoB.png" alt="onlogo" name="logo" width="100" height="100" />
                        </div>
                        <div className="loginForm">
                            <h2 className="confirmTitle">Now reset your password!</h2>
                            <div className="fieldContainerR">
                                <label>Password</label>
                                <div className="flexRow">
                                    <input type="password" className="field" onChange={this.onchangedata} placeholder="••••••••"
                                        id="password" />
                                </div>
                                <span style={{ "color": "#a94442" }}> {this.validator.message('password', this.state.password, 'required|min:8')} </span>
                            </div>
                            <div className="fieldContainerR">
                                <label>Confirm Password</label>
                                <div className="flexRow">
                                    <input type="password" className="field" onChange={this.onchangedata} placeholder="••••••••"
                                        id="cpassword" />
                                </div>
                                <span style={{ "color": "#a94442" }}> {this.validator.message('cpassword', this.state.cpassword, 'required|passwordValidate')} </span>
                            </div>
                            <div>
                                <button type="submit" className="loginBtn" onClick={this.onSave} >submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    let confirmation_code = props.match.params.confirmation_code;
    console.log(props.match.params.confirmation_code);
    return {
        confirmation_code
    };
}

function mapDispatchToProps(dispatch) {
    return {
        popActions: bindActionCreators(PopActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);