import React, { Component, Fragment } from 'react';
import '../../style/component/Confirmation.css';

class Confirmation extends Component {
    render() {
        return (
            <div className="confirmNew">
                <div className="confirmOuter flexRow vaCenter haCenter">
                    <div className="confirmloginBox">
                        <div className="logoHolder flexRow  vaCenter haCenter">
                            <img src="../../img/images/logoB.png" alt="onlogo" name="logo" width="100" height="100" />
                        </div>
                        <div className="loginForm">
                            <h2 className="confirmTitle">Please check your email<br /><br />
                                <span>A confirmation link has been sent to your email. Please confirm within the next 48 hours</span></h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Confirmation;