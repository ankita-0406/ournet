import React, { Component, Fragment } from 'react';
import { Row, Col } from "react-bootstrap";

class optionsMenu extends Component {

    // onChangeFilter = (e) => {
    //     let filter = e.target.value
    //     this.setState({
    //         filter
    //     })
    // }

    // onSearch = () => {
    //     this.fetchFilterUsers(this.state.filter);
    // }

    // onChangeItems = (e) => {
    //     console.log(e.target.value);
    //     let value = e.target.value;
    //     this.setState({
    //         loadsize: value
    //     })
    // }

    render() {
        return (
            <Fragment>
                <Row>
                    <Col md={2}>
                        <div className="btn-group">
                            <a href="#" className="btn btn-danger"><span>Add User</span>
                                <i className="fa fa-plus"></i>
                            </a>
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
                                        <input type="text" className="form-control" onChange={this.onChangeFilter} onClick={this.onSearch} placeholder="Search..." />
                                        <span className="fa fa-search search-icon"></span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className="clearfix">&nbsp;</div>
            </Fragment>
        );
    }
}

export default optionsMenu;