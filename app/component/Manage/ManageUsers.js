import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import '../../../style/component/Admin.css';
import * as UserActions from '../../actions/adminActions';
import moment from "moment";
import swal from 'sweetalert';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import AdminHeader from './adminHeader';

class ManageUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            loadsize: 5,
            confirmed: true,
            deleted: false,
            suspended: false,
            pageIndex: 0,
            pageSize: 5,
            filter: '',
            totalUsers: 0
        }
    }

    componentDidMount() {
        this.fetchUsers(this.state.pageSize);
        this.scrollup();
    }

    fetchUsers = (pageSize) => {
        this.props.userActions.getallUsers(this.state.confirmed, this.state.deleted, this.state.suspended, this.state.pageIndex, pageSize, this.state.filter).then((resp) => {
            this.setState({
                users: resp.users,
                totalUsers: resp.totalUsers
            });
            console.log(resp);
        })
    }

    fetchFilterUsers = (filter) => {
        this.props.userActions.getallUsers(this.state.confirmed, this.state.deleted, this.state.suspended, this.state.pageIndex, this.state.pageSize, filter).then((resp) => {
            this.setState({
                users: resp.users,
                totalUsers: resp.totalUsers
            });
        })
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
        if (this.state.totalUsers > this.state.pageSize) {
            let load = this.state.pageSize + parseInt(this.state.loadsize);
            this.setState({
                pageSize: load
            })
            this.fetchUsers(load);
            console.log(e.target.value);
            // if (this.props.isLoggedIn == ("true" || true)) {
            //     this.fetchArticles(itemsPerPage);
            // }
            // else {
            //     this.guestfetchArticles(itemsPerPage);
            // }
        }
        else {
            swal({
                title: "That's it",
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
        // document.getElementById(id).classList.toggle("show");
        // window.onclick = function (event) {
        //     if (!event.target.id === id) {
        //         var dropdowns = document.getElementsByClassName("dropdown-content");
        //         for (var i = 0; i < dropdowns.length; i++) {
        //             var openDropdown = dropdowns[i];
        //             if (openDropdown.classList.contains('show')) {
        //                 openDropdown.classList.remove('show');
        //             }
        //         }
        //     }
        // }
    }

    onSearch = () => {
        this.fetchFilterUsers(this.state.filter);
    }

    scrollup() {
        window.scrollTo(0, 0);
    }

    suspendUser = (userId) => {
        this.props.userActions.suspendUser(userId).then((resp) => {
            swal({
                title: "User Suspended",
                icon: 'success',
                timer: 1000
            })
            this.fetchUsers(this.state.pageSize);
        })
    }

    render() {
        return (
            <Fragment>
                <Header />
                <AdminHeader currentUrl={this.props.currentUrl} />
                <Container>
                    <div className="page-title-admin"><h1>Manage Users</h1></div>
                    <Row>
                        <Col md={2}>
                            <div className="btn-group">
                                <Link to="/adduser" className="btn btn-danger"><span>Add User</span>
                                    <i className="fa fa-plus"></i>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <div className="clearfix">&nbsp;</div>
                    <Row>
                        <Col md={2} sm={2}>
                            <label>Load Per Click</label>
                            <select className="form-control" onChange={this.onChangeItems} style={{ width: "100px" }}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                        </Col>
                        <Col md={7} sm={7}>
                            <Row>
                                <Col md={3} sm={3}>
                                    <label>Show</label>
                                    <select className="form-control">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </Col>
                            </Row>
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
                                    <th>Full Name</th>
                                    <th>Email Address	</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.firstName + ' ' + user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td><span className="labeladmin label-sm label-success">Active</span></td>
                                            <td>{moment(user.created).format("DD.MM.YYYY")}</td>
                                            <td>
                                                {/* <div className="dropdown relative">
                                                        <button onClick={() => this.dropdown(user.id)} className="dropbtnB">Actions</button>
                                                        <ul id={user.id} className="dropdown-content">
                                                            <li><a href="#">Edit</a></li>
                                                            <li><span onClick={() => this.suspendUser(user.id)} >Suspend</span></li>
                                                            <li><a href="#">Delete</a></li>
                                                        </ul>
                                                    </div> */}
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="danger" id="dropdown-basic" className="dropbtnB">
                                                        Action
                                                     </Dropdown.Toggle>
                                                    <Dropdown.Menu onClick={() => this.dropdown(user.id)} className="dropdown-content">
                                                        <Dropdown.Item > <p> Edit </p></Dropdown.Item>
                                                        <Dropdown.Item onClick={() => this.suspendUser(user.id)}> <p>Suspend</p> </Dropdown.Item>
                                                        <Dropdown.Item > <span className="colorfontclass">Delete</span> </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="clearfix">&nbsp;</div>
                    <Row className="row-admin">
                        <Col md={6} sm={6} >
                            <span>Showing {this.state.pageIndex + 1} to {this.state.pageSize} of {this.state.totalUsers} records.</span>
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
        userActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);