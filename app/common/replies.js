import React from 'react';
import moment from "moment";
import * as ForumActions from '../actions/forumActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Replies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            replies: this.props.replies,
            replyIndex: [],
            reply: "",
            level1: [],
            level2: [],
            level3: []
        }
    }

    componentDidMount() {
        let level1 = [];
        let level2 = [];
        let level3 = [];

        this.props.replies.forEach((elem, index) => {
            level1[index] = 0;
            elem.replies.forEach((elem, index) => {
                level2[index] = 0
                elem.replies.forEach((elem, index) => {
                    level3[index] = 0
                })
            })

        });

        this.setState({
            replies: this.props.replies,
            level1,
            level2,
            level3
        })

    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.replies.length != this.props.replies) {
            console.log("replies in replies", nextProps.replies)

            this.setState({
                replies: nextProps.replies
            })

        }

    }

    onBlurReply = (index, value) => {

        setTimeout(() => {
            // let arr = this.state.replyIndex;
            // arr[index] = 0;
            let arr = this.state[`level${value}`];
            for (let i = 0; i < arr.length; i++) {
                arr[i] = 0
            }

            this.setState({
                [`level${value}`]: arr,
                reply: ""
            })
        }, 100);


    }

    onReply = (index, value) => {

        let arr = this.state[`level${value}`];
        arr[index] = 1;
        this.setState({
            [`level${value}`]: arr
        })
    }

    postReply = (id , index , value)=>{
        if (this.state.reply != "") {
            const data = {
                communityTopicId: this.props.forum,
                text: this.state.reply,
                parentCommentId: id
            }
            let arr = this.state[`level${value}`];
            arr[index] = 0;


            this.props.forumActions.PostReply(data).then((resp) => {
                this.props.reloadProp();
                this.setState({
                    reply: "",
                    [`level${value}`]: arr

                });

            })

        }

    }


    postReplyEnter = (e, id, index, value) => {
        if (e.key === "Enter") {
            if (this.state.reply != "") {
                const data = {
                    communityTopicId: this.props.forum,
                    text: this.state.reply,
                    parentCommentId: id
                }
                let arr = this.state[`level${value}`];
                arr[index] = 0;


                this.props.forumActions.PostReply(data).then((resp) => {
                    this.props.reloadProp();
                    this.setState({
                        reply: "",
                        [`level${value}`]: arr

                    });

                })

            }
        }


    }

    render() {

        return (
            <div>
                {this.state.replies.length != 0 && this.state.replies.slice(0).reverse().map((reply, index) => (
                    <div className="flexColumn">
                        <div className="topicDesc flexRow sideShift">
                            <div className="topicProfileImgReply"><img alt="" src={reply.author.avatar} />
                            </div>


                            <div className="topicContentWrap">

                                <p className="topicAuthorDesc"><span><a href="#">{reply.author.username}</a></span> {moment(reply.date).format("MMM D,  hh:mm")} </p>
                                <p className="topicDetails">{reply.text}</p>

                            </div>


                            <div className="commentReplyMultiple" onClick={() => this.onReply(index, 1)}>
                                <p>Reply</p>

                            </div>



                        </div>
                        {this.state.level1[index] == 1 &&
                            <div onBlur={() => this.onBlurReply(index, 1)} className="topicContentWrapIn replyMargin">

                                <input type="text" placeholder="Reply" className="form-control fullInput" onKeyDown={(e) => { this.postReplyEnter(e, reply.id, index, 1) }} onChange={(e) => this.setState({ reply: e.target.value })} value={this.state.reply}></input>

                                <span className="replySend" type="button" onClick={() => { this.postReply(reply.id ,index , 1) }} ><i className="fa fa-paper-plane" aria-hidden="true"></i></span>


                            </div>}



                        {reply.replies.map((reply, index) => (
                            <div>
                                <div className="topicDesc flexRow sideShift2">
                                    <div className="topicProfileImgReply"><img alt="" src={reply.author.avatar} />
                                    </div>
                                    <div className="topicContentWrap">

                                        <p className="topicAuthorDesc"><span><a href="#">{reply.author.username}</a></span> {moment(reply.date).format("MMM D,  hh:mm")} </p>
                                        <p className="topicDetails">{reply.text}</p>

                                    </div>

                                    <div className="commentReplyMultiple" onClick={() => this.onReply(index, 2)}>
                                        <p>Reply</p>

                                    </div>
                                </div>

                                {this.state.level2[index] == 1 &&
                                    <div onBlur={() => this.onBlurReply(index, 2)} className="topicContentWrapIn replyMargin">

                                        <input type="text" placeholder="Reply" className="form-control fullInput2" onKeyDown={(e) => { this.postReplyEnter(e, reply.id, index, 2) }} onChange={(e) => this.setState({ reply: e.target.value })} value={this.state.reply}></input>

                                        <span className="replySend" type="button" onClick={() => { this.postReply(reply.id ,index , 2) }} ><i className="fa fa-paper-plane" aria-hidden="true"></i></span>


                                    </div>}

                                {reply.replies.map((reply, index) => (
                                    <div>
                                        <div className="topicDesc flexRow sideShift3">
                                            <div className="topicProfileImgReply"><img alt="" src={reply.author.avatar} />
                                            </div>
                                            <div className="topicContentWrap">

                                                <p className="topicAuthorDesc"><span><a href="#">{reply.author.username}</a></span> {moment(reply.date).format("MMM D,  hh:mm")} </p>
                                                <p className="topicDetails">{reply.text}</p>

                                            </div>

                                            <div className="commentReplyMultiple" onClick={() => this.onReply(index, 3)}>
                                                <p>Reply</p>

                                            </div>
                                        </div>

                                        {this.state.level3[index] == 1 &&
                                            <div onBlur={() => this.onBlurReply(index, 3)} className="topicContentWrapIn replyMargin">

                                                <input type="text" placeholder="Reply" className="form-control fullInput3" onKeyDown={(e) => { this.postReplyEnter(e, reply.id, index, 3) }} onChange={(e) => this.setState({ reply: e.target.value })} value={this.state.reply}></input>

                                                <span className="replySend" type="button" onClick={() => { this.postReply(reply.id ,index , 3) }} ><i className="fa fa-paper-plane" aria-hidden="true"></i></span>


                                            </div>}


                                        {reply.replies.map((reply, index) => (
                                            <div className="topicDesc flexRow sideShift4">
                                                <div className="topicProfileImgReply"><img alt="" src={reply.author.avatar} />
                                                </div>
                                                <div className="topicContentWrap">

                                                    <p className="topicAuthorDesc"><span><a href="#">{reply.author.username}</a></span> {moment(reply.date).format("MMM D,  hh:mm")} </p>
                                                    <p className="topicDetails">{reply.text}</p>

                                                </div>
                                            </div>
                                        ))}




                                    </div>))}

                            </div>






                        ))}










                    </div>


                ))
                }
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let forum = ownProps.communityId;
    let testForum = state.MyProfile
    let currentforum = state.Forum.forums.find(x => x.id == forum) || {};

    return {
        currentUrl,
        forum,
        currentforum,
        testForum
    };
}

function mapDispatchToProps(dispatch) {
    return {
        forumActions: bindActionCreators(ForumActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Replies);