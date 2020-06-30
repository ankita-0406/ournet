import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "./Header";
import Footer from "./Footer";
import Rating from "react-rating";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import * as PopActions from "../actions/popularArticleActions";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "../../style/component/Common.css";
import "../../style/component/Article.css";
import { RICH_DECORATOR } from "./richeditor/RichDecorator";
import { Editor, ContentState, EditorState, convertFromRaw } from "draft-js";
import styled from "styled-components";
import Meta from "../common/Meta";

const BannerSec = styled.div`
  position: relative;
  background: #eee;
`;

const ArticleActions = styled.div`
  margin-top: 15px;
  align-items: center;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`;

const BannerImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  height: 327px;
  border-radius: 10px 10px 0px 0px;
  background: #fff;
  @media only screen and (max-width: 480px) {
    max-width: 100%;
  }
`;

const ArticleFootDescriber = styled.div`
  padding: 15px;
  background: #fff;
  border-radius: 0px 0px 10px 10px;

  background: #edf2f8 !important;
  max-width: 470px;
  border-radius: 10px !important;
  position: absolute;
  bottom: -52px;
  left: 143px;
  min-width: 280px;

  @media only screen and (max-width: 480px) {
    /* .describer { */
      /* max-width: 94%; */
      left: 20px;
      /* min-width: 94%; */
    /* } */
  }
`;

const ArticleDesc = styled.div`
  /* -------------------- */
`;

const ArticleTitle = styled.div`
  font: bold 30px/30px Lato;
`;
const AuthorNameLabel = styled.label`
  font: Bold 13px/14px Lato;
  letter-spacing: 0;
  color: #024b99;
  a {
    color: #024b99;
  }

  a:hover {
    color: #4fbfae;
  }
`;

const DateLabel = styled.label`
  font: Bold 13px/14px Lato;
  letter-spacing: 0;
  color: #024b99;
`;

const FullArticle = styled.div`
  background: #fff;
  padding: 130px 143px 50px 143px;
  @media only screen and (max-width: 480px) {
    padding: 80px 15px;
  }
`;

const ArticleIntroP = styled.h1`
  font: bold 20px/20px Lato;
  letter-spacing: 0;
  color: black;
  padding: 5px 0px 25px 0px;
  margin-top: 5px;
`;

const FlexRowEvenSpaceFullArticleFooter = styled.div`
  margin-top: 105px;
  margin-bottom: 55px;

  display: flex;
  flex-flow: row;

  justify-content: space-between;
`;

const AuthorDiv = styled.div`
  flex: 1;
`;

const RatingDiv = styled.div`

@media only screen and (max-width: 480px) {

  margin-left: -250px;
    margin-top: 100px;
}

`;

const PopularTitle = styled.label`
  color: #024b99;
  font-size: 20px;
  margin-left: 20px;
`;

// const ratingSecRatingStar = styled.div`
// margin: 20px;

// `;

const Stars = styled.span`
  color: #4fbfae;
  font-size: 30px;
  margin-right: 5px;
`;
const ReportInappropriate = styled.div`
  margin-top: 25px;
  text-align: right;
  @media only screen and (max-width: 480px) {
    margin: 15px auto 40px 20px;
    text-align: left;
  }
`;

const Span = styled.span`
  color: #e85c3e !important;
  cursor: pointer;
`;

const TopicBlock = styled.div`
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid-column;
  display: table;
  width: calc(100% - 40px);
  margin: 0px 20px -1px 20px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #eeeeee;
`;

const FlexRow = styled.div`
  display: flex;
  flex-flow: row;
`;

const TopicBox = styled.div`
  padding: 12px;
  background: #fff;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
`;

const TopicDesc = styled.div`
  display: flex;
  flex-flow: row;
`;

const TopicContentWrap = styled.div`
  width: calc(100% - 60px);
`;

const TopicAuthorDesc = styled.p`
  font: 500 14px/24px Lato;
  color: #777777;
`;

const TopicDetails = styled.p`
  font: 500 15px/22px Lato;
  color: #000000;
  margin-bottom: 4px !important;
`;

const CommentReply = styled.div`
  position: relative;
  left: 90%;
  top: 1rem;
`;

const Paragrph = styled.p`
  cursor: pointer;
`;

const TopicContentWrapIn = styled.div`
  display: flex;
  margin-top: 1rem;
  opacity: 1;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 80%;
  height: 35px;
  margin-left: 15%;
  font-size: 14px;
  font-family: "Lato", sans-serif;
`;

