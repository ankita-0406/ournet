import React, { Fragment } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import * as UserActions from '../../actions/adminActions';
import swal from 'sweetalert';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import AdminHeader from './adminHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class ScoreParameter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            authorScoreNumViewsWeight: '',
            authorScoreAvgRatingWeight: '',
            articleScoreNumViewsWeight: '',
            articleScoreNumCommentsWeight: '',
            articleScoreRatingsWeight: '',
            articleScoreAuthorAgedScoreWeight: '',
            articleScoreArticleAgeWeight: '',
            date: '',
            loading: true,
        }
    }
    componentDidMount() {
        this.props.userActions.getScore().then((resp) => {
            this.setState({

                authorScoreNumViewsWeight : resp[0].authorScoreNumViewsWeight,
                authorScoreAvgRatingWeight : resp[0].authorScoreAvgRatingWeight,
                articleScoreNumViewsWeight : resp[0].articleScoreNumViewsWeight,
                articleScoreNumCommentsWeight : resp[0].articleScoreNumCommentsWeight,
                articleScoreRatingsWeight : resp[0].articleScoreRatingsWeight,
                articleScoreAuthorAgedScoreWeight : resp[0].articleScoreAuthorAgedScoreWeight,
                articleScoreArticleAgeWeight : resp[0].articleScoreArticleAgeWeight,
                date: resp[0].date,
            });
            console.log(resp);
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    onSave = () => {
        let data = {
            authorScoreNumViewsWeight: this.state.authorScoreNumViewsWeight,
            authorScoreAvgRatingWeight: this.state.authorScoreAvgRatingWeight,
            articleScoreNumViewsWeight: this.state.articleScoreNumViewsWeight,
            articleScoreNumCommentsWeight: this.state.articleScoreNumCommentsWeight,
            articleScoreRatingsWeight: this.state.articleScoreRatingsWeight,
            articleScoreAuthorAgedScoreWeight: this.state.articleScoreAuthorAgedScoreWeight,
            articleScoreArticleAgeWeight: this.state.articleScoreArticleAgeWeight,
        }
        this.props.userActions.setScore(data).then(() => {
            swal({
                title: "Score algorithm updated",
                icon: 'success',
                timer: 1000
            })
        })
    }


    render() {
        return (
            <Fragment>
                <Header />
                <AdminHeader currentUrl={this.props.currentUrl} />
                <Container>
                    <div className="page-title-admin"><h1>Score Parameters</h1></div>
                    <h3>Author Score Calculation Logic </h3>

                    <table className="table table-striped table-bordered table-hover text-16">
                        <tbody>
                            <tr>
                                <td className="text-right" width="60%">Author Reputation Score = (Sum ( numViews * Author Num Views Weight =</td>
                                <td className="text-center" width="20%"><input id="authorScoreNumViewsWeight" type="text" onChange={this.onChange} placeholder={this.state.authorScoreNumViewsWeight} className="form-control" /></td>
                                <td className="text-left" width="20%"> * Avg Rating * </td>
                            </tr>
                            <tr>
                                <td className="text-right">authororAvgRatingWeight =</td>
                                <td className="text-center"><input type="text" id="authorScoreAvgRatingWeight" onChange={this.onChange} placeholder={this.state.authorScoreAvgRatingWeight} className="form-control" /></td>
                                <td className="text-left"> ) / (Num Articles)</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Article Score Calculation Logic </h3>
                    <table className="table table-striped table-bordered table-hover text-16">
                        <tbody>
                            <tr>
                                <td className="text-right" width="60%">Article Score = ((Article Views * articleScoreNumViewsWeight =</td>
                                <td className="text-center" width="20%"><input id="articleScoreNumViewsWeight" type="text" onChange={this.onChange} placeholder={this.state.articleScoreNumViewsWeight} className="form-control" /></td>
                                <td className="text-left" width="20%">) + </td>
                            </tr>
                            <tr>
                                <td className="text-right">(Article Comments * articleScoreNumCommentsWeight =</td>
                                <td className="text-center"><input id="articleScoreNumCommentsWeight" type="text" onChange={this.onChange} placeholder={this.state.articleScoreNumCommentsWeight} className="form-control" /></td>
                                <td className="text-left">) +</td>
                            </tr>
                            <tr>
                                <td className="text-right">(Avg. Rating * Number of Ratings * articleScoreRatingWeight = </td>
                                <td className="text-center"><input id="articleScoreRatingsWeight" type="text" onChange={this.onChange} className="form-control" placeholder={this.state.articleScoreRatingsWeight} /></td>
                                <td className="text-left">) + </td>
                            </tr>
                            <tr>
                                <td className="text-right">(Authors Reputation Score * log(Number of Days Published) * articleScoreAuthorAgedScoreWeight =</td>
                                <td className="text-center"><input id="articleScoreAuthorAgedScoreWeight" type="text" onChange={this.onChange} placeholder={this.state.articleScoreAuthorAgedScoreWeight} className="form-control" /></td>
                                <td className="text-left">) +</td>
                            </tr>
                            <tr>
                                <td className="text-right">) / (Number of Days Published + articleScoreArticleAgeWeight =</td>
                                <td className="text-center"><input id="articleScoreArticleAgeWeight" type="text" onChange={this.onChange} placeholder={this.state.articleScoreArticleAgeWeight} className="form-control" /></td>
                                <td className="text-left">) +</td>
                            </tr>
                        </tbody>
                    </table>
                    <Row>
                        <Col md={12} sm={12}>
                            <button type="button" className={this.state.loading ? "grpDetailBtn rating-loading btn-fill-blue" : "loadmoreBtn"} value={this.state.loadsize} onClick={this.onSave}>Save Changes</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScoreParameter);