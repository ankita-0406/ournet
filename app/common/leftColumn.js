import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as PopActions from "../actions/popularArticleActions";
import * as LocActions from "../actions/locActions";
import UUID from "../util/communityIds";
import * as ForumActions from "../actions/forumActions";
import * as EventActions from "../actions/eventActions";
import * as PopActionsLeft from "../actions/groupActions";
import Home from "../component/Home";
import Header from "../component/Header";
import Events from "../component/Events";
import Forums from "../component/Forum";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";

class LeftColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      activePage: 1,
      itemsPerPage: 5,
      pageCount: 1,
      totalArticles: 0,
      filter: "",
      priority: 0,
      flag: true,
      city: this.props.city,
      finished: false,
      over: false,
      fixed: false,
      onlyMineTopics: false,
      order: "CHRONOLOGICAL",
      pageIndex: 0,
      pageSize: 5,
      filter: "",
      communityId: "",
      totalForums: "",
      forums: [],
      events: [],
      activePage: 1,
      itemsPerPage: 5,
      pageCount: 1,
      totalEvents: 0,
      filter: "",
      locations: this.props.locations,
      locality: true,
      excludeUrl: [
        "/myprofile",
        "/login",
        "/comment",
        "/register",
        "/newgroup",
        "/group",
        "/newarticle",
        "/newevent",
        "/location",
        "/tags",
        "/article",
        "/manageusers",
        "/managearticles",
        "/managegroups",
        "/scoreparameter",
        "/inappropriate",
        "/myarticle",
        // "/events",
        // "/groupevents"

      ],
    };
  }

  componentDidMount() {
    if (this.props.path !== "/aboutgroups") {
      console.log("this.props.city---<", this.props.city);

      let communityId = UUID.getCommunityID(this.props.city);

      this.setState({ communityId });

      if (communityId != null) {
        this.fetchForums(this.state.pageSize, communityId);
      }

      if (!communityId) {
        this.fetchForums(this.state.pageSize, 99);
      }

      if (this.props.isLoggedIn) {
        if (this.state.articles.length == 0) {
          this.fetchArticles(this.state.itemsPerPage);
          if (!this.state.city) {
            this.props.locActions.getLocationDetails().then((resp) => {
              if (!resp.locations == null) {
                this.setState({
                  city: resp.locations[0].locationTag,
                  finished: true,
                });
              }
            });
          }
        }
        
        this.props.eventActions
          .getEvents(
            this.state.activePage - 1,
            this.state.itemsPerPage,
            this.state.filter
          )
          .then((resp) => {
          
            console.log("events", resp.events);
            this.setState({
              events: resp.events,
              totalEvents: resp.totalEvents,
              pageCount: Math.ceil(resp.totalEvents / this.state.itemsPerPage),
            });
          });
      } else {
        this.guestfetchArticles(this.state.itemsPerPage);
        this.props.eventActions
          .getEventsGuest(
            this.state.locations.lat,
            this.state.locations.lng,
            this.state.locations.radius,
            this.state.activePage - 1,
            this.state.itemsPerPage
          )
          .then((resp) => {
            this.setState({
              events: resp.events,
              totalEvents: resp.totalEvents,
              pageCount: Math.ceil(resp.totalEvents / this.state.itemsPerPage),
            });
          });
      }

      window.scrollTo(0, 0);
    }
  }

  fetchGroup = (id) =>{

    this.props.popActionsLeft.getGroupInfo(id).then((group) => {
    
      this.setState({
          groupName: group.group.name,
         
      });
  })

  }

  fetchGroupArticles = (groupId, pageSize, pageIndex, filter) => {
    this.props.popActionsLeft
      .getGroupArticles(groupId, pageIndex, pageSize, filter)
      .then((resp) => {
        this.setState({
          articles: resp.articles,
        });
      });
  };

  fetchGroupsForums = (id) => {
    this.props.popActionsLeft
      .getGroupForums(id, false, "CHRONOLOGICAL", 0, 15, "")
      .then((resp) => {
        console.log("forums.....aaaaaleft", resp);
        this.setState({
          forums: resp.topics,
        });
      });
  };

  fetchGroupsEvents = (id) => {
    this.props.popActionsLeft.getGroupEvents(id).then((res) => {
      this.setState({
        events: res.events,
      });
    });
  };

  componentWillReceiveProps = (nextProps) => {
    console.log("this props", this.props.isLoggedIn);
    console.log("new props", nextProps.isLoggedIn);

    if (this.props.city != nextProps.city) {
      let communityId = UUID.getCommunityID(nextProps.city);
      this.fetchForums(this.state.pageSize, communityId);
    }

    if (this.props.isLoggedIn != nextProps.isLoggedIn) {
      if (nextProps.isLoggedIn) {
        console.log("reached here before error")
        nextProps.eventActions
          .getEvents(
            this.state.activePage - 1,
            this.state.itemsPerPage,
            this.state.filter
          )
          .then((resp) => {
            console.log("events", resp.events);
            console.log("reached here without error")
           
            this.setState({
              events: resp.events,
              totalEvents: resp.totalEvents,
              pageCount: Math.ceil(resp.totalEvents / this.state.itemsPerPage),
            });
          });
      }
    }

    this.setState({
      locality:
        nextProps.path !== "/aboutgroups" && nextProps.path !== "/groupforum" && nextProps.path !== "/groupevents",
    });

    let arr = nextProps.location.split("/");
    if (
      nextProps.path == "/aboutgroups" ||
      (nextProps.path == "/groupforum" && arr.length >= 2) ||
      (nextProps.path == "/groupevents" && arr.length >= 2)
    ) {
      console.log("in Here");

      const id = parseInt(arr[arr.length - 1]);
      this.fetchGroupArticles(id, 12, 0, "");
      this.fetchGroupsForums(id);
      this.fetchGroupsEvents(id);
      this.fetchGroup(id)
    }

    if (
      (this.props.path == "/aboutgroups" || this.props.path == "/groupforum" || this.props.path == "/groupevents") &&
      (nextProps.path == "/" ||
        nextProps.path == "/events" ||
        nextProps.path == "/forum")
    ) {
      let communityId = UUID.getCommunityID(this.props.city);

      this.fetchForums(this.state.pageSize, communityId ? communityId : 99);

      if (nextProps.isLoggedIn) {
        this.fetchArticles(this.state.itemsPerPage);
        if (!this.state.city) {
          nextProps.locActions.getLocationDetails().then((resp) => {
            if (!resp.locations == null) {
              this.setState({
                city: resp.locations[0].locationTag,
                finished: true,
              });
            }
          });
        }
        console.log("reached here before error 2")
        nextProps.eventActions
          .getEvents(
            this.state.activePage - 1,
            this.state.itemsPerPage,
            this.state.filter
          )
          .then((resp) => {
            console.log("reached here without error 2")
            console.log("events", resp.events);
            this.setState({
              events: resp.events,
              totalEvents: resp.totalEvents,
              pageCount: Math.ceil(resp.totalEvents / this.state.itemsPerPage),
            });
          });
      } else {
        this.guestfetchArticles(this.state.itemsPerPage);
        nextProps.eventActions
          .getEventsGuest(
            this.state.locations.lat,
            this.state.locations.lng,
            this.state.locations.radius,
            this.state.activePage - 1,
            this.state.itemsPerPage
          )
          .then((resp) => {
            this.setState({
              events: resp.events,
              totalEvents: resp.totalEvents,
              pageCount: Math.ceil(resp.totalEvents / this.state.itemsPerPage),
            });
          });
      }
    }
  };

  guestfetchArticles = (itemsPerPage) => {
    this.props.popActions
      .getGuestLocationArticles(
        this.props.lat,
        this.props.lng,
        this.props.radius,
        this.state.activePage - 1,
        itemsPerPage,
        this.state.priority
      )
      .then((resp) => {
        this.setState({
          articles: resp.articles,
          totalArticles: resp.totalArticles,
          flag: resp.articles.length ? true : false,
          finished: true,
        });
      });
  };

  fetchArticles = (itemsPerPage) => {
    this.props.popActions
      .getLocationArticles(
        this.state.activePage - 1,
        itemsPerPage,
        this.state.filter,
        this.state.priority
      )
      .then((articles) => {
        console.log("Articles--->", articles.articles);
        this.setState({
          articles: articles.articles,
          loading: true,
          totalArticles: articles.totalArticles,
          pageCount: Math.ceil(articles.totalArticles / itemsPerPage),
          flag: articles.articles.length ? true : false,
          finished: true,
        });
      });
  };

  fetchForums = (itemsPerPage, communityId) => {
    this.props.forumActions
      .getForums(
        communityId,
        this.state.onlyMineTopics,
        this.state.order,
        this.state.pageIndex,
        itemsPerPage,
        this.state.filter
      )
      .then((resp) => {
        console.log("Forums-->", resp.topics);
        this.setState({
          forums: resp.topics,
          totalForums: resp.totalCommunities,
        });
      });
  };

  render() {
    console.log(this.props, "this props for tesing")
    return (
      this.state.excludeUrl.indexOf(this.props.path) == -1 && (
        <div>
          <Header currentUrl={this.props.location} />
          <div className="leftcolumn">
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/SI05_SHpoYA?autoplay=0"
              ></iframe>
              {this.props.path != "/" && this.props.path != "/aboutgroups" && (
                <div class="ui tiny celled list">
                  <a
                    class="ui red right ribbon label"
                    style={{ marginLeft: "-15px" }}
                  >
                    {this.state.locality
                      ? this.props.address
                        ? this.props.address
                        : "Locality"
                      : `${this.state.groupName}`}{" "}
                    News
                  </a>
                  {this.state.articles.map((article) => (
                    <div className="item">
                      <Link
                        to={`/article/${article.slug}`}
                        style={{ display: "flex" }}
                      >
                        <img class="ui avatar image" src={article.image} />
                        <div class="content">
                          <div class="header">
                            {article.title.split("").slice(0, 20).join("")}...
                          </div>
                          {article.author
                            ? article.author.firstName +
                            " " +
                            article.author.lastName
                            : "Group Member"}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {/* -----------------------Letest Events----------------- */}
              {this.props.path != "/events" && (
                <Link to={this.state.locality ? "/events" : `/groupevents/${this.props.id}`}>
                  <div class="ui tiny celled list">
                    <a
                      class="ui blue right ribbon label"
                      style={{ marginLeft: "-15px" }}
                    >
                      {this.state.locality == true
                        ? this.props.address
                          ? this.props.address
                          : "Locality"
                        : `${this.state.groupName}`}{" "}
                      Events
                    </a>
                    {this.state.events.map((event) => (
                      <div class="item">
                        <div className="ui avatar image">
                          {event.title[0].toUpperCase()}
                        </div>
                        <div class="content">
                          <div class="header">{event.title}</div>
                          {event.author.firstName} {event.author.lastName}
                        </div>
                      </div>
                    ))}
                  </div>{" "}
                </Link>
              )}
              {/* -----------------------Letest Events end----------------- */}
              {/* -----------------------Letest Forum----------------- */}
              {this.props.path != "/forum" && this.props.path != "/groupforum" && (
                <div class="ui tiny celled list">
                  <a
                    class="ui teal right ribbon label"
                    style={{ marginLeft: "-15px" }}
                    href={`/groupforum/${this.props.id}`}
                  >
                    {this.state.locality == true
                      ? this.props.address
                        ? this.props.address
                        : "Locality"
                      : `${this.state.groupName}`}{" "}
                    Chats
                  </a>
                  {this.state.forums.map((forum) => (
                    <div class="ui large middle aligned divided list">
                      <Link to={`/groupforum/${this.props.id}`}>
                        <div class="item">

                          <div className="ui avatar image">
                            {forum.title[0].toUpperCase()}
                          </div>
                          <div class="content">
                            <a class="header">{forum.title}</a>
                            {forum.firstName} {forum.lastName}
                          </div>

                        </div>
                      </Link>

                    </div>
                  ))}
                </div>
              )}
              {/* -----------------------Letest Forum end----------------- */}
            </div>
          </div>
        </div>
      )
    );
  }
}

function mapStateToProps(state, ownProps) {
  let articles = state.LocationArticles.articles;
  let isLoggedIn = state.Authentication.loggedIn;
  let lat = state.Locations.locations.length
    ? state.Locations.locations[0].lat
    : "";
  let lng = state.Locations.locations.length
    ? state.Locations.locations[0].lng
    : "";
  let city = state.Locations.locations[0].locationTag
    ? state.Locations.locations[0].locationTag
    : "";
  let radius = state.Locations.locations.length
    ? state.Locations.locations[0].radius
    : "";
  let locations = state.Locations.locations.length
    ? state.Locations.locations[0]
    : "";
  let path = "/" + ownProps.location.pathname.split("/")[1];
  let location = ownProps.location.pathname;
  let length = state.Locations.locations[0].address.split(",").length
  let address = state.Locations.locations[0].address.split(",")[0]
  let arr= location.split("/");
  let id = parseInt(arr[arr.length-1])





  return {
    articles,
    lat,
    lng,
    radius,
    isLoggedIn,
    city,
    locations,
    path,
    location,
    address,
    id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    popActions: bindActionCreators(PopActions, dispatch),
    locActions: bindActionCreators(LocActions, dispatch),
    forumActions: bindActionCreators(ForumActions, dispatch),
    eventActions: bindActionCreators(EventActions, dispatch),
    popActionsLeft: bindActionCreators(PopActionsLeft, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(LeftColumn);
