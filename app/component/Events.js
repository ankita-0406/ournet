import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../style/component/Event.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as EventActions from "../actions/eventActions";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Modal,
  Button,
  Accordion,
  Card,
} from "react-bootstrap";
import LeftColumn from "../common/leftColumn";
import EventCard from "./EventCard";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import Forum from "./Forum";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      activePage: 1,
      itemsPerPage: 12,
      pageCount: 1,
      totalEvents: 0,
      filter: "",
      locations: this.props.locations,
      new: false,
      loadTopics: true,
      topics: [],
      comment: "",
      topicOne: {},
      noTopics: false,
    };
  }

  onChangeItems = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onCancel = () => {
    this.setState({
      new: false,
    });
  };
  onSave = () => {
    let data = {};
    data.title = this.state.title;
    data.description = this.state.description;
    data.communityId = this.state.communityId;
    if (this.validator.allValid()) {
      this.props.forumActions
        .NewForum(data)
        .then((resp) => {
          if (resp == true) {
            swal({
              title: "Forum published successfully!",
              text: "Forum has been published successfully",
              icon: "success",
              timer: 900,
            });
            this.fetchForums(this.state.pageSize, this.state.communityId);
            this.onCancel();
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
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.eventActions
        .getEvents(
          this.state.activePage - 1,
          this.state.itemsPerPage,
          this.state.filter
        )
        .then((resp) => {
          console.log("events ---->", resp.events);
          this.setState({
            events: resp.events,
            totalEvents: resp.totalEvents,
            pageCount: Math.ceil(resp.totalEvents / this.state.itemsPerPage),
          });
        });
    } else {
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
  }

  getEventComments = async (id) => {
    this.props.eventActions.getEventTopicComment(id).then((resp) => {
      this.setState({
        topics: resp.comments,
      });
    });
  };

  callForum = (eventId) => {
    this.setState({
      loadTopics: true,
      comment: "",
    });
    //Call Api to get Forums linked to eventId
    this.props.eventActions.getEventsForum(eventId).then((res) => {
      if (res.topics.length > 0) {
        this.setState({
          topicId: res.topics[0].id,
          topicOne: res.topics[0],
          noTopics: false,
        });
        this.getEventComments(res.topics[0].id).then((resp) => {
          this.setState({
            loadTopics: false,
          });
        });
      } else {
        this.setState({
          topics: [],
          loadTopics: false,
          noTopics: true,
        });
      }
    });
  };

  onChangeItems = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  onSave = () => {
    if (this.state.comment != "") {
      let data = {};
      data.eventTopicId = this.state.topicId;

      data.text = this.state.comment;

      this.props.eventActions.postEventComment(data).then((res) => {
        this.getEventComments(this.state.topicId);
        this.setState({
          comment: "",
        });
      });
    }
  };

  onEnterSave = (e) => {
    if (e.key === "Enter") {
      this.onSave();
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* <Header currentUrl={this.props.currentUrl}/> */}
        <div className="section">
        <Container fluid>
           <div class="row">
               <div className="rightcolumn">
                <div className="secHeader flexRow evenSpace">
                  <div className="secTitle">
                    <label className="secName">Events</label>
                    <br />
                    <label className="secDesc">
                      Suggested events near my location
                    </label>
                  </div>
                  {this.props.isLoggedIn ? (
                    <div>
                      <Link to="/newevent">
                        <button type="button" className="eventHeaderBtn">
                          CREATE EVENT
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <p className="eventHeaderBtn">
                      <a href="/login">Login</a> to add Events
                    </p>
                  )}
                </div>

                <Accordion>
                  {this.state.events.map((event) => {
                    return (
                      // <Container fluid>
                      // <Accordion defaultActiveKey="0">
                      <Card
                        style={{
                          width: "90%",
                        }}
                      >
                        <Card.Header style={{ padding: "0px" }}>
                          <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey={event.id}
                            style={{
                              width: "1030px",
                              padding: "0px",
                              height: "125px",
                            }}
                          >
                            <EventCard
                              id={event.id}
                              date={event.createdDate}
                              title={event.title}
                              image={event.image}
                              price={event.price}
                              address={event.address}
                              callForum={(eventId) => this.callForum(eventId)}
                            />
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={event.id}>
                          <Card.Body style={{ backgroundColor: "#edf2f8" }}>
                            <div className="forumSec">
                              {this.state.loadTopics == false &&
                                this.state.topics
                                  .slice()
                                  .reverse()
                                  .map((elem) => (
                                    <div className="topicBlock" key={elem.id}>
                                      <div className="flexRow">
                                        <div className="topicBox flexColumn evenSpace elem-row-bdr threadLevel">
                                          <div className="topicDesc flexRow">
                                            <div className="topicProfileImg">
                                              <img
                                                alt=""
                                                src={elem.author.avatar}
                                              />
                                            </div>
                                            <div className="topicContentWrap">
                                              <p className="topicAuthorDesc">
                                                <span>
                                                  <a href="#">
                                                    {elem.author.username}
                                                  </a>
                                                </span>{" "}
                                                {moment(elem.date).format(
                                                  "MMM D,  hh:mm"
                                                )}{" "}
                                              </p>
                                              <p className="topicDetails">
                                                {elem.text}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              {this.state.noTopics == false ? (
                                <div className="flexRow">
                                  <TextareaAutosize
                                    className="comment-textarea"
                                    minRows={2}
                                    maxRows={6}
                                    id="comment"
                                    placeholder="Your Comment..."
                                    value={this.state.comment}
                                    onChange={this.onChangeItems}
                                    onKeyDown={(e) => {
                                      this.onEnterSave(e);
                                    }}
                                  />
                                  <button
                                    onClick={this.onSave}
                                    className="send-btn btn-article"
                                  >
                                    Send
                                  </button>
                                </div>
                              ) : (
                                <span>
                                  No topics Available under this Event
                                </span>
                              )}
                              {this.state.loadTopics && (
                                <div style={{ "margin-left": "50%" }}>
                                  <Spinner animation="grow" variant="info" />
                                </div>
                              )}
                            </div>
                            {/* <div className="haCenter">
                                                                <button type="button" className="loadmoreBtn rating-loading btn-fill-blue loadmoreButtonClass" onClick={this.onChangeItemsPage}>Load More</button>
                                                            </div> */}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>

                      // {/* </Accordion> */}

                      // </Container>
                    );
                  })}
                </Accordion>
                <div className="haCenter">
                  <button
                    type="button"
                    className="loadmoreBtn rating-loading btn-fill-blue"
                  >
                    Load More Event
                  </button>
                </div>
                </div>
                </div>
          </Container>
        </div>

        {/* </Container> */}

        <div className="haCenter">
          <button type="button" className="upBtn">
            <i className="fa fa-angle-up" aria-hidden=""></i>
          </button>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let currentUrl = ownProps.location ? ownProps.location.pathname : "";
  let locations = state.Locations.locations.length
    ? state.Locations.locations[0]
    : "";
  let isLoggedIn = state.Authentication.loggedIn;


  return {
    isLoggedIn,
    currentUrl,
    locations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(EventActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
