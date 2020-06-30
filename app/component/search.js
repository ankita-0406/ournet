import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import '../../style/component/search.css';
import * as PopActions from '../actions/searchActions';
import { Container } from "react-bootstrap";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from './Header';
import Footer from './Footer';
import moment from "moment";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
            pageSize: 15,
            articles: [],
            groups: []
        }
    }

    getArticles = (filter) => {
        this.props.popActions.getArticles(this.state.pageIndex, this.state.pageSize, filter ).then((resp) => {
            this.setState({
                articles: resp
            });
        })
    }
    getGroups = (filter) => {
        this.props.popActions.getGroups(this.state.pageIndex, this.state.pageSize, filter ).then((resp) => {
            this.setState({
                groups: resp
            });
        })
    }

    componentWillReceiveProps(newProps) {
        this.getArticles(newProps.text);
        this.getGroups(newProps.text);
    }

    componentDidMount() {
        this.getArticles(this.props.text);
        this.getGroups(this.props.text);
        
    }

    render() {
        return (
            <Fragment>
                {/* <Header currentUrl={this.props.currentUrl}/> */}
                <Container>
                    <div className="d-flex pt-5 justify-content-between align-items-end">
                        <div className="secTitle">
                            <label className="secDesc">Results for</label><br />
                            <label className="secName">“{this.props.text}”</label>
                        </div>
                    </div>
                    <div className="srchResultSec d-block d-md-flex evenSpace">
                        <div className="srchResultBlock">
                            <label className="boxTitle">Results ON FEED</label>
                            <div className="flexColumn">
                                {this.state.articles.map((article) => {
                                    return (
                                        <div className="srchResult" key={article.id}>
                                            <Link to={`/article/${article.slug}`}>
                                                <label className="srchResult_Title">{article.title}</label>
                                            </Link>
                                            <div className="flexRow evenSpace">
                                                <span className="writer">{article.author.username}</span>
                                                <span className="date">{moment(article.date).format("MMM D, YYYY")}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                                <button type="button" className="srchResultBtn">REFINE SEARCH</button>
                            </div>
                        </div>

                        <div className="srchResultBlock">
                            <label className="boxTitle">Results ON 
                            COMMUNITIES</label>
                            <div className="flexColumn">
                                {this.state.groups.map((group) => {
                                    return (
                                        <div className="srchResult" key={group.id}>
                                            <Link to={`/aboutgroups/${group.id}`}>
                                                <label className="srchResult_Title">{group.name}</label>
                                            </Link>
                                            <div className="flexRow evenSpace">
                                                <span className="writer">{group.owner.username}</span>
                                                <span className="date">{moment(group.createdDate).format("MMM Do YY")}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                                <button type="button" className="srchResultBtn">LOAD MORE ARTICLES</button>
                            </div>
                        </div>
                    </div>
                </Container>
                <Footer />
            </Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let text = ownProps.match.params.text;

    return {
        currentUrl,
        text
    };
}

function mapDispatchToProps(dispatch) {
    return {
        popActions: bindActionCreators(PopActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);