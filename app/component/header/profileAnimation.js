import React from "react";
import "./profileAnimation.css";
import $ from "jquery";
import { Link } from "react-router-dom";


class profileAnimation extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(document).ready(function (ev) {
            var toggle = $("#ss_toggle");
            var menu = $("#ss_menu");
            var rot;
            

            $("#ss_toggle").on("click", function (ev) {
                rot = parseInt($(this).data("rot")) - 180;
                menu.css("transform", "rotate(" + rot + "deg)");
                menu.css("webkitTransform", "rotate(" + rot + "deg)");
                if ((rot / 180) % 2 === 0) {
                    //Moving in
                    toggle.parent().addClass("ss_active");
                    toggle.addClass("close");
                } else {
                    //Moving Out
                    toggle.parent().removeClass("ss_active");
                    toggle.removeClass("close");
                }
                $(this).data("rot", rot);
            });

            menu.on("transitionend webkitTransitionEnd oTransitionEnd", function () {
                if ((rot / 180) % 2 === 0) {
                    $("#ss_menu div i span").addClass("ss_animate");
                } else {
                    $("#ss_menu div i span").removeClass("ss_animate");
                }
            });
        });
        console.log(this.props.icon);
    };

    render() {
        return (
            <div>
                <div id="ss_menu">
                    <div>
                        <Link to="/tags">
                            <span
                                className="menuIcon"
                                style={{ filter: "invert(1)" }}
                            >
                                <img src="../img/icons/icon_Tags.svg" style={{ transform: 'rotate(90deg)' }} />
                            </span>
                            
                        </Link>
                    </div>
                    <div>
                        <Link to="/myarticle">
                            <span className="menuIcon" style={{ filter: 'invert(1)' }}>
                                <img src="../img/icons/icon_MyArticles.svg" style={{ transform: 'rotate(90deg)' }} />
                            </span>
                        </Link>
                    </div>
                    <div>
                        <Link to="/location">
                            <span
                                className="menuIcon"
                                style={{ filter: "invert(1)" }}
                            >
                                <img src="../img/icons/icon_Location.svg" style={{ transform: 'rotate(90deg)' }} />
                            </span>
                        </Link>
                    </div>
                                 
                    <div>
                        <Link to="/myprofile">
                            <span className="menuIcon" style={{ filter: 'invert(1)' }}>
                                <img src="../img/icons/icon_UserProfile.svg" style={{ transform: 'rotate(90deg)' }} />
                            </span>
                        </Link>
                    </div>
                    <div className="menu">
                        <div className="share" id="ss_toggle" data-rot="90">
                            <span className="menuIcon" style={{ filter: 'invert(1)' }}>
                                <img src={"../", this.props.icon} style={{ transform: 'rotate(180deg) !important' }} />
                            </span>
                        </div>
                    </div>
                    
                </div>

            </div>
        );
    }
}

export default profileAnimation;
