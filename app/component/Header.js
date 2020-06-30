import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../../style/component/header.css";
import $ from "jquery";
import Swal from "sweetalert2";
import * as PopActions from "../actions/adminActions";
import ProfileAnimation from "./header/profileAnimation";
import "../common/Header.css";
import "../component/header/sideAnimation.css";
import { Button, Modal } from "react-bootstrap";
import Notifications from "./notifications";
import Forum from "../common/forum";
import * as UserActions from "../actions/adminActions";
import * as NotificationsActions from "../actions/notificationsActions";
import "../common/forum.css";
import ReactSpeedometer from "react-d3-speedometer";
import { getGroupEvents } from "../api/GroupApi";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: true,
      isHome: this.props.isHome,
      isAround: this.props.isAround,
      isList: this.props.isList,
      enableHover: true,
      source: this.props.source,
      circleAni: this.props.circleAni,
      isLoggedIn: this.props.isLoggedIn,
      radius: 15,
      search: "",
      show: false,
      notifications: [],
      pageIndex: 0,
      pageSize: 5,
      filter: "",
      totalNotifications: 0,
      loading: true,
      loadsize: 5,
      showValue: 0,
    };
    this.enableHover = true;
  }
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.getUserPopularity(this.props.loggedUserId);
    }

    this.fetchNotifications(this.state.pageSize);

    $(document).ready(function () {
      // Show hide popover
      $(".dropdown").click(function () {
        $(this).find(".dropdown-menu-home").slideToggle("fast");
      });
    });
    $(document).on("click", function (event) {
      var $trigger = $(".dropdown");
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".dropdown-menu-home").slideUp("fast");
      }
    });
    const [, animal] = ["h", "b"];
    // console.log(animal);

    this.scrollup();
  }

  getUserPopularity = (id) => {
    this.props.userActions.getUserPopularity(id).then((res) => {
      const reputation = JSON.parse(res).AuthorReputationScore;
      const showValue = parseInt((reputation / 10) * 100);
      this.setState({
        showValue,
      });
    });
  };

  fetchNotifications = (pageSize) => {
    this.props.userActions
      .getUserNotifications(this.state.pageIndex, pageSize, this.state.filter)
      .then((res) => {
        let notifications = res.notifications;
        console.log("notificationsa the", notifications);
        let totalNotifications = res.totalNotifications;
        this.customizeNotifications(notifications).then((resp) => {
          console.log("notificationsa are the", resp);
          this.setState({
            htmlMessage: resp,
            notifications,
            totalNotifications,
          });
        });
      });
  };

  scrollup() {
    window.scrollTo(0, 0);
  }
  customizeNotifications = async (notifications) => {
    let arr = [];
    notifications.forEach((elem) => {
      const re = new RegExp("http://localhost:3000", "g");
      const str1 = elem.htmlMessage;
      const str2 = str1.replace(re, "");
      const str3 = str2.replace("/group/", "/aboutgroups/");
      const str4 = str3.replace("/user/profile/", "/userprofile/");
      arr.push(str4);
    });
    return arr;
  };

  onLoad = (e) => {
    // debugger;
    if (this.state.totalNotifications > this.state.pageSize) {
      let load = this.state.pageSize + parseInt(this.state.loadsize);
      this.setState(
        {
          pageSize: load,
        },
        () => {
          this.fetchNotifications(load);
        }
      );
    } else {
      swal({
        title: "That's it!",
        icon: "warning",
        timer: 1000,
      });
    }
  };

  onchange = (e) => {
    this.setState({
      search: e.target.value,
    });
    console.log(e.target.value);
  };

  onMouseOver = (e) => {
    this.setState({
      enableHover: false,
    });
  };

  onMouseout = () => {
    this.setState({
      enableHover: true,
    });
  };

  openModal = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  onChangeRadius = (e) => {
    this.setState({
      radius: e.target.value,
    });
    this.props.onChangeRadius(e.target.value);
  };

  sweetAlert = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Report",
      showCancelButton: true,
      showSubmitButton: true,
      html:
        "<label>Email</label>" +
        '<input id="swal-input1" class="swal2-input">' +
        "<label>Summary</label>" +
        '<input id="swal-input2" class="swal2-input">' +
        "<label>Description</label>" +
        '<input id="swal-input3" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        let val1 = document.getElementById("swal-input2").value;
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
        ];
      },
    });
    if (formValues) {
      let data = {};
      data.email = formValues[0];
      data.summary = formValues[1];
      data.description = formValues[2];
      // console.log("A:",a,"B:",b,"C:",c);
      // let x = a.map((value, index) => {
      //     console.log("Make with map()", value)
      // })
      // a.forEach((value, index) => {
      //     console.log("Make with forEach()", value + " " + " " + index)
      // })
      this.props.popActions
        .reportBugs(data)
        .then(
          Swal.fire("Good job!", "Your report posted successfully", "success")
        );
    }
  };
  isGroup = () => {
    if (
      this.props.currentUrl == "/group" ||
      this.props.currentUrl == "/newgroup" ||
      this.props.currentUrl.startsWith("/aboutgroups") ||
      this.props.currentUrl.startsWith("/groupforum")
    ) {
      return true;
    }
    return false;
  };

  toggleMenu = () => {
    document.getElementById("circularMenu").classList.toggle("active");
  };

  render() {
    return (
      <div className="header-container flexRow evenSpace">
        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Notifications</Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{ height: "550px", width: "100%", overflowY: "scroll" }}
          >
            <Forum notifications={this.state.notifications} />

            <button
              type="button"
              className={
                this.state.loading
                  ? "grpDetailBtn rating-loading btn-fill-blue"
                  : "loadmoreBtn"
              }
              style={{ marginLeft: "72%" }}
              value={this.state.loadsize}
              onClick={this.onLoad}
            >
              Load More
            </button>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="flexRow vaCenter">
          <Link to="/">
            <img
              src="../../img/images/ON_blue@2x.png"
              width="40"
              height="40"
              alt="logo"
              name="onlogo"
              className="headerLogo"
            />
          </Link>
          <div>
            <span
              className="circleMenu bugs clickable"
              onClick={this.sweetAlert}
            >
              <span
                className="menuIcon bugsIcon fa fa-bug"
                aria-hidden="true"
              ></span>
              <span className="menuText-header">Bug Report</span>
            </span>
          </div>
          <If condition={this.props.superuser}>
            <Link to="/manageusers" className="circleMenu sUser clickable">
              <span
                id="hmMenu"
                className="menuIcon newArticlemenuIcon fa fa-lock"
                aria-hidden="true"
              ></span>
              <span className="super-menuText">Super User</span>
            </Link>
          </If>

          <Choose>
            <When condition={true}>
            {!this.props.isLoggedIn && 
              <Link
                to="/login"
                className="loginLink btn-fill-blue btn-solid-border"
              >
                Login/Register
              </Link>}
              <div
                className="dropMenu  d-sm-block dropdown"
                style={{ backgroundColor: this.props.color }}
              >
                <div className="dropbtn">{this.props.name}</div>
                <div
                  style={{ backgroundColor: "none !important" }}
                  id="logcalityGrId"
                  className="dropMenuPanel dropdown-content dropdown-menu-home header-manu"
                  id="myDropdown"
                >
                  <Link to="/" className="dropSubMenu ">
                    Locality
                  </Link>
                  {/* <Link to="/aroundme" className="dropSubMenu">AroundMe</Link> */}
                  <Link to="/group" className="dropSubMenu">
                    Communities
                  </Link>
                </div>
              </div>
          
              <label
                className="pageTitle d-sm-block"
                style={{ color: this.props.color }}
              >
                {this.props.Hlabel}
              </label>
            </When>

            {/* <When condition={!this.props.isLoggedIn}>
              <Link
                to="/login"
                className="loginLink btn-fill-blue btn-solid-border"
              >
                Login/Register
              </Link>
            </When> */}
           
          </Choose>
     
           
         
        </div>
        <ul className="menuList flexIB d-none d-sm-flex">
          <Choose>
            {/* For Articles */}
            <When condition={this.props.isHome}>
              <li id="hmMenu" className="headerMenu selected">
                <Link to="/forum">
                  <span
                    id="hmMenu"
                    className={
                      this.props.forumA
                        ? "menuIcon fa fa-desktop active"
                        : "menuIcon fa fa-desktop"
                    }
                    aria-hidden="true"
                  ></span>
                  <span className="menuText">Chat</span>
                </Link>
              </li>
              <li id="hmMenu" className="headerMenu selected">
                <Link to="/">
                  <span
                    id="hmMenu"
                    className={
                      this.props.homeA
                        ? "menuIcon fa fa-outdent active"
                        : "menuIcon fa fa-outdent"
                    }
                    aria-hidden="true"
                  ></span>
                  <span className="menuText">News</span>
                </Link>

                {/* <Link to="/notifications">
                                    <svg class="notification-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156 220.65"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M78.47,8a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-8a14,14,0,1,0,14,14,14,14,0,0,0-14-14Z" /><path class="cls-2" d="M93.38,209.39a4.74,4.74,0,0,0-4.4-6.72c-3.38.05,4.85-.1-11-.1-4.63,0-8.52.27-12,.13a4,4,0,0,0-3.87,5.51,17,17,0,0,0,31.25,1.18Z" /><path class="cls-3" d="M137.19,113.75c-.7-18.82,5.84-52.32-8-75.67-8.77-14.8-16.76-20.22-21.43-22.2a3.65,3.65,0,0,0-5,2.46c-1.67,6.52-7.14,19.6-24.29,19.6S55.84,24.77,54.19,18.27a3.66,3.66,0,0,0-4.83-2.56c-4.9,1.84-13.52,7.13-22.55,22.37-13.84,23.35-7.3,56.84-8,75.67S3.3,147.56,3.3,147.56s37.35,16,74.7,16,74.7-16,74.7-16S137.89,132.57,137.19,113.75Z" /><path class="cls-3" d="M1.5,160.65A191.84,191.84,0,0,0,78,176.55a191.84,191.84,0,0,0,76.5-15.91v10.44a6.45,6.45,0,0,1-4.08,6,197.54,197.54,0,0,1-72,13.76A197.57,197.57,0,0,1,5.61,177.11,6.51,6.51,0,0,1,1.5,171Z" /></g></g></svg>
                                    <div className="notification-caption"> 3 </div>

                                </Link> */}
              </li>
              <li id="hmMenu" className="headerMenu selected">
                <Link to="/events">
                  <span
                    id="hmMenu"
                    className={
                      this.props.eventA
                        ? "menuIcon fa fa-calendar-o active"
                        : "menuIcon fa fa-calendar-o"
                    }
                    aria-hidden="true"
                  ></span>

                  <span className="menuText">Events</span>
                </Link>
              </li>
              {/* <li
                id="hmMenu"
                className="headerMenu selected"
                style={{ marginBottom: "-15px" }}
              >
                <ReactSpeedometer
                  maxValue={100}
                  forceRender={true}
                  segments={1}
                  width={75}
                  height={75}
                  value={this.state.showValue}
                />
              </li> */}
            </When>
            {/* For Groups */}
            <When condition={this.props.current}>
              <li id="hmMenu" className="headerMenu">
                <Link to="/group">
                  <span
                    id="hmMenu"
                    className={
                      this.props.homeA
                        ? "menuIcon fa fa-users activeG"
                        : "menuIcon fa fa-users"
                    }
                    aria-hidden="true"
                  ></span>
                  <span className="menuText">Back To Communities</span>
                </Link>
              </li>
              <li id="hmMenu" className="headerMenu">
                <Link to={`/aboutgroups/${this.props.groupId}`}>
                  <span
                    id="hmMenu"
                    className={
                      this.props.isList
                        ? "menuIcon fa fa-outdent activeG"
                        : "menuIcon fa fa-outdent"
                    }
                    aria-hidden="true"
                  ></span>
                  <span className="menuText">News</span>
                </Link>
              </li>
              <li id="hmMenu" className="headerMenu">
                <Link to={`/groupforum/${this.props.groupId}`}>
                  <span
                    id="hmMenu"
                    className={
                      this.props.groupforumA
                        ? "menuIcon fa fa-desktop activeG"
                        : "menuIcon fa fa-desktop"
                    }
                    aria-hidden="true"
                  ></span>
                  <span className="menuText">Chat</span>
                </Link>
              </li>
              <li id="hmMenu" className="headerMenu">
                <Link to={`/groupevents/${this.props.groupId}`}>
                  <span
                    id="hmMenu"
                    className={
                      this.props.GroupEventsA
                        ? "menuIcon fa fa-calendar-o activeG"
                        : "menuIcon fa fa-calendar-o"
                    }
                    aria-hidden="true"
                  ></span>

                  <span className="menuText">Events</span>
                </Link>
              </li>
            </When>
            <When condition={this.props.isList}>
              <li className="headerMenu selected">
                <a href="">
                  <span className="icon menuIcon mygroupIcon">
                    <img src="../img/icons/icon_Groups.svg" />
                  </span>
                  <span className="menuText" style={{ color: "#BB4D9A" }}>
                    My Communities
                  </span>
                </a>
              </li>
            </When>
            <When condition={this.props.label}>
              <li className="labelA">Profile - {this.props.label}</li>
            </When>
            <When condition={this.props.isAround}>
              <li className="headerMenu selected">
                <a href="">
                  <span className="icon menuIcon mygroupIcon">
                    <img src="../img/icons/icon_AroundMe.svg" />
                  </span>
                  <span className="menuText" style={{ color: "#FB531F" }}>
                    Around Me
                  </span>
                </a>
              </li>
            </When>
          </Choose>
        </ul>
        <div className="headerSubmenuMobile flexCol mobileMenu">
          <div className="menuBox">
            <span
              className={this.isGroup() ? "menuControlGroup" : "menuControl"}
            >
              <i className="fa fa-bars" style={{ color: "#ffffff" }}></i>
            </span>
            <div className="menuBoxControls">
              <div className={this.isGroup() ? "slicemenuGroup" : "slicemenu"}>
                <Link to="/forum" className="userMenu circleMenu forumMenu">
                  <span className={this.isGroup()?"menuIconBottom menuIcon  fa fa-desktop" :"menuIconBottom menuIconG  fa fa-desktop" }></span>
                  <span className="menuText">Chat</span>
                </Link>

                <Link to="/" className="userMenu circleMenu newsMenu">
                  <span className={this.isGroup()?"menuIconBottom menuIcon  fa fa-outdent" :"menuIconBottom menuIconG  fa fa-outdent" }></span>
                  <span className="menuText">News</span>
                </Link>

                <Link to="/events" className="userMenu circleMenu eventsMenu">
                  <span className={this.isGroup()?"menuIconBottom menuIcon  fa fa-calendar-o" :"menuIconBottom menuIconG  fa fa-calendar-o" }></span>
                  <span className="menuText">Events</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* SearchBox */}
        <div className="searchBox  d-sm-block search-header-box">
          <input
            type="text"
            className="searchField"
            onChange={this.onchange}
            placeholder="What are you looking for?"
          />
          <Link to={this.state.search ? `/search/${this.state.search}` : "/#"}>
            <span className="hControl">
              <i className="fa fa-search"></i>
            </span>
          </Link>
        </div>

        {/* Animation 2 The yellow circle */}
        <div className="headerControls flexIB">
          <div className="userBox">
            {/* <ProfileAnimation icon={this.props.circleAni} /> */}
            {/*<-------------------------------------------------------->*/}
            <div id="circularMenu" class="circular-menu">
              <a class="floating-btn" onClick={() => this.toggleMenu()}>
                {/* <i class="fa fa-plus"></i> */}
                <span style={{ filter: "invert(1)" }}>
                  <img src={this.props.circleAni} />
                </span>
              </a>

              <menu class="items-wrapper">
                <div className="menu-item">
                  <Link to="/myprofile">
                    <span style={{ filter: "invert(1)" }}>
                      <img
                        src="../img/icons/icon_UserProfile.svg"
                        className="iconImage"
                      />
                    </span>
                    <span className="menuText wcolor">MyProfile</span>
                  </Link>
                </div>

                <div className="menu-item">
                  <Link to="/myarticle">
                    <span style={{ filter: "invert(1)" }}>
                      <img
                        src="../img/icons/icon_MyArticles.svg"
                        className="iconImage"
                      />
                    </span>
                    <span className="menuText wcolor">MyArticle</span>
                  </Link>
                </div>

                <div className="menu-item">
                  <Link to="/location">
                    <span style={{ filter: "invert(1)" }}>
                      <img
                        src="../img/icons/icon_Location.svg"
                        className="iconImage"
                      />
                    </span>
                    <span className="menuText wcolor">Location</span>
                  </Link>
                </div>

                <div className="menu-item">
                  <Link to="/tags">
                    <span style={{ filter: "invert(1)" }}>
                      <img
                        src="../img/icons/icon_Tags.svg"
                        className="iconImage"
                      />
                    </span>
                    <span className="menuText wcolor">Tags</span>
                  </Link>
                </div>

                {this.props.isLoggedIn &&
                  <div className="menu-item">
                    <Link to="/tags">
                      <span style={{ filter: "invert(1)" }}>

                        <ReactSpeedometer
                          maxValue={100}
                          forceRender={true}
                          segments={1}
                          width={75}
                          height={75}
                          textColor={'#fff'}
                          value={this.state.showValue}
                        />
                      </span>
                      <span className="menuText wcolor">Trust</span>
                    </Link>
                  </div>}


                {this.state.isLoggedIn && (
                  <div className="menu-item" onClick={() => this.openModal()}>
                    <svg
                      className="notification-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 156 220.65"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                          <path
                            class="cls-1"
                            d="M78.47,8a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-8a14,14,0,1,0,14,14,14,14,0,0,0-14-14Z"
                          />
                          <path
                            class="cls-2"
                            d="M93.38,209.39a4.74,4.74,0,0,0-4.4-6.72c-3.38.05,4.85-.1-11-.1-4.63,0-8.52.27-12,.13a4,4,0,0,0-3.87,5.51,17,17,0,0,0,31.25,1.18Z"
                          />
                          <path
                            class="cls-3"
                            d="M137.19,113.75c-.7-18.82,5.84-52.32-8-75.67-8.77-14.8-16.76-20.22-21.43-22.2a3.65,3.65,0,0,0-5,2.46c-1.67,6.52-7.14,19.6-24.29,19.6S55.84,24.77,54.19,18.27a3.66,3.66,0,0,0-4.83-2.56c-4.9,1.84-13.52,7.13-22.55,22.37-13.84,23.35-7.3,56.84-8,75.67S3.3,147.56,3.3,147.56s37.35,16,74.7,16,74.7-16,74.7-16S137.89,132.57,137.19,113.75Z"
                          />
                          <path
                            class="cls-3"
                            d="M1.5,160.65A191.84,191.84,0,0,0,78,176.55a191.84,191.84,0,0,0,76.5-15.91v10.44a6.45,6.45,0,0,1-4.08,6,197.54,197.54,0,0,1-72,13.76A197.57,197.57,0,0,1,5.61,177.11,6.51,6.51,0,0,1,1.5,171Z"
                          />
                        </g>
                      </g>
                    </svg>
                    {/* <div className="notification-caption"> 3 </div> */}
                    <span className="menuText wcolor">Notifi..</span>
                  </div>
                )}


              </menu>
            </div>
            {/*<-------------------------------------------------------->*/}
          </div>
          {/* The hanging pencil of article */}
          <div className="searchBox  d-sm-block">
            <Link
              to={this.state.isLoggedIn ? "/newarticle" : "/login"}
              className="userMenu circleMenu newArticleMenu"
            >
              <span
                id="hmMenu"
                className="menuIcon newArticlemenuIcon fa fa-pencil"
                aria-hidden="true"
              ></span>
              <span className="menuText-header">New Article</span>
            </Link>
            {/* <If condition={this.props.superuser}>
                            <Link to="/manageusers" className="userMenu circleMenu superUser">
                                <span id="hmMenu" className="menuIcon newArticlemenuIcon fa fa-lock" aria-hidden="true"></span>
                                <span className="super-menuText">Super User</span>
                            </Link>
                        </If> */}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let isLoggedIn = state.Authentication.loggedIn;
  let loggedUserId = isLoggedIn ? state.Authentication.loggedUserId : null;
  let currentUrl = ownProps.currentUrl || "";
  let superuser = state.Authentication.role == "superuser" ? true : false;
  let groupId =
    currentUrl.includes("/aboutgroups/") || currentUrl.includes("/groupforum/")
      ? parseInt(ownProps.currentUrl.split("/").pop())
      : "";
  let current = false;
  let name = "Locality";
  let Hlabel = "";
  let color = "#024B99";
  let homeA = false;
  let isHome = false;
  let isAround = false;
  let isList = false;
  let eventA = false;
  let marketA = false;
  let forumA = false;
  let profileA = false;
  let tagsA = false;
  let groupforumA = false;
  let GroupEventsA = false
  let label = "";
  let source = "../../img/icons/icon_Groups.svg";
  let circleAni = "../img/icons/icon_UserProfile.svg";

  console.log("headerrrrrrr " , ownProps)

  if (currentUrl == "/" || currentUrl == "") {
    isHome = true;
    homeA = true;
    name = "Locality";
    color = "#024B99";
    Hlabel = "News";
  } else if (currentUrl.includes("/article/")) {
    isHome = true;
    homeA = true;
    name = "Locality";
    color = "#024B99";
    Hlabel = "News";
  } else if (currentUrl == "/aroundme") {
    isAround = true;
    name = "AroundMe";
    color = "#FB531F";
    Hlabel = "";
  } else if (currentUrl == "/group") {
    isList = true;
    name = "Communities";
    Hlabel = "My Communities";
    color = "#BB4D9A";
    source = "../../img/icons/icon_Groups.svg";
  } else if (currentUrl.includes("/aboutgroups/")) {
    current = true;
    isList = true;
    color = "#BB4D9A";
    Hlabel = "My Communities";
    name = "Communities";
    source = "../../img/icons/icon_Groups.svg";
  }
  else if (currentUrl.includes("/groupevents/")) {
    current = true;
    GroupEventsA = true;

    color = "#BB4D9A";
    Hlabel = "My Communities";
    name = "Communities";

  } else if (currentUrl == "/forum") {
    isHome = true;
    forumA = true;
    homeA = false;
    Hlabel = "Chat";
    source = "../../img/icons/icon_Forum.svg";
  } else if (currentUrl.includes("/groupforum/")) {
    groupforumA = true;
    color = "#BB4D9A";
    Hlabel = "My Communities";
    name = "Communities";
    current = true;
  } else if (currentUrl == "/classified") {
    isHome = true;
    homeA = false;
    marketA = true;
    Hlabel = "Market";
    source = "../../img/icons/icon_Classified.svg";
  } else if (currentUrl == "/events") {
    isHome = true;
    homeA = false;
    eventA = true;
    Hlabel = "Events";
    source = "../../img/icons/icon_Events.svg";
  } else if (currentUrl == "/myprofile") {
    label = "My Profile";
    profileA = true;
    circleAni = "../../img/icons/icon_UserProfile.svg";
  } else if (currentUrl == "/tags") {
    label = "My Tags";
    tagsA = true;
    circleAni = "../img/icons/icon_Tags.svg";
  } else if (currentUrl == "/newarticle") {
    circleAni = "../img/icons/icon_WriteArticle.svg";
    label = "New Article";
    name = ownProps.isGroup ? "Communities" : "Locality"
    color = ownProps.isGroup ?"#BB4D9A" : "#024B99";
  } else if (currentUrl == "/location") {
    circleAni = "../img/icons/icon_Location.svg";
    label = "My Locations";
  } else if (currentUrl == "/myarticle") {
    circleAni = "../img/icons/icon_MyArticles.svg";
    label = "My Articles";
  } else if (currentUrl == "/newgroup") {
    color = "#BB4D9A";
    Hlabel = "New Communities";
    name = "Communities";
  }

  else if (currentUrl.includes("/comment/")) {
    color = ownProps.isGroup?"#BB4D9A" : "#024B99";
    name = ownProps.isGroup?"Communities" : "Locality"
    isList = ownProps.isGroup ? true : false;
    source = "../../img/icons/icon_Groups.svg";
    
  } 

  return {
    currentUrl,
    groupId,
    isHome,
    isAround,
    isList,
    isLoggedIn,
    source,
    circleAni,
    homeA,
    eventA,
    marketA,
    forumA,
    tagsA,
    profileA,
    label,
    current,
    groupforumA,
    name,
    Hlabel,
    color,
    superuser,
    currentUrl,
    loggedUserId,
    GroupEventsA
  };
}

function mapDispatchToProps(dispatch) {
  return {
    popActions: bindActionCreators(PopActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
    NotificationsActions: bindActionCreators(NotificationsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
