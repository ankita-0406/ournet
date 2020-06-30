import React, { Component, Fragment } from 'react';
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class adminHeader extends Component {
    render() {
        return (
            <Fragment>
                <div className="page-container" >
                    <div className="page-content-wrapper">
                        <div className="page-head">
                            <Container>
                                <div className="admin-top-nav">
                                    <Link to="/manageusers" className={this.props.user ? "active" : ""}>Manage Users</Link>
                                    <Link to="/managearticles" className={this.props.article ? "active" : ""}>Manage Articles</Link>
                                    <Link to="/managegroups" className={this.props.group ? "active" : ""}>Manage Groups</Link>
                                    <Link to="/scoreparameter" className={this.props.score ? "active" : ""}>Score Parameter</Link>
                                    <Link to="/inappropriate" className={this.props.report ? "active" : ""}>Inappropriate</Link>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
                <div className="clearfix">&nbsp;</div>
            </Fragment>
        );
    }
}

function mapStateToProps(state,ownProps) {
    let currentUrl = ownProps.currentUrl || "";
    let user = false;
    let article = false;
    let group = false;
    let score = false;
    let report = false;

    if (currentUrl == "/manageusers") {
        user = true;
    }
    else if (currentUrl == "/adduser") {
        user =true;
    }
    else if (currentUrl == "/managearticles") {
        article =true;
    }
    else if (currentUrl == "/managegroups") {
        group =true;
    }
    else if (currentUrl == "/scoreparameter") {
        score =true;
    }
    else if (currentUrl == "/inappropriate"){
        report = true;
    }
    return {
        currentUrl,
        user,
        article,
        group,
        score,
        report
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(adminHeader);