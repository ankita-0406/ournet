import React,{Component, Fragment} from 'react';
import ArticleCard from "../common/articleCards";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PopActions from '../actions/popularArticleActions';


class PopularArticles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            activePage: 1,
            itemsPerPage: 12,
            pageCount: 1,
            totalArticles: 0,
            filter: "",
            priority: 1,
            finished: false,
            done: false
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            if (this.state.articles.length == 0) {
                this.fetchArticles(this.state.itemsPerPage);
            }
        }
        else {
            this.guestfetchArticles(this.state.itemsPerPage);
        }
    }

    componentDidUpdate(prop, stt) {
        if (!stt.done) {
            this.resize()
            this.setState({
                done: true
            })

        }

    }

    guestfetchArticles = (itemsPerPage) => {
        let lat = this.props.lat;
        let lng = this.props.lng;
        if(!lat){
            lat  = -34.397;
            lng = 150.644;
            
        }
        this.props.popActions.getGuestLocationArticles(lat, lng, this.props.radius, this.state.activePage - 1, itemsPerPage, this.state.priority).then((resp) => {
            this.setState({
                articles: resp.articles,
                totalArticles: resp.totalArticles,
                finished: true
            });
            this.resize();
        })
    }

    fetchArticles = (itemsPerPage) => {
        this.props.popActions.getPopularArticles(this.state.activePage - 1, itemsPerPage, this.state.filter, this.state.priority).then((articles) => {
            this.setState({
                articles: articles.articles,
                loading: true,
                totalArticles: articles.totalArticles,
                finished: true
            });
            this.resize();
        })

    }

    onChangeItemsPage() {
        this.setState({
            finished: false
        })
        // this.state.activePage = 1;
        if (this.state.totalArticles > this.state.itemsPerPage) {
            let itemsPerPage = this.state.itemsPerPage + 12;
            this.setState({
                itemsPerPage: itemsPerPage
            })
            if (this.props.isLoggedIn) {
                this.fetchArticles(itemsPerPage);
            }
            else {
                this.guestfetchArticles(itemsPerPage);
            }
        }
        else {
            this.setState({
                finished: true
            })
            swal({
                title: "That's it",
                icon: 'warning',
                timer: 1000
            })
        }
    }

    // resize() {
    //     function resizeGridItem(item) {
    //         let grid = document.getElementsByClassName("popularArticles")[0];
    //         let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    //         let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    //         let rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    //         item.style.gridRowEnd = "span " + rowSpan;
    //     }

    //     function resizeAllGridItems() {
    //         let allItems = document.getElementsByClassName("article");
    //         for (let x = 0; x < allItems.length; x++) {
    //             resizeGridItem(allItems[x]);
    //         }
    //     }
    //     window.onload = resizeAllGridItems();
    //     window.addEventListener("resize", resizeAllGridItems);
    // }

    resize() {
        function resizeGridItem(item) {
            let grid = document.getElementsByClassName("first")[0];
            let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
            let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
            let rowSpan = Math.ceil((item.querySelector('.card').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = "span " + rowSpan;
        }

        function resizeAllGridItems() {
            let allItems = document.getElementsByClassName("articleCombine");
            for (let x = 0; x < allItems.length; x++) {
                resizeGridItem(allItems[x]);
            }
        }
        window.onload = resizeAllGridItems();
        window.addEventListener("resize", resizeAllGridItems);
    }

    render = () => {
        return (<Fragment>
            <div className="secHeader flexRow evenSpace sceHeads">
                <div className="secTitle">
                    <label className="secName">Popular News</label><br />
                    <label className="secDesc">Based on user rating</label>
                </div>
            </div>

            <ArticleCard articles={this.state.articles} />

            <div className="haCenter">
                {!this.state.finished ? <div className="spinner-grow text-primary" style={{ "width": "3rem", "height": "3rem" }} role="status">
                    <span className="sr-only">Loading...</span>
                </div> :
                    <button type="button" className={this.state.loading ? "loadmoreBtn rating-loading btn-fill-blue" : "loadmoreBtn"} onClick={(e) => this.onChangeItemsPage(e)}>Load More Articles</button>
                }
            </div>
        </Fragment>);
    }
}

function mapStateToProps(state) {
    let articles = state.PopularArticles.articles;
    let isLoggedIn = state.Authentication.loggedIn;
    let lat = (state.Locations.locations.length) ? state.Locations.locations[0].lat : "";
    let lng = (state.Locations.locations.length) ? state.Locations.locations[0].lng : "";
    let radius = (state.Locations.locations.length) ? state.Locations.locations[0].radius : "";
    return {
        articles,
        lat,
        lng,
        radius,
        isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        popActions: bindActionCreators(PopActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularArticles);
