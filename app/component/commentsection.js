import React, { Component, Fragment } from 'react';
import * as ForumActions from '../actions/forumActions';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from "moment";
import { Container } from 'react-bootstrap';
import Header from "./Header";
import Footer from "./Footer";
import Replies from "../common/replies"
import Meta from '../common/Meta';

class commentsection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thread: [],
            pageIndex: 0,
            pageSize: 15,
            comment: "",
            replyIndex: [],
            replies: [],
            reply: ""
        }
    }

    componentWillMount() {
        console.log("forumsssss....", this.props.testForum)
        this.getComments();
    }

    getComments = () => {
        console.log("initiated prop")
        this.props.forumActions.GetThread(this.props.forum, this.state.pageIndex, this.state.pageSize).then((resp) => {
            console.log("all thread", resp.comments)

            let arr = [];
            resp.comments.forEach(element => {
                arr.push(element.replies)


            });
            this.setState({
                thread: resp.comments,
                replies: arr
            })

        })
    }

    onChangeItems = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    back = () => {
        this.props.history.goBack();
    }

    onSave = () => {
        const data = {
            communityTopicId: this.props.forum,
            text: this.state.comment
        }
        this.props.forumActions.PostThread(data).then((resp) => {
            this.getComments();
            this.setState({ comment: "" })
        })
    }
    onEnterSave = (e) => {
        if (e.key === "Enter") {
            const data = {
                communityTopicId: this.props.forum,
                text: this.state.comment
            }
            this.props.forumActions.PostThread(data).then((resp) => {
                this.getComments();
                this.setState({ comment: "" })
            })
        }
    }
    onReply = (index) => {
        let arr = this.state.replyIndex;
        for (let i = 0; i < this.state.thread.length; i++) {
            arr[i] = 0
        }
        arr[index] = 1;
        this.setState({
            replyIndex: arr,
            reply: ""
        })
    }
    onBlurReply = (index) => {

        setTimeout(() => {
            // let arr = this.state.replyIndex;
            // arr[index] = 0;
            let arr = this.state.replyIndex;
            for (let i = 0; i < this.state.thread.length; i++) {
                arr[i] = 0
            }

            this.setState({
                replyIndex: arr,
                reply: ""
            })
        }, 100);


    }

    replyToThread = (e, index) => {
        if (e.key === "Enter") {
            if (this.state.reply != "") {
                let replies = this.state.replies;
                replies[index] = {
                    name: "ABCD",
                    text: this.state.reply
                }
                let replyIndex = this.state.replyIndex;
                replyIndex[index] = 0;

                this.setState({
                    replies: replies,
                    reply: "",
                    replyIndex: replyIndex
                })


            }
        }

    }

    onClickReply = (index) => {
        if (this.state.reply != "") {
            let replies = this.state.replies;
            replies[index] = {
                name: "some random name",
                text: this.state.reply
            }



            this.setState({
                replies: replies,
                reply: "",

            })


        }

    }

    postReply = (index) => {
        if (this.state.reply != "") {
            const data = {
                communityTopicId: this.props.forum,
                text: this.state.reply,
                parentCommentId: this.state.thread[index].id
            }
            let replyIndex = this.state.replyIndex;
            replyIndex[index] = 0;

            this.props.forumActions.PostReply(data).then((resp) => {
                // this.getComments()
                let replies = this.state.replies;
                replies[index].unshift(resp)


                this.setState({
                    reply: "",
                    replyIndex
                });
            })

        }


    }


    postReplyEnter = (e, index) => {
        if (e.key === "Enter") {
            if (this.state.reply != "") {
                const data = {
                    communityTopicId: this.props.forum,
                    text: this.state.reply,
                    parentCommentId: this.state.thread[index].id
                }
                let replyIndex = this.state.replyIndex;
                replyIndex[index] = 0;

                this.props.forumActions.PostReply(data).then((resp) => {
                    // this.getComments()
                    let replies = this.state.replies;
                    replies[index].unshift(resp)


                    this.setState({
                        reply: "",
                        replyIndex
                    });
                })

            }
        }


    }


    render() {
        return (
            <Fragment>
                <Meta title={this.props.currentforum.title} />
                <Header currentUrl={this.props.currentUrl} isGroup = {this.props.location.group ? true : false}/>
                <Container>
                <div class="row">
                <div className="rightcolumn">
                    
                    <div className="secHeader flexRow evenSpace">
                        <div className="secTitle">
                            <label className={this.props.location.group?"secNameG" : "secName"}>Thread<span className={this.props.location.group?"secDescG" : "secDesc"}> details</span></label>
                        </div>
                        <div><button type="button" className="eventHeaderBtn" onClick={this.back}>BACK TO TOPIC</button></div>
                    </div>
                    <div>&nbsp;</div>
                    <div className="topicBlock">
                        <div className="flexRow">
                            <div className="topicBox flexColumn evenSpace">
                                <div className="topicDesc flexRow">
                                    <div className="topicProfileImg"><img alt="" src={this.props.currentforum.author && this.props.currentforum.author.avatar} />
                                    </div>
                                    <div className="topicContentWrap">
                                        <p className="topicAuthorDesc"><span>{this.props.currentforum.author && this.props.currentforum.author.firstName}  {this.props.currentforum.author && this.props.currentforum.author.lastName} </span> {moment(this.props.currentforum.date).format("MMM D, YYYY   HH:mm")}</p>
                                        <p className="topicDetails">{this.props.currentforum.title}</p>
                                        <div className="comment-desc-box">{this.props.currentforum.description}</div>
                                        <div className="topicContentWrapIn">

                                            <TextareaAutosize
                                                className="comment-textarea"
                                                minRows={2}
                                                maxRows={6}
                                                id="comment"
                                                placeholder="Your Comment..."
                                                value={this.state.comment}
                                                onChange={this.onChangeItems}
                                                onKeyDown={(e) => { this.onEnterSave(e) }}
                                            />
                                            <button onClick={this.onSave} className="send-btn btn-article">Send</button>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="comment-desc-box">{this.props.currentforum.description}</div> */}

                            </div>
                        </div>
                    </div>
                    {this.state.thread.map((comment, index) => {
                        return (
                            <div className="topicBlock" key={comment.id}>
                                <div className="flexRow">
                                    <div className="topicBox flexColumn evenSpace comment-row-bdr threadLevel" >
                                        <div className="topicDesc flexRow">
                                            <div className="topicProfileImg"><img alt="" src={comment.author.avatar} />
                                            </div>
                                            <div className="topicContentWrap">

                                                <p className="topicAuthorDesc"><span><a href="#">{comment.author.username}</a></span> {moment(comment.date).format("MMM D,  hh:mm")} </p>
                                                <p className="topicDetails">{comment.text}</p>

                                            </div>


                                        </div>
                                        <Replies replies={this.state.replies[index]} communityId={this.props.forum} reloadProp = {()=>this.getComments()} />
                                        {this.state.replyIndex[index] == 1 &&
                                            <div onBlur={() => this.onBlurReply(index)} className="topicContentWrapIn replyMargin">

                                                <input type="text" placeholder="Reply" className="form-control fullInput" onKeyDown={(e) => { this.postReplyEnter(e, index) }} onChange={(e) => this.setState({ reply: e.target.value })} value={this.state.reply}></input>

                                                <span className="replySend" type="button" onClick={() => { this.postReply(index) }} ><i className="fa fa-paper-plane" aria-hidden="true"></i></span>
      

                                            </div>}

                                        <div className="commentReply" onClick={() => this.onReply(index)}>
                                             <p>Reply</p>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        )
                    })}
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
    let forum = ownProps.match.params.id;
    let testForum = state.MyProfile
    let currentforum = state.Forum.forums.find(x => x.id == forum) || {};


    console.log("cpmment" , ownProps)

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
export default connect(mapStateToProps, mapDispatchToProps)(commentsection);