const ReplySend = styled.span`
  background-color: rgba(255, 255, 255, 0);
  color: rgb(19, 94, 206);
  font-size: large;
  width: 3rem;
  text-align: center;
`;

const ReleatedpostBox = styled.div`
  padding: 50px 143px 50px 143px;

  @media only screen and (max-width: 480px) {
    padding: 50px 10px 50px 10px;
  }
`;
// const PopularArticles = styled.label`
//      display: grid;
//     grid-gap: 15px;
//     grid-template-columns: repeat(auto-fill, minmax(320px,1fr));
//     grid-auto-rows: 0px;
//     margin: auto;
//     max-width: 1170px;
//     @media only screen and (max-width: 480px) {
//         grid-gap: 17px;
//     grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
//     grid-auto-rows: 2px;
//     }
// `;

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedArticles: [],
      article: {},
      comment: [],
      text: "",
      value: 0,
      dimg: "../../img/design.png",
      replyIndex: [],
      highLoaded: false,
      reloading: false
    };
    this.clickFunc = this.clickFunc.bind(this);
  }

  componentDidMount() {
    if (!this.props.currentarticle) {
      this.props.popActions.getArticlebySlug(this.props.slugId).then((resp) => {
        console.log("slugId", this.props.slugId, "article", resp)
        this.setState({
          article: resp,
          value: resp.articleRating.currentUserRate,
        });
        this.fetchArticles(resp.id);
        this.ArticleComments(resp.id);
      });
    }
    if (this.props.currentarticle) {
      console.log("slugId current", this.props.currentarticle)
      this.setState({
        article: this.props.currentarticle,
        value: this.props.currentarticle.articleRating.currentUserRate,
      });
      this.fetchArticles(this.props.currentarticle.id);
      this.ArticleComments(this.props.currentarticle.id);
    }
    this.scrollup()
  }

  ArticleComments = (id) => {
    this.props.popActions.ArticleComments(id).then((resp) => {
      this.setState({
        comment: resp,
      });
    });
  };

  fetchArticles = (id) => {
    this.props.popActions.getrelatedArticles(id).then((articles) => {
      this.setState({
        relatedArticles: articles,
      });
      this.resize();
    });
  };

  isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  isDraftJsContent = () => {
    let content = null;
    content = this.state.article.content
      ? this.isJsonString(this.state.article.content)
        ? JSON.parse(this.state.article.content)
        : this.state.article.content
      : null;
    return typeof content == "object";
  };

  articleContent = () => {
    let content = this.state.article.content
      ? this.isJsonString(this.state.article.content)
        ? JSON.parse(this.state.article.content)
        : this.state.article.content
      : null;
    if (this.isDraftJsContent()) {
      const contentBlocks = convertFromRaw(content);
      return EditorState.createWithContent(contentBlocks, RICH_DECORATOR);
    }
    return content;
  };

  clickFunc(event) {
    if (this.props.isLoggedIn) {
      let data = {};
      data.articleId = this.state.article.id;
      data.rate = event;
      this.props.popActions.RateArticle(data).then((resp) => {
        this.setState({
          value: resp.currentUserRate,
        });
      });
    } else {
      const { history } = this.props;
      history.push("/login");
    }
  }

  scrollup() {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }

  onChangeItems = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  onSubmit = (id) => {
    let data = {
      articleId: id,
      text: this.state.text,
    };
    this.props.popActions.SubmitComment(data).then((resp) => {
      console.log("Comment Success!");
      this.ArticleComments(this.state.article.id);
      this.setState({ text: "" });
    });
  };

  report = () => {
    let data = {};
    data.articleId = this.state.article.id;
    data.email = "admin@ournet.co";
    swal("Reason for Reporting:", {
      content: "input",
      buttons: {
        cancel: "cancel",
        ok: "submit",
      },
    }).then((value) => {
      data.reason = value;
      console.log(value);
      // this.props.popActions.ReportInappropriate(data).then((resp) => {
      //     swal({
      //         title: 'Article has been reported!',
      //         icon: 'success',
      //         timer: 900
      //     })
      // })
    });
  };

  componentWillReceiveProps(newProps) {
    
    if (newProps.slugId) {
      this.setState({
        reloading:true
      })
      this.props.popActions
        .getArticlebySlug(newProps.slugId)
        .then((resp) => {
          this.setState({
            article: resp,
            value: resp.articleRating.articleRate,
          });
          this.fetchArticles(resp.id);
          this.ArticleComments(resp.id);
          this.scrollup()
          setTimeout(()=>{
            this.setState({
              reloading:false
            })

          }, 1000)
         
        })
        
    }
  }

  resize() {
    function resizeGridItem(item) {
      let grid = document.getElementsByClassName("popularArticles")[0];
      let rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
      );
      let rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
      );
      let rowSpan = Math.ceil(
        (item.querySelector(".content").getBoundingClientRect().height +
          rowGap) /
        (rowHeight + rowGap)
      );
      item.style.gridRowEnd = "span " + rowSpan;
    }

    function resizeAllGridItems() {
      let allItems = document.getElementsByClassName("article");
      for (let x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x]);
      }
    }
    window.onload = resizeAllGridItems();
    window.addEventListener("resize", resizeAllGridItems);
  }
  onReply = (index) => {
    let arr = this.state.replyIndex;
    for (let i = 0; i < this.state.comment.length; i++) {
      arr.push(0);
    }
    arr[index] = 1;
    this.setState({
      replyIndex: arr,
    });
  };

  onBlurReply = (index) => {
    setTimeout(() => {
      let arr = this.state.replyIndex;
      arr[index] = 0;
      this.setState({
        replyIndex: arr,
      });
    }, 100);
  };

  render() {
    return (
      <React.Fragment>
        <Meta title={this.state.article.title} />
        {this.props.articleSlugId == undefined && (
          <Header currentUrl={this.props.currentUrl} />
        )}
        <If condition={this.state.article.content}>
          <BannerSec>
            <BannerImg
              src={this.state.article.image}
              alt="article banner"
              name="articlebannerimage"
              onLoad={() => {
                this.setState({ highLoaded: true });
              }}
            />
            <img

              className="blurryImage"
              style={this.state.highLoaded ? { opacity: "0" } : { opacity: "1" }}

              src="https://images.pexels.com/photos/2177009/pexels-photo-2177009.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=5"
            />
            {this.state.reloading &&
              <div className="loaderRefresh">
                <Spinner animation="border" role="status" variant="danger" style={{width:"50px", height:"50px" }}>
                  <span className="sr-only">Loading...</span>
                </Spinner>

              </div>}
            <ArticleFootDescriber>
              <ArticleDesc>
                <ArticleTitle>{this.state.article.title}</ArticleTitle>
              </ArticleDesc>
              <ArticleActions>
                <AuthorNameLabel>
                  <Link to={`/userprofile/${this.state.article.userId}`}>
                    {this.state.article.author.firstName}{" "}
                    {this.state.article.author.lastName}
                  </Link>
                </AuthorNameLabel>
                <DateLabel>
                  {moment(this.state.article.createdDate).format("MMM Do YY")}
                </DateLabel>
              </ArticleActions>
            </ArticleFootDescriber>
          </BannerSec>
          <div></div>

          <FullArticle>
            <ArticleIntroP>{this.state.article.introduction}</ArticleIntroP>
            {this.isDraftJsContent() ? (
              <Editor
                class="article_text"
                editorState={this.articleContent()}
                readOnly
              />
            ) : (
                <div
                  className="ql-contents"
                  dangerouslySetInnerHTML={{ __html: this.articleContent() }}
                ></div>
              )}

            {/* "../../img/empty-avatar.png" */}

            <FlexRowEvenSpaceFullArticleFooter>
              <AuthorDiv>
                <Link
                  to={`/userprofile/${this.state.article.userId}`}
                  className="otherarticleBtn btn-fill-blue"
                >
                  SEE {this.state.article.author.firstName}’S OTHER ARTICLES
                </Link>
              </AuthorDiv>
              <RatingDiv>
                <PopularTitle>
                  <b> RATE THIS ARTICLE </b>
                </PopularTitle>
                <div className="ratingSec ratingStar">
                  <Rating
                    onClick={this.clickFunc}
                    initialRating={this.state.value}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                  />
                </div>
              </RatingDiv>
            </FlexRowEvenSpaceFullArticleFooter>

            <ReportInappropriate>
              <Span onClick={this.report}>
                Report Inappropriate{" "}
                <i className="fa fa-exclamation-circle"></i>
              </Span>
            </ReportInappropriate>

            <div>
              <PopularTitle>
                <b> COMMENT ON THIS ARTICLE </b>
              </PopularTitle>
            </div>
            {this.state.comment.map((comment, index) => {
              return (
                <TopicBlock key={comment.id}>
                  <FlexRow>
                    <TopicBox>
                      <TopicDesc>
                        <div className="topicProfileImg">
                          <img alt="" src={comment.author.avatar} />
                        </div>
                        <TopicContentWrap>
                          <TopicAuthorDesc>
                            <span>
                              <a href="#">{comment.author.username}</a>
                            </span>{" "}
                            {moment(comment.date).format("MMM D,  hh:mm")}
                          </TopicAuthorDesc>
                          <TopicDetails>{comment.text}</TopicDetails>
                        </TopicContentWrap>
                      </TopicDesc>
                      <CommentReply onClick={() => this.onReply(index)}>
                        <Paragrph>Reply</Paragrph>
                      </CommentReply>
                    </TopicBox>
                  </FlexRow>
                  {this.state.replyIndex[index] == 1 && (
                    <TopicContentWrapIn onBlur={() => this.onBlurReply(index)}>
                      <Input
                        type="text"
                        placeholder="Reply"
                        className="form-control "
                        onKeyDown={(e) => {
                          this.postReplyEnter(e, index);
                        }}
                        onChange={(e) =>
                          this.setState({ reply: e.target.value })
                        }
                        value={this.state.reply}
                      ></Input>

                      <ReplySend
                        type="button"
                        onClick={() => {
                          this.postReply(index);
                        }}
                      >
                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                      </ReplySend>
                    </TopicContentWrapIn>
                  )}
                </TopicBlock>
              );
            })}
            <TopicBlock>
              <TopicBox>
                <TopicContentWrap className=" relative">
                  <TextareaAutosize
                    className="comment-textarea"
                    minRows={2}
                    maxRows={6}
                    name="text"
                    placeholder="Your Comment..."
                    value={this.state.text}
                    onChange={this.onChangeItems}
                  />
                  <button
                    className="send-btn btn-article sC-postion"
                    onClick={() => this.onSubmit(this.state.article.id)}
                  >
                    Send
                  </button>
                </TopicContentWrap>
              </TopicBox>
            </TopicBlock>
          </FullArticle>
        </If>
        {this.props.articleSlugId == undefined && (
          <If condition={this.state.relatedArticles.length}>
            <ReleatedpostBox>
              <PopularTitle>
                <b> RELATED POSTS </b>
              </PopularTitle>

              <div className="popularArticles ">
                {this.state.relatedArticles.map((article) => {
                  return (
                    <div className="article" key={article.id}>
                      <div className="content card-s">
                        <img
                          src={article.image ? article.image : this.state.dimg}
                          alt="article image"
                          name="articleimg"
                          className="articleImg"
                        />
                        <div className="articleFoot">
                          <div className="articleDesc">
                            <Link to={`/article/${article.slug}`}>
                              <p className="articleTitle">{article.title}</p>
                            </Link>
                            <label className="articleWriter">
                              {article.author.firstName}{" "}
                              {article.author.lastName}
                            </label>
                          </div>
                          <div className="articleActions flexRow evenSpace">
                            <label className="timeStamp">
                              {moment(article.date).format("MMM D, YYYY")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ReleatedpostBox>
          </If>
        )}
        <div className="haCenter" onClick={this.scrollup}>
          <button type="button" className="upBtn">
            <i className="fa fa-angle-up" aria-hidden=""></i>
          </button>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}
function mapStateToProps(state, ownProps) {
  let slugId =
    ownProps.articleSlugId == undefined
      ? ownProps.match.params.id
      : ownProps.articleSlugId;
  let currentarticle = state.LocationArticles.articles.find(
    (x) => x.slug == slugId
  );
  currentarticle = currentarticle
    ? currentarticle
    : state.PopularArticles.articles.find((x) => x.slug == slugId);
  // currentarticle = currentarticle ? currentarticle : state.RelatedArticles.articles.find(x => x.slug == slugId);
  // currentarticle = currentarticle ? currentarticle : state.Groups.group_articles.find(x => x.slug == slugId);
  let currentUrl = ownProps.location ? ownProps.location.pathname : "";
  let isLoggedIn = state.Authentication.loggedIn;
  // console.log(slugId);

  return {
    currentarticle,
    currentUrl: currentUrl,
    slugId,
    isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    popActions: bindActionCreators(PopActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
