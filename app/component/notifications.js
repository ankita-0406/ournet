import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown, Modal, Button } from "react-bootstrap";
import * as UserActions from '../actions/adminActions';
import moment from "moment";
import swal from 'sweetalert';
import Header from './Header';
import Footer from './Footer';
import ReactHtmlParser from 'react-html-parser';
import * as NotificationsActions from "../actions/notificationsActions";
import { DeclineRequest } from '../api/NotificationsApi';



class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            articles: [],
            loading: true,
            loadsize: 5,
            showStickyOnly: false,
            pageIndex: 0,
            pageSize: 5,
            filter: '',
            totalArticles: 0,
            showModal: false,
            slugId: null,
            totalNotifications: 0
        }
    }

    componentDidMount() {

        this.fetchNotifications(this.state.pageSize);
        this.scrollup();
        

    }

    fetchNotifications = (pageSize) => {
        this.props.userActions.getUserNotifications(this.state.pageIndex, pageSize, this.state.filter).then(res => {

            let notifications = res.notifications;
            console.log("notificationsa the", notifications);
            let totalNotifications = res.totalNotifications;
            this.customizeNotifications(notifications).then(resp => {
                console.log("notificationsa are the", resp);
                this.setState({
                    htmlMessage: resp,
                    notifications,
                    totalNotifications,
                })
            })
        })
    }

    customizeNotifications = async (notifications) => {
        let arr = []
        notifications.forEach(elem => {
            const re = new RegExp('http://localhost:3000', 'g');
            const str1 = elem.htmlMessage;
            const str2 = str1.replace(re, "")
            const str3 = str2.replace("/group/", "/aboutgroups/")
            const str4 = str3.replace("/user/profile/", "/userprofile/")
            arr.push(str4)

        })
        return arr;

    }


    onChangeItems = (e) => {
        console.log(e.target.value);
        let value = e.target.value;
        this.setState({
            loadsize: value
        })

    }

    onLoad = (e) => {
        // debugger;
        if (this.state.totalNotifications > this.state.pageSize) {
            let load = this.state.pageSize + parseInt(this.state.loadsize);
            this.setState({
                pageSize: load,
            }, () => {
                this.fetchNotifications(load);
            })


        }
        else {
            swal({
                title: "That's it!",
                icon: 'warning',
                timer: 1000
            })
        }
    }

    onChangeFilter = (e) => {
        let filter = e.target.value
        this.setState({
            filter
        })
    }

    dropdown = (id) => {
        console.log("Id pressed", id);

    }

    onSuspend = (articleId) => {
        let data = {};
        data.articleId = articleId;
        swal("Reason for suspending:", {
            content: "input",
            showCancelButton: true,
            animation: "slide-from-top",
            inputPlaceholder: "Write reason"
        }).then((value) => {
            data.reason = value;
            this.props.userActions.suspendArticle(data).then((resp) => {
                swal({
                    title: 'Article has been suspended!',
                    icon: 'success',
                    timer: 900
                })
                this.fetchArticles(this.state.pageSize);
            })
        })
    }

    onSearch = () => {
        this.fetchNotifications(this.state.pageSize);
    }

    scrollup() {
        window.scrollTo(0, 0);
    }

    onViewClick = (index) => {

        let slugId = this.state.articles[index].slug;

        this.setState({
            showModal: true,
            slugId: slugId
        })

    }
    accept(id, type) {


        let data = {
            notificationId: id.toString()
        }

        if(type =="accept"){
        this.props.NotificationsActions.AcceptRequest(data).then(res => {
            console.log("response", res)
            this.fetchNotifications(this.state.pageSize)
        })
    }else
    {
        this.props.NotificationsActions.DeclineRequest(data).then(res => {
            console.log("response", res)
            this.fetchNotifications(this.state.pageSize)
        })

    }

    }





    render() {
        return (
            <Fragment>

        <Header /> 

                <Container>
                    <div className="page-title-admin"><h1>Notifications</h1></div>
                    <Row>
                        <Col md={2} sm={2}>
                            <label>Load Per Click</label>
                            <select className="form-control" onChange={this.onChangeItems} style={{ width: "100px" }}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                        </Col>

                        <Col md={3} sm={3}>
                            <Row>
                                <Col md={4} sm={4}>
                                    <div className="search-box">
                                        <div className="form-group form-group-sm">
                                            <input type="text" className="form-control" onChange={this.onChangeFilter} placeholder="Search..." />
                                            <span className="fa fa-search search-icon" onClick={this.onSearch}></span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className="clearfix">&nbsp;</div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Notification</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {this.state.notifications.map((notification, index) => {
                                    return (
                                      
                                        <tr key={notification.id}>
                                            <td>{notification.type}</td>
                                            <td>{ReactHtmlParser(this.state.htmlMessage[index])}</td>
                                            <td><span className="labeladmin label-sm label-success">{notification.status}</span></td>
                                            <td>{moment(notification.createdDate).format("DD.MM.YYYY")}</td>
                                            <td>
                                                {/* <div className="btn-group">
                                                    <div className="dropdown relative">
                                                        <button onClick={() => this.dropdown(article.id)} className="dropbtnB">Actions</button>
                                                        <ul id={article.id} className="dropdown-content">
                                                            <li><Link to={`article/${article.slug}`}>View</Link></li>
                                                            <If condition={(article.status == "PUBLISHED")}>
                                                                <li><span onClick={() => this.onSuspend(article.id)} >Suspend</span></li>
                                                            </If>
                                                        </ul>
                                                    </div>
                                                </div> */}
                                                {notification.status == "Action required"    &&
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="danger" id="dropdown-basic" className="dropbtnB">
                                                            Action
                                                     </Dropdown.Toggle>
                                                        <Dropdown.Menu onClick={() => this.dropdown(notification.id)} className="dropdown-content">
                                                            {/* <Dropdown.Item ><p className="manageArticlep"><Link to={`notification/${notification.slug}`}>View</Link></p></Dropdown.Item> */}
                                                            <Dropdown.Item ><p className="manageArticlep" onClick={() => this.accept(notification.id, "accept")}>Accept</p></Dropdown.Item>

                                                            <Dropdown.Item> <p  onClick={() => this.accept(notification.id, "decline")}
                                                            >Decline</p> </Dropdown.Item>

                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                }
                                            </td>
                                        </tr>
                                        
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="clearfix">&nbsp;</div>
                    <Row className="row-admin">
                        <Col md={6} sm={6}>
                            <span>Showing {this.state.pageIndex + 1} to {this.state.pageSize} of {this.state.totalNotifications} records.</span>
                        </Col>

                        <Col md={6} sm={6} className="text-right">
                            <button type="button" className={this.state.loading ? "grpDetailBtn rating-loading btn-fill-blue" : "loadmoreBtn"} value={this.state.loadsize} onClick={this.onLoad}>Load More</button>
                        </Col>

                    </Row>
                </Container>
            <Footer /> 
            </Fragment>
           
 
        );
    }
}

function mapStateToProps(state, ownProps) {

    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    return {
        currentUrl
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch),
        NotificationsActions: bindActionCreators(NotificationsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);