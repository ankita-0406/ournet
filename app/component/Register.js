import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import * as LoginActions from "../actions/loginActions";
import Modal from "../component/policyModal";
import Example from "../component/Modal/exampleModal";
import "../../style/component/Login.css";
import styled from "styled-components";

const Body = styled.div`
  display: table;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  overflow: auto;
`;

const RegisterOuter = styled.div`
  display: flex;
  flex-flow: row;

  vertical-align: middle;
  align-items: center;

  text-align: center;
  justify-content: center;
`;

const RegisterBox = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 320px;
  margin: auto;
`;

const LogoHolder = styled.div`
  display: flex;
  flex-flow: row;

  vertical-align: middle;
  align-items: center;

  text-align: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 137px;
  height: 134px;
`;

const RegisterForm = styled.div`
  /* ------------------- */
`;

const FormTitleR = styled.h2`
  text-align: center;
  font: 26px/30px Lato;
  letter-spacing: 0;
  color: #024b99;
  margin-bottom: 30px;
  display: block;
`;

const FormTitleRSpan = styled.span`
  display: block;
  text-align: center;
  font: Bold 16px/22px Lato;
  letter-spacing: 0;
  color: #024b99;
  vertical-align: middle;
  margin-top: 5px;
`;

const FieldContainerR = styled.div`
  padding: 3px;
  margin-top: 35px;
`;

const FieldContainerRLabel = styled.div`
  text-align: left;
  font: 16px/26px Lato;
  letter-spacing: 0;
  color: #024b99;
  display: block;
  margin-bottom: 6px;
`;

const FlexRow = styled.div`
  display: flex;
  flex-flow: row;
`;

const Input = styled.input`
  padding: 0px 15px;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: none;
  outline: none;
  line-height: 50px;
  width: 100%;
  text-align: left;
  font: 16px/28px Lato;
  letter-spacing: 0;
  color: #8d8d8d;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
  transition: all 200ms ease-out;

  :focus {
    box-shadow: 0 0 8px rgba(2, 75, 153, 0.3);
  }
`;

const Span = styled.span`
  color: #a94442;
`;

const MargTB = styled.div`
  margin: 10px;
  text-align: left;
`;

// const Body = styled.div``;

// const Body = styled.div``;

// const Body = styled.div``;

// const Body = styled.div``;

// const Body = styled.div``;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      username: "",
      password: "",
      repassword: "",
      agreeChkbox: false,
    };
    this.validator = new SimpleReactValidator({
      messages: {
        // required: "Please specify a password"
      },
    });
  }

  onchangedata = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  checkBox = () => {
    this.setState({
      agreeChkbox: !this.state.agreeChkbox,
    });
  };

  onRegister = () => {
    let userdata = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    if (this.validator.allValid()) {
      this.props.loginActions
        .Register(userdata)
        .then((resp) => {
          if (resp == true) {
            const { history } = this.props;
            history.push("/confirmation");
          }
        })
        .catch((err) =>
          swal({
            title: "Error!",
            text: err,
            icon: "error",
            timer: 1200,
          })
        );
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  render() {
    return (
      <React.Fragment>
        <Body>
          <RegisterOuter>
            <RegisterBox>
              <LogoHolder>
                <Img
                  src="img/images/footerlogoB.png"
                  alt="onlogo"
                  name="logo"
                />
              </LogoHolder>
              <RegisterForm>
                <FormTitleR>
                  Please Register.
                  <FormTitleRSpan>
                    Enter Your Personal Details Below.
                  </FormTitleRSpan>
                </FormTitleR>
                <FieldContainerR>
                  <FieldContainerRLabel>First name</FieldContainerRLabel>
                  <FlexRow>
                    <Input
                      type="text"
                      placeholder="e.g. John "
                      id="firstName"
                      onChange={this.onchangedata}
                      onBlur={() =>
                        this.validator.showMessageFor("required|alpha")
                      }
                    />
                  </FlexRow>
                  <Span>
                    {" "}
                    {this.validator.message(
                      "firstName",
                      this.state.firstName,
                      "required|alpha"
                    )}{" "}
                  </Span>
                </FieldContainerR>
                <FieldContainerR>
                  <FieldContainerRLabel>Last name</FieldContainerRLabel>
                  <FlexRow>
                    <Input
                      type="text"
                      placeholder="e.g. Doe"
                      id="lastName"
                      onChange={this.onchangedata}
                      onBlur={() => this.validator.showMessageFor("alpha")}
                    />
                  </FlexRow>
                  <Span>
                    {" "}
                    {this.validator.message(
                      "lastName",
                      this.state.lastName,
                      "required|alpha"
                    )}{" "}
                  </Span>
                </FieldContainerR>
                <FieldContainerR>
                  <FieldContainerRLabel>Email address</FieldContainerRLabel>
                  <FlexRow>
                    <Input
                      type="text"
                      placeholder="e.g. email@example.com"
                      id="email"
                      onChange={this.onchangedata}
                      onBlur={() => this.validator.showMessageFor("email")}
                    />
                  </FlexRow>
                  <Span>
                    {" "}
                    {this.validator.message(
                      "email",
                      this.state.email,
                      "required|email"
                    )}{" "}
                  </Span>
                </FieldContainerR>
                <FieldContainerR>
                  <FieldContainerRLabel>
                    Nickname / Username{" "}
                  </FieldContainerRLabel>
                  <FlexRow>
                    <Input
                      type="text"
                      placeholder="e.g. John"
                      id="username"
                      onChange={this.onchangedata}
                      onBlur={() => this.validator.showMessageFor("alpha_num")}
                    />
                  </FlexRow>
                  <Span>
                    {" "}
                    {this.validator.message(
                      "Username",
                      this.state.username,
                      "required|alpha_num"
                    )}{" "}
                  </Span>
                </FieldContainerR>
                <FieldContainerR>
                  <FieldContainerRLabel>Password</FieldContainerRLabel>
                  <FlexRow>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      id="password"
                      onChange={this.onchangedata}
                    />
                  </FlexRow>
                  <Span>
                    {" "}
                    {this.validator.message(
                      "password",
                      this.state.password,
                      "required|min:8"
                    )}{" "}
                  </Span>
                </FieldContainerR>
                <FieldContainerR>
                  <FieldContainerRLabel>Confirm Password</FieldContainerRLabel>
                  <FlexRow>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      id="repassword"
                      onChange={this.onchangedata}
                    />
                  </FlexRow>
                  <Span>
                    {" "}
                    {this.state.password == this.state.repassword
                      ? ""
                      : "Password do not match"}{" "}
                  </Span>
                </FieldContainerR>
                <div className="margTB tLeft">
                  <input
                    type="checkbox"
                    className="agreeChkbox vaCenter"
                    id="agreeChkbox"
                    onClick={this.checkBox}
                  />
                  <label htmlFor="agreeChkbox" className="vaCenter">
                    I agree to <a>Terms of Service</a> and{" "}
                    <Example body="Privacy Policy" />
                  </label>
                  <span style={{ color: "#a94442" }}>
                    {" "}
                    {this.validator.message(
                      "terms and privacy policy",
                      this.state.agreeChkbox,
                      "required|accepted"
                    )}{" "}
                  </span>
                </div>
                <div className="flexRow evenSpace frmFooter">
                  <Link
                    to="/login"
                    className="backLinkBtn linkBtn btn-fill-blue btn-solid-border"
                  >
                    Back
                  </Link>
                  <div>
                    <button
                      type="submit"
                      className="registerBtn btn-fill-blue"
                      onClick={this.onRegister}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </RegisterForm>
            </RegisterBox>
          </RegisterOuter>
        </Body>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(LoginActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
