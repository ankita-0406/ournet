import React from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import * as LoginActions from "../actions/loginActions";
import "../../style/component/Common.css";
import "../../style/component/Login.css";
import SimpleReactValidator from "simple-react-validator";
import styled from "styled-components";

const ERROR_MESSAGE =
  "The entered username or password is incorrect.\n Please try again";

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

const LoginOuter = styled.div`
  position: relative;
  display: table-cell;
  width: 100%;
  height: 100%;
  background: #024b99;
  display: flex;
  flex-flow: row;
  vertical-align: middle;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const LoginBox = styled.div`
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

const Form = styled.form`
  /* ---------------- */
`;

const FormTitleh2 = styled.div`
  text-align: center;
  font: 26px/30px Lato;
  letter-spacing: 0;
  color: #ffffff;
  margin-bottom: 30px;
  display: block;
`;

const FormTitleSpan = styled.span`
  display: block;
  text-align: center;
  font: Bold 16px/22px Lato;
  letter-spacing: 0;
  color: #ffffff;
  vertical-align: middle;
`;

const LoginErrorP = styled.p`
  color: #f00;
  display: none;
`;

const FieldContainer = styled.div`
  padding: 3px;
  margin-top: 35px;
`;

const Label = styled.label`
  text-align: left;
  font: 16px/26px Lato;
  letter-spacing: 0;
  color: #fff;
  display: block;
  margin-bottom: 6px;
`;

const FlexRow = styled.div`
  display: flex;
  flex-flow: row;
`;

const FlexRowEvenSpace = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`;
const FlexRowEvenSpaceFrmFooter = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 35px;
  /* a{
        width: 130px;
    background: transparent;
    border: 1px solid #FFFFFF;
    font: Bold 16px/48px Lato;
    color: #FFFFFF !important;
    margin: auto;

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

    :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #39ad9c;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    z-index: -1;
}
:hover {
    color: #FFFFFF;
    z-index: 2;
    -webkit-transform: translateX(0);
    transform: translateX(0); 
}
:hover:before {
    -webkit-transform: translateX(0);
    transform: translateX(0);
}

    
    } */
`;
const UsernameField = styled.input`
  padding: 0px 15px;
  height: 50px;
  background: rgba(0, 0, 0, 0.25);
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
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
  }
`;

const UsernameFieldSpan = styled.span`
  color: #ffa500;
`;
const PasswordField = styled.input`
  padding: 0px 15px;
  height: 50px;
  background: rgba(0, 0, 0, 0.25);
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
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
  }
`;

const RememberBtn = styled.input`
  display: none;
  :checked + .rememberBtnTxt:before {
    background: rgba(255, 255, 255, 1);
  }
`;

const RememberBtnTxtLabel = styled.label`
  margin-top: 20px;
  position: relative;
  padding: 0px 0px 0px 40px;
  display: block;
  cursor: pointer;
  color: #fff;
  :before {
    content: "";
    position: absolute;
    left: 0px;
    top: -2px;
    width: 25px;
    height: 25px;
    background: rgba(0, 0, 0, 0.25);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
  }
`;

const LinkBtn = styled.div`
  margin-top: 20px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  text-align: center;
  font: Bold 12px/26px Lato;
  letter-spacing: 0;
  color: #ffffff;
  a {
    color: #ffffff !important;
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.validator = new SimpleReactValidator({
      messages: {
        // required: "Please specify a password"
      },
    });
  }

  msg = (e) => {
    // debugger;
    if (this.validator.allValid()) {
      this.props.loginActions
        .login(this.state.username, this.state.password)
        .then(() => {
          this.props.history.push("/");
          window.location.reload(true);
        })
        .catch((c) =>
          swal({
            title: "Invaid Password",
            text: c.message,
            icon: "error",
            timer: 1000,
          })
        );
    } else {
      this.validator.showMessages();
      // this.forceUpdate();
    }
    e.preventDefault();
  };

  onchange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    console.log(e.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <Body>
          <LoginOuter>
            <LoginBox>
              <LogoHolder>
                <img
                  src="img/images/footerlogoB.png"
                  alt="onlogo"
                  name="logo"
                  width="137"
                  height="134"
                />
              </LogoHolder>
              <Form className="loginForm" onSubmit={this.msg}>
                <FormTitleh2>
                  Welcome!{" "}
                  <FormTitleSpan>Please Login or Register</FormTitleSpan>
                </FormTitleh2>
                <LoginErrorP>
                  Please Enter Valid Username and Password
                </LoginErrorP>
                <FieldContainer>
                  <Label>Username</Label>
                  <FlexRow>
                    <UsernameField
                      type="text"
                      placeholder="e.g. John"
                      id="username"
                      value={this.state.username}
                      onChange={this.onchange}
                    />
                  </FlexRow>
                  <span style={{ color: "#FFA500" }}>
                    {" "}
                    {this.validator.message(
                      "username",
                      this.state.username,
                      "required"
                    )}{" "}
                  </span>
                </FieldContainer>
                <FieldContainer>
                  <Label>Password</Label>
                  <FlexRow>
                    <PasswordField
                      type="password"
                      placeholder="••••••••"
                      id="password"
                      value={this.state.password}
                      onChange={this.onchange}
                    />
                  </FlexRow>
                  <UsernameFieldSpan>
                    {" "}
                    {this.validator.message(
                      "password",
                      this.state.password,
                      "required"
                    )}{" "}
                  </UsernameFieldSpan>
                </FieldContainer>
                <FlexRowEvenSpace>
                  <div className="">
                    <RememberBtn type="checkbox" id="rememberBtn" />
                    <RememberBtnTxtLabel
                      htmlFor="rememberBtn"
                      className="rememberBtnTxt"
                    >
                      Remember
                    </RememberBtnTxtLabel>
                  </div>
                  <LinkBtn>
                    <Link to="/forgotpassword">Forgot Password?</Link>
                  </LinkBtn>
                </FlexRowEvenSpace>
                <FlexRowEvenSpaceFrmFooter>
                  <Link
                    to="/register"
                    className="registerLinkBtn linkBtn btn-fill-blue btn-white-border"
                  >
                    REGISTER
                  </Link>
                  <div>
                    <button
                      type="Submit"
                      value="Submit"
                      className="loginBtn btn-fill-blue"
                    >
                      Login
                    </button>
                  </div>
                </FlexRowEvenSpaceFrmFooter>
              </Form>
            </LoginBox>
          </LoginOuter>
        </Body>
      </React.Fragment>
    );
  }

  componentDidMount() {
    // this.props.loginActions.login("mikebros","Mollie94").then((resp)=>{
    //    // this.props.history.push('/');
    // });
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
