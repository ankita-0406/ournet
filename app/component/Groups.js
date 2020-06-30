import React, { Component, Fragment } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import '../../style/component/Group.css';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as GroupActions from '../actions/groupActions';
import SideDrawer from './SideDrawer'
import Meta from '../common/Meta';
import LeftColumn from "../common/leftColumn"

class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            pageIndex: 0,
            pageSize: 9,
            userGroups: [],
            fetching: true,
            privateGroups:[]
        }
    }

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.groupActions.getGroups().then((resp) => {
                // let publicGroups = this.filterPublicGroups(resp.groups)
                // let privateGroups = this.filterPrivateGroups(resp.groups)
                this.setState({
                    groups:resp.groups,
                    fetching: false,
                
                });
            })
        }
        if (this.props.isLoggedIn) {
       
            this.props.groupActions.getUserGroups(this.state.pageIndex, this.state.pageSize, 1).then((resp) => {

                console.log("groupssss" , resp.groups)
  
              
                // let publicGroups = this.filterPublicGroups(resp.groups)
                // let privateGroups = this.filterPrivateGroups(resp.groups)
    
                
                this.setState({
                    groups:resp.groups,
                    fetching: false,
                  
                });
            
            })

            this.props.groupActions.getUserGroups(this.state.pageIndex, this.state.pageSize, 0).then((resp) => {
          
                let publicGroups = this.filterPublicGroups(resp.groups)
     
                let privateGroups = this.filterPrivateGroups(resp.groups)
                this.setState({
                    userGroups: publicGroups ,
                    fetching: false,
                    privateGroups
                });
            })
        }
        this.scrollup()
    }

    filterPublicGroups = (groups) =>{
        return groups.filter(group=>{
            return group.groupType=="PUBLIC" 

        })
    }

    filterPrivateGroups = (groups) =>{
        return groups.filter(group=>{
            return group.groupType=="PRIVATE" || group.groupType=="INVITED_ONLY"

        })
    }

    scrollup() {
        document.body.scrollTo({ top: 0, behavior: 'smooth' })
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }

    render() {
        return (
            <Fragment>
                <Meta title="Communities" />
                <Header currentUrl={this.props.currentUrl} />
                <Container>
                {/* <LeftColumn path={this.props.currentUrl} /> */}
                    <If condition={this.props.isLoggedIn}>
                        <div className="section" style={{ marginBottom: 25 }}>
                            <div className="secHeader flexRow evenSpace">
                                
                                <div className="secTitle">
                                    <label className="secNameGroup">My Communities</label><br />
                                    <label className="secDescGroup">Communities you’ve joined</label>
                                </div>
                                <SideDrawer groups={this.state.privateGroups}/>

                                <Link to={{
                                    pathname: this.props.isLoggedIn ? "/newgroup" : "/login",
                                    someVal: {
                                        checking: "some value"
                                    }
                                }}><button type="button" className="forumHeaderBtn btn-fill-blue">START COMMUNITY</button></Link>
                            </div>
                        </div>
                        <Row className="homeArticles">
                            {this.state.fetching ? <div className="spinner-grow text-primary" style={{ "width": "3rem", "height": "3rem" }} role="status">
                                <span className="sr-only">Loading...</span> </div> :

                                <Col>
                                    {this.state.userGroups.map((group) => {
                                        return (
                                            <div className="groupBlock" key={group.id}>
                                                <div className="flexColumn">
                                                    <div className="groupImgHolder">
                                                        <img src={group.image} alt="group image" name="groupImg" className="groupImg" />
                                                        <div className="groupName">{group.name}</div>
                                                    </div>
                                                    <div className="groupFoot">
                                                        <div className="groupDetails flexRow evenSpace">
                                                            <div>
                                                                <label className="stamp">DISTANCE</label>
                                                                <span className="detail">{parseInt(group.distance)} miles</span>
                                                            </div>
                                                            <div>
                                                                <label className="stamp">Members</label>
                                                                <span className="detail">{group.numMembers}</span>
                                                            </div>
                                                            {/* <div>
                                                            <label className="stamp">ARTICLES</label>
                                                            <span className="detail">66</span>
                                                        </div> */}
                                                        </div>
                                                        <div className="haCenter">
                                                            <Link to={{pathname:`/groupevents/${group.id}`, groupName:group.name}} className="grpDetailBtn btn-fill-blue">Event</Link>
                                                            <Link to={`/aboutgroups/${group.id}`} className="grpDetailBtn btn-fill-blue">News</Link>
                                                            <Link to={`/groupforum/${group.id}`} className="grpDetailBtn btn-fill-blue">Chat</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Col>}

                        </Row>

                    </If>

                    <div className="secHeader flexRow evenSpace">
                        <div className="secTitle">
                            <label className="secNameGroup">Suggested Communities</label><br />
                            <label className="secDescGroup">Here are some Communities, you can join.</label>
                        </div>
                    </div>

                    <Row className="homeArticles">
                        {this.state.fetching ? <div className="spinner-grow text-primary" style={{ "width": "3rem", "height": "3rem" }} role="status">
                            <span className="sr-only">Loading...</span> </div> :
                            <Col className="three-card-column">
                                {this.state.groups.map((group) => {
                                    return (
                                        <div className="groupBlock" key={group.id}>
                                            <div className="group_link">
                                                <div className="flexColumn">
                                                    <div className="groupImgHolder">
                                                        <img src={group.image} alt="group image" name="groupImg" className="groupImg" />
                                                        <div className="groupName">{group.name}</div>
                                                    </div>
                                                    <div className="groupFoot">
                                                        <div className="groupDetails flexRow evenSpace">
                                                            <div>
                                                                <label className="stamp">DISTANCE</label>
                                                                <span className="detail">{parseInt(group.distance)} miles</span>
                                                            </div>
                                                            <div>
                                                                <label className="stamp">Members</label>
                                                                <span className="detail">{group.numMembers}</span>
                                                            </div>
                                                            {/* <div>
                                                            <label className="stamp">ARTICLES</label>
                                                            <span className="detail">66</span>
                                                        </div> */}
                                                        </div>
                                                        <div className="haCenter">
                                                            <Link to={`/aboutgroups/${group.id}`} className="grpDetailBtn btn-fill-blue">Join</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Col>}
                    </Row>
                    <Row>
                        <div className="haCenter">
                            <button type="button" className="upBtn" onClick={(e) => this.scrollup(e)}><i className="fa fa-angle-up" aria-hidden=""></i></button>
                        </div>
                    </Row>

                </Container>
                <Footer />
            </Fragment>
        )
    }
}


function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let isLoggedIn = state.Authentication.loggedIn;
    return {
        currentUrl,
        isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        groupActions: bindActionCreators(GroupActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);