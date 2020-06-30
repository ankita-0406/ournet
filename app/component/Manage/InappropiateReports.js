import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import * as UserActions from '../../actions/adminActions';
import moment from "moment";
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import AdminHeader from './adminHeader';
import Swal from "sweetalert2";



class InappropiateReports extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            reports: [],
            articles: [],
            pageIndex: 0,
            pageSize: 5,
            repordId: 24,
            filter: '',
            toggle: 0
        }
    }

    componentDidMount() {
        this.fetchUsers(this.state.pageSize);
        this.props.userActions.getInappropriate(this.state.repordId, this.state.pageIndex, this.state.pageSize, this.state.filter).then((resp) => {

            this.setState({
                articles: resp
            });
            console.log(resp);
        })
        this.scrollup();
    }

    fetchUsers = (pageSize) => {
        this.props.userActions.getallInappropriate(this.state.pageIndex, pageSize, this.state.filter).then((resp) => {
            console.log("inappropriate", resp)
            this.setState({
                reports: resp.articles
            });
        })
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

    onShow = (id) => {
        console.log(id);
        if (this.state.toggle == id) {
            this.setState({ toggle: -1 })
        } else {
            this.setState({ toggle: id })
        }
    }


    scrollup() {
        window.scrollTo(0, 0);
    }

    sweetAlert = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            marginleft: '5em',
            showCancelButton: true,
            confirmButtonText: 'Yes, Suspend!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
               

                this.props.userActions.suspendUser(id).then(res => {
                    swalWithBootstrapButtons.fire(
                        'Suspended!',
                        'Article has been Suspended.',
                        'success'
                      )
                })
            }
        })
    };

    render() {
        return (
            <Fragment>
                <Header />
                <AdminHeader currentUrl={this.props.currentUrl} />
                <Container>
                    <div className="page-title-admin"><h1>Inappropiate Reports</h1></div>
                    <Row>
                        <Col md={2} sm={2}>
                            <label>Load Per Click</label>
                            <select className="form-control" style={{ width: "100px" }}>
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
                                            <input type="text" className="form-control" placeholder="Search..." />
                                            <span className="fa fa-search search-icon" ></span>
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
                                    <th>Title</th>
                                    <th>Introduction</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                    <th>Created </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.reports.map((article) => {
                                    return (
                                        <tr key={article.articleId} onClick={() => this.onshow(article.articleId)}>
                                            <td>{article.title}</td>
                                            <td>{article.introduction}</td>
                                            <td><span className="labeladmin label-sm label-success">{article.status}</span></td>
                                            <td>
                                                <div className="btn-group">
                                                    <div className="dropdown relative">
                                                        <button onClick={() => this.dropdown(article.articleId)} className="dropbtnB">Actions</button>
                                                        <ul id={article.articleId} className="dropdown-content innapULclass">
                                                            <li><a href="#">View</a></li>
                                                            <li><a href="#" onClick={() => this.sweetAlert(article.articleId)} >Suspend</a></li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* <div className="btn-group">
                                                    <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Actions
                                                     </button>
                                                    <div className="dropdown-menu">
                                                        <a className="dropdown-item" href="#">View</a>
                                                        <a className="dropdown-item"  onClick={() => this.sweetAlert(article.articleId)}>Suspend</a>
                                                        
                                                        <div className="dropdown-divider"></div>
                                                   
                                                    </div>
                                                </div> */}
                                            </td>
                                            <td>{moment(article.createdDate).format("DD.MM.YYYY")}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <If condition={this.state.toggle} >
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Serial Number </th>
                                        <th>Reason</th>
                                        <th>Email</th>
                                        <th>Added on</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.articles.map((article, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td> {article.reason}</td>
                                                <td> {article.email} </td>
                                                <td>{article.dateModified}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </If>
                    </div>
                    <div className="clearfix">&nbsp;</div>
                    <Row className="row-admin">
                        <Col md={6} sm={6} className="text-right">
                            <button type="button" className={this.state.loading ? "grpDetailBtn rating-loading btn-fill-blue" : "loadmoreBtn"}>Load More</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(InappropiateReports);