import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../../style/component/ForgotPassword.css";
import SimpleReactValidator from "simple-react-validator";
import * as PopActions from "../actions/loginActions";
import styled from "styled-components";

const Body = styled.div`
  margin: 0px;
  padding: 0px;
  background: #edf2f8 0% 0% no-repeat padding-box;
  font-family: "Lato", sans-serif;

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
const FrgtPasswordOuter = styled.div`
  position: relative;
  display: table-cell;
  width: 100%;
  height: 100%;
  background: #bb4d9a;

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
const LoginForm = styled.div`
  /* ----------------- */
`;
const FormTitleh2 = styled.h2`
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
  margin-top: 10px;
`;
const FieldContainer = styled.div`
  padding: 3px;
  margin-top: 35px;
`;
const FieldContainerLabel = styled.label`
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
const EmailField = styled.input`
  padding: 0px 15px;
  height: 50px;
  background: rgba(0, 0, 0, 0.25) 0% 0% no-repeat padding-box;
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
`;
const MargTB = styled.div`
  display: flex;
  flex-flow: row;

  text-align: center;
  justify-content: center;
  margin: 10px;
`;
// const Button = styled.div`
// width: 140px;
//     height: 50px;
//     margin: 20px 0px 10px 0px;

// `;

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.validator = new SimpleReactValidator({
      messages: {
        // required: "Please specify a password"
      },
    });
  }

  onSave = (event) => {
    let data = {};
    data.email = this.state.value;
    if (this.validator.allValid()) {
      this.props.popActions
        .ForgotPassword(data)
        .then((resp) => {
          if (resp == true) {
            const { history } = this.props;
            history.push("/confirmation");
          }
        })
        .catch((err) =>
          swal({
            title: "Email Not Vaild!",
            text: err,
            icon: "error",
            timer: 1200,
          })
        );
      event.preventDefault();
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <Body>
        <FrgtPasswordOuter>
          <LoginBox>
            <LogoHolder>
              <img
                src="../../img/images/logoB.png"
                alt="onlogo"
                name="logo"
                width="100"
                height="100"
              />
            </LogoHolder>
            <LoginForm>
              <FormTitleh2>
                Forgot the password? No Problem.
                <FormTitleSpan>
                  Type your e-mail below to reset it.
                </FormTitleSpan>
              </FormTitleh2>
              <FieldContainer>
                <FieldContainerLabel>E-mail</FieldContainerLabel>
                <FlexRow>
                  <EmailField
                    type="text"
                    className="field"
                    name="email"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="eg. michaelbrodie@gmail.com"
                  />
                </FlexRow>
                <span style={{ color: "#024B99" }}>
                  {" "}
                  {this.validator.message(
                    "email",
                    this.state.value,
                    "required|email"
                  )}{" "}
                </span>
              </FieldContainer>
              <MargTB>
                <button
                  type="submit"
                  className="submitBtn btn-fill-blue"
                  onClick={this.onSave}
                >
                  Submit
                </button>
              </MargTB>
            </LoginForm>
          </LoginBox>
        </FrgtPasswordOuter>
      </Body>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    popActions: bindActionCreators(PopActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
