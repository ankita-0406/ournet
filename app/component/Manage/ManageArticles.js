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
import Article from "../../component/Article"


class ManageArticles extends React.Component {
 

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            loadsize: 5,
            showStickyOnly: false,
            pageIndex: 0,
            pageSize: 5,
            filter: '',
            totalArticles: 0,
            showModal: false,
            slugId: null
        }
    }

    componentDidMount() {
        this.fetchArticles(this.state.pageSize);
        this.scrollup();
    }

    fetchArticles = (pageSize) => {
        this.props.userActions.getallArticles(this.state.pageIndex, pageSize, this.state.filter, this.state.showStickyOnly).then((resp) => {
            console.log("checking slugId's", resp.articles)
            this.setState({
                articles: resp.articles,
                totalArticles: resp.totalArticles
            });
            console.log(resp);
        })
    }

  fetchFilterArticles = (filter) => {
    this.props.userActions
      .getallArticles(
        this.state.pageIndex,
        this.state.pageSize,
        filter,
        this.state.showStickyOnly
      )
      .then((resp) => {
        this.setState({
          articles: resp.articles,
          totalArticles: resp.totalArticles,
        });
      });
  };

  onChangeItems = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    this.setState({
      loadsize: value,
    });
  };

  onLoad = (e) => {
    // debugger;
    if (this.state.totalArticles > this.state.pageSize) {
      let load = this.state.pageSize + parseInt(this.state.loadsize);
      this.setState({
        pageSize: load,
      });
      this.fetchArticles(load);
      console.log(e.target.value);
    } else {
      swal({
        title: "That's it!",
        icon: "warning",
        timer: 1000,
      });
    }
  };

  onChangeFilter = (e) => {
    let filter = e.target.value;
    this.setState({
      filter,
    });
  };

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
  };

  onSuspend = (articleId) => {
    let data = {};
    data.articleId = articleId;
    swal("Reason for suspending:", {
      content: "input",
      showCancelButton: true,
      animation: "slide-from-top",
      inputPlaceholder: "Write reason",
    }).then((value) => {
      data.reason = value;
      this.props.userActions.suspendArticle(data).then((resp) => {
        swal({
          title: "Article has been suspended!",
          icon: "success",
          timer: 900,
        });
        this.fetchArticles(this.state.pageSize);
      });
    });
  };

  onSearch = () => {
    this.fetchFilterArticles(this.state.filter);
  };

  scrollup() {
    window.scrollTo(0, 0);
  }

  onViewClick = (index) => {
    let slugId = this.state.articles[index].slug;
    this.setState({ show: true, slugId: slugId });
  };

    onViewClick = (index) => {

        let slugId = this.state.articles[index].slug;

        this.setState({
            showModal: true,
            slugId: slugId
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
                        <Article articleSlugId={this.state.slugId} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ showModal: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Header />

                <AdminHeader currentUrl={this.props.currentUrl} />
                <Container>
                    <div className="page-title-admin"><h1>Manage Articles</h1></div>
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
                                    <th>Title</th>
                                    <th>Introduction</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.articles.map((article, index) => {
                                    return (
                                        <tr key={article.id}>
                                            <td>{article.title}</td>
                                            <td>{article.introduction}</td>
                                            <td><span className={(article.status == "PUBLISHED") ? "labeladmin label-sm label-success" : "labeladmin label-sm label-warning"}>{article.status}</span></td>
                                            <td>{moment(article.created).format("DD.MM.YYYY")}</td>
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
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="danger" id="dropdown-basic" className="dropbtnB">
                                                        Action
                                                     </Dropdown.Toggle>
                                                    <Dropdown.Menu onClick={() => this.dropdown(article.id)} className="dropdown-content">
                                                        {/* <Dropdown.Item ><p className="manageArticlep"><Link to={`article/${article.slug}`}>View</Link></p></Dropdown.Item> */}
                                                        <Dropdown.Item onClick={() => this.onViewClick(index)}><p className="manageArticlep">View</p></Dropdown.Item>
                                                        <If condition={(article.status == "PUBLISHED")}>
                                                            <Dropdown.Item onClick={() => this.onSuspend(article.id)}> <p>Suspend</p> </Dropdown.Item>
                                                        </If>
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
                        <Col md={6} sm={6}>
                            <span>Showing {this.state.pageIndex + 1} to {this.state.pageSize} of {this.state.totalArticles} records.</span>
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
    currentUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageArticles);
