import React from "react";
import { Link } from 'react-router-dom';
import moment from "moment";
import ReactHtmlParser from 'react-html-parser';
import { Button } from "react-bootstrap";
import '../common/forum.css';
const Forum = (props) => {





    return (

        props.notifications.map((notification) => (

            <div className="topicBlock" style={{ marginBottom: "14px" }}>
                <div className="flexRow" >
                    <div className="topicBox flexColumn evenSpace" >
                        <div className="topicDesc flexRow" >
                            {/* <Link to={`/userprofile/${forum.author.userId}`}>
                        <div className="topicProfileImg topicProfiletext">{forum.author.firstName.charAt(0)}</div>
                    </Link>
        */}
                            <div className="topicContentWrap" style={{ margin: "-15px" }}>
                                {/* <p className="topic-reply"><i className="fa fa-reply" aria-hidden="true"></i> {notification.type} Reply</p>*/}




                                <p className="topicAuthorDesc"><span> {notification.type} </span> </p>
                                <span >{moment(notification.createdDate).format("MMM D, YYYY")}</span>
                                {notification.status == "Action required" &&
                                    <Dropdown>
                                        <Dropdown.Toggle variant="danger" id="dropdown-basic" className="dropbtnB">
                                            Action
                         </Dropdown.Toggle>
                                        <Dropdown.Menu onClick={() => this.dropdown(notification.id)} className="dropdown-content">
                                            {/* <Dropdown.Item ><p className="manageArticlep"><Link to={`notification/${notification.slug}`}>View</Link></p></Dropdown.Item> */}
                                            <Dropdown.Item ><p className="manageArticlep" onClick={() => this.accept(notification.id, "accept")}>Accept</p></Dropdown.Item>

                                            <Dropdown.Item> <p onClick={() => this.accept(notification.id, "decline")}
                                            >Decline</p> </Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        ))





    )




}

export default Forum;