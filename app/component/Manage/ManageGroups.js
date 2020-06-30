import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown, Modal, Button } from "react-bootstrap";
import '../../../style/component/Admin.css';
import * as UserActions from '../../actions/adminActions';
import moment from "moment";
import swal from 'sweetalert';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import AdminHeader from './adminHeader';
import Group from "../../component/AboutGroups"
class ManageGroups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            loading: true,
            loadsize: 5,
            showStickyOnly: false,
            pageIndex: 0,
            pageSize: 5,
            filter: '',
            totalGroups: 0,
            status: '',
            showModal: false,
            groupId: null

        }
    }

    componentDidMount() {
        this.fetchGroups(this.state.pageSize);
        this.scrollup();
    }

    fetchGroups = (pageSize) => {
        this.props.userActions.getallGroups(this.state.pageIndex, pageSize, this.state.filter, this.state.showStickyOnly).then((resp) => {
            this.setState({
                groups: resp.groups,
                totalGroups: resp.totalGroups
            });
        })
    }

    fetchFilterGroups = (filter) => {
        this.props.userActions.getallGroups(this.state.pageIndex, this.state.pageSize, filter, this.state.showStickyOnly).then((resp) => {
            this.setState({
                groups: resp.groups,
                totalGroups: resp.totalGroups
            });
        })
    }


    onChangeItems = (e) => {
        let value = e.target.value;
        this.setState({
            loadsize: value
        })
    }

    onLoad = (e) => {
        // debugger;
        if (this.state.totalGroups > this.state.pageSize) {
            let load = this.state.pageSize + parseInt(this.state.loadsize);
            this.setState({
                pageSize: load
            })
            this.fetchGroups(load);
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
        console.log(e.target.value);
    }

    dropdown = (id) => {
        document.getElementById(id).classList.toggle("show");
        window.onclick = function (event) {
            if (!event.target.id === id) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                for (var i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }
    dropDownBlur = (id) => {

        var dropdowns = document.getElementsByClassName("dropdown-content");

        setTimeout(() => {
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }, 200);


    }

    onSearch = () => {
        this.fetchFilterGroups(this.state.filter);
    }

    scrollup() {
        window.scrollTo(0, 0);
    }

    onPublish = (groupId) => {
        this.props.userActions.publishGroup(groupId).then((resp) => {
            this.setState({
                status: resp.status
            });
            this.fetchGroups(this.state.pageSize);
        })
    }

    onSuspend = (groupId) => {
        let data = {};
        data.groupId = groupId;
        swal("Reason for suspending:", {
            content: "input",
        }).then((value) => {
            data.reason = value;
            this.props.userActions.suspendGroup(data).then((resp) => {
                swal({
                    title: 'Group has been suspended!',
                    icon: 'success',
                    timer: 900
                })
                this.fetchGroups(this.state.pageSize);
            })
        })
    }

    onViewClick = (index) => {

        let groupId = this.state.groups[index].id;

        this.setState({
            showModal: true,
            groupId: groupId
        })

    }

    render() {
        return (
            <Fragment>
                <Modal
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    size="lg"

                >
                    {/* <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Modal heading
              </Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>
                        <Group superGroupId={this.state.groupId} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ showModal: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Header />
                <AdminHeader currentUrl={this.props.currentUrl} />
                <Container>
                    <div className="page-title-admin"><h1>Manage Groups</h1></div>
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
                                    <select className="form-control showCls" style={{ height: "calc(2.5em + .75rem + 2px)" }}>
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
                                <tr className="bordertop">
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Payment Plan</th>
                                    <th>Owner</th>
                                    <th>Members</th>
                                    <th>Description</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.groups.map((group, index) => {
                                    return (
                                        <tr key={group.id}>
                                            <td>{group.name}</td>
                                            <td>{group.groupType}</td>
                                            <td><span className="labeladmin label-sm label-success">{group.status}</span></td>
                                            <td> {group.paymentPlan.name} </td>
                                            <td> {group.owner.firstName + ' ' + group.owner.lastName} </td>
                                            <td> {group.numMembers} </td>
                                            <td> {group.description} </td>
                                            <td>{moment(group.created).format("DD.MM.YYYY")}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <div className="dropdown relative">
                                                        <button onClick={() => this.dropdown(group.id)} onBlur={() => this.dropDownBlur(group.id)} className="dropbtnB">Actions</button>
                                                        <ul id={group.id} className="dropdown-content">
                                                            {/* <li><Link className="liColor" to={`aboutgroups/${group.id}`}>View</Link></li> */}
                                                            <li onClick={() => this.onViewClick(index)}>View</li>
                                                            <li><span onClick={() => (group.status == "PUBLISHED") ? this.onSuspend(group.id) : this.onPublish(group.id)} > {(group.status == "SUSPENDED") ? 'Publish' : 'Suspend'}</span></li>
                                                        </ul>
                                                    </div>
                                                </div>

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
                            <span>Showing {this.state.pageIndex + 1} to {this.state.pageSize} of {this.state.totalGroups} records.</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageGroups);