import React, { Component, Fragment } from "react";
import PopularArticles from "./PopularArticles";
import LocationArticles from "./LocationArticles";
import Header from "./Header";
import Footer from "./Footer";
import "../../style/component/Common.css";
import { Row, Container } from "react-bootstrap";
import { connect } from "react-redux";
import CookieConsent, { Cookies } from "react-cookie-consent";
import * as LocActions from "./../actions/locActions";

import { bindActionCreators } from "redux";
import Meta from "../common/Meta";
import LeftColumn from "../common/leftColumn"
// import ScrollIndicator from './ScrollIndicator'
import $ from "jquery";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookieAccept: 0,
    };
    this.childLocation = React.createRef();
  }

  scrollup() {
    // window.scrollTo(0, 0);
    // window.scrollTo({
    //     top:0,
    //     behavior:"smooth"
    // })
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
  }

  onChangeRadius = (e) => {
    this.setState({
      newRadius: e,
    });
    this.childLocation.current.radiuschangefunc(e);
  };
  registerCookieConsent = () => {
    this.props.locActions.updateCookie(true);
  };
    componentDidMount  () {
      $(window).scroll(function(){
        var scroll = $(window).scrollTop(),
        dh = $(document).height(),
        wh = $(window).height();
        value = (scroll / (dh-wh)) * 100;
        $('#progress').css('width', value + '%')
      })
    }

  render() {
   
    return (
      <Fragment>
        <Meta title="OurNet" />
        <div id="progress"></div>
        {/* <div class="ui top attached progress" id="example5">
          <div class="bar"></div>
        </div> */}
        {/* <ScrollIndicator/> */}
        <Header onChangeRadius={this.onChangeRadius} />
        <Container fluid>
          <div class="row">

            <LeftColumn/>
   

            <div className="rightcolumn">
              <LocationArticles ref={this.childLocation} />
              <PopularArticles />
              <Row style={{ marginLeft: 30, marginRight: 30 }}>
                <div className="haCenter">
                  <button
                    type="button"
                    className="upBtn"
                    onClick={this.scrollup}
                  >
                    <i className="fa fa-angle-up" aria-hidden=""></i>
                  </button>
                </div>
              </Row>
              {this.props.cookieAccept == false && (
                <CookieConsent
                  location="bottom"
                  buttonText="x"
                  onAccept={() => this.registerCookieConsent()}
                  debug={true}
                  style={{ background: "#004b9c", fontSize: "16px" }}
                  expires={150}
                >
                  We and our partners use cookies to personalize your
                  experience, to show you ads based on your interests, and for
                  measurement and analytics purposes. By using our website and
                  our services, you agree to our use of cookies as described in
                  our{" "}
                  <a href="#" style={{ color: "white" }}>
                    Cookie Policy
                  </a>
                  .
                </CookieConsent>
              )}
            </div>
          </div>
        </Container>
        <Footer />
      </Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log("state check======", state);

  // let p = ownProps;

  return {
    cookieAccept: state.Locations.cookieAccpet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    locActions: bindActionCreators(LocActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
