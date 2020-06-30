import React, { Component } from 'react';
import * as PopActions from '../actions/loginActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../style/component/Confirmation.css';

const PROGRESS_CONFIRMATION = 'Confirmation is in progress'
const SUCCESS_CONFIRMATION = 'Confirmation has succeeded. Please Sign In'
const FAILED_CONFIRMATION = 'Your registration code was not found. Please register again or contact our support.';

class Confirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmation: PROGRESS_CONFIRMATION,
            success: false
        }
    }

    componentDidMount() {
        this.props.popActions.ConfirmRegistration(this.props.confirmation_code).then((resp) => {
            this.setState({ confirmation: SUCCESS_CONFIRMATION });
            const { history } = this.props
            history.push("/login");
        }).catch((err) => {
            this.setState({ confirmation: FAILED_CONFIRMATION });
        })
    }

    render() {
        return (
            <div className="confirmNew">
                <div className="confirmOuter flexRow vaCenter haCenter">
                    <div className="confirmloginBox">
                        <div className="logoHolder flexRow  vaCenter haCenter">
                            <img src="../../img/images/logoB.png" alt="onlogo" name="logo" width="100" height="100" />
                        </div>
                        <div className="loginForm">
                            <h2 className="confirmTitle">{this.state.confirmation}</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    let confirmation_code = props.match.params.confirmation_code;
    return {
        confirmation_code
    };
}

function mapDispatchToProps(dispatch) {
    return {
        popActions: bindActionCreators(PopActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);