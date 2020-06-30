import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import '../../style/component/Classified.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Classified extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Header currentUrl={this.props.currentUrl}/>
                <div className="section">
                    <div className="secHeader flexRow evenSpace">
                        <div className="secTitle">
                            <label className="secName">Classified</label><br />
                            <label className="secDesc">Selected ads, just for you</label>
                        </div>
                        <div className="adSearchBox">
                            <input type="text" name="searchfield" className="adSearchField" placeholder="Quick ad search" />
                            <div className="searchIcon"><i className="fa fa-search"></i></div>
                        </div>
                    </div>
                    <div className="classifiedSec">
                        <div className="adBlock adBlock1">
                            heelp
                            <img src="img/images/elders.jpg" className="adImg" />
                            <div className="adDesc">
                                <label className="adtitle">AdBlock: Square</label><br />
                                <label className="adSize">160x160px</label>
                            </div>
                        </div>
                        <div className="adBlock adBlock2">
                            <img src="img/images/elders.jpg" alt="ad block(160x160)" name="adImg" className="adImg" />
                            <div className="adDesc">
                                <label className="adtitle">AdBlock: Square</label><br />
                                <label className="adSize">160x160px</label>
                            </div>
                        </div>
                        <div className="adBlock adBlock3">
                            <img src="img/images/elders.jpg" alt="ad block(320x160)" name="adImg" className="adImg" />
                            <div className="adDesc">
                                <label className="adtitle">Ad Block: Double Square (Horizontal)</label><br />
                                <label className="adSize">320x160px</label>
                            </div>
                        </div>
                        <div className="adBlock adBlock4">
                            <img src="img/images/elders.jpg" alt="ad block(160x320)" name="adImg" className="adImg" />
                            <div className="adDesc">
                                <label className="adtitle">Ad Block: Double Square (Vertical)</label><br />
                                <label className="adSize">160x320px</label>
                            </div>
                        </div>
                        <div className="adBlock adBlock5">
                            <img src="img/images/elders.jpg" alt="ad block(320x320)" name="adImg" className="adImg" />
                            <div className="adDesc">
                                <label className="adtitle">Ad Block: Quadruple Square</label><br />
                                <label className="adSize">320x320px</label>
                            </div>
                        </div>
                        <div className="adBlock adBlock6">
                            <img src="img/images/elders.jpg" alt="ad block(160x160)" name="adImg" className="adImg" />
                            <div className="adDesc">
                                <label className="adtitle">AdBlock: Square</label><br />
                                <label className="adSize">160x160px</label>
                            </div>
                        </div>
                        <div className="adBlock adBlock7">
                            <img src="img/images/elders.jpg" alt="ad block(160x160)" name="adImg" className="adImg" />
                            <div className="adDesc">
                                <label className="adtitle">AdBlock: Square</label><br />
                                <label className="adSize">160x160px</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="haCenter">
                    <button type="button" className="upBtn"><i className="fa fa-angle-up" aria-hidden=""></i></button>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}
function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : ""

    return {
        currentUrl
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Classified);