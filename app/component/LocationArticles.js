import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PopActions from './../actions/popularArticleActions';
import * as LocActions from './../actions/locActions';
import ArticleCard from "../common/articleCards"

class LocationArticles extends Component {

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
            priority: 0,
            flag: true,
            city: this.props.city,
            finished: false,
            over: false,
            fixed: false
        }
    }

    componentDidMount() {


        if (this.props.isLoggedIn) {

            if (this.state.articles.length == 0) {
                this.fetchArticles(this.state.itemsPerPage);
                if (!this.state.city) {
                    this.props.locActions.getLocationDetails().then((resp) => {
                        if (!resp.locations == null) {
                            this.setState({
                                city: resp.locations[0].locationTag,
                                finished: true
                            })
                        }
                    })
                }
            }
        }

        else {
            // navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            //     console.log("result state", result.state)
            // })
            // if (navigator.geolocation) {
            //     navigator.geolocation.getCurrentPosition(position => {
            //         const { latitude, longitude } = position.coords
            //         this.setState({
            //             lng: longitude,
            //             lat: latitude
            //         }, () => {

            //             this.guestfetchArticles(this.state.itemsPerPage, true)

            //         })
            //     });
            // }
            // else {
            //     this.guestfetchArticles(this.state.itemsPerPage, false)

            // }
            if (this.props.lat == null) {
                this.handlePermission()
            }
            else{
                this.guestfetchArticles(this.state.itemsPerPage, true)

            }
        }

        window.scrollTo(0, 0);
    }


    geocodeLatLng = (geocoder, latitude, longitude) => {

        var latlng = { lat: latitude, lng: longitude };
        geocoder.geocode({ 'location': latlng }, (results, status) => {
            if (status === 'OK') {
                console.log("addressss------------->", results)
                let arr = results[0].formatted_address
                let locationTag = arr.split(",")[arr.length - 1]
                let location = {}
                location.lat = latitude;
                location.lng = longitude;
                location.locationTag = locationTag;
                location.priority = 1;
                location.city = locationTag
                location.postalCode = "";
                location.address = arr;
                this.props.locActions.updateLocationDetailsForGuestUser([location])
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }


    handlePermission = () => {

        let geocoder = new google.maps.Geocoder;

        return navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            console.log("stateeeee", result.state)
            if (result.state == 'granted') {
                // report(result.state);
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords
                    this.setState({
                        lng: longitude,
                        lat: latitude
                    }, () => {

                        this.geocodeLatLng(geocoder, latitude, longitude)
                        this.guestfetchArticles(this.state.itemsPerPage, true)

                    })
                });
            } else if (result.state == 'prompt') {

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        const { latitude, longitude } = position.coords
                        this.setState({
                            lng: longitude,
                            lat: latitude
                        }, () => {
                            this.geocodeLatLng(geocoder, latitude, longitude)


                            this.guestfetchArticles(this.state.itemsPerPage, true)

                        })
                    });
                }

            } else if (result.state == 'denied') {

                this.guestfetchArticles(this.state.itemsPerPage, false)
            }
            result.onchange = function () {
                report(result.state);
            }
        });
    }


    guestfetchArticles = (itemsPerPage, coordsAvailable) => {

        let lat = coordsAvailable && !this.props.lat ? this.state.lat : this.props.lat
        let lng = coordsAvailable && !this.props.lng ? this.state.lng : this.props.lng

        if (!this.props.lng && !coordsAvailable) {
            lat = -34.397;
            lng = 150.644;

        }


        console.log("old -->", this.props.lng, "new-->", this.state.lng)
        this.props.popActions.getGuestLocationArticles(lat, lng, this.props.radius, this.state.activePage - 1, itemsPerPage, this.state.priority).then((resp) => {
            this.setState({
                articles: resp.articles,
                totalArticles: resp.totalArticles,
                flag: resp.articles.length ? true : false,
                finished: true
            });
            this.resize();
        })
    }

    fetchArticles = (itemsPerPage) => {
        this.props.popActions.getLocationArticles(this.state.activePage - 1, itemsPerPage, this.state.filter, this.state.priority).then((articles) => {

            this.setState({
                articles: articles.articles,
                loading: true,
                totalArticles: articles.totalArticles,
                pageCount: Math.ceil(articles.totalArticles / itemsPerPage),
                flag: articles.articles.length ? true : false,
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
                finished: true,
                over: true
            })
            swal({
                title: "That's it",
                icon: 'warning',
                timer: 1000
            })
        }
    }

    radiuschangefunc = (e) => {
        if (this.props.isLoggedIn == ("true" || true)) {
            this.props.locActions.updateUserLocationfromradius(e).then((articles) => {
                if (articles) {
                    this.setState({
                        articles: articles.articles,
                        loading: true,
                        totalArticles: articles.totalArticles,
                        pageCount: Math.ceil(articles.totalArticles / itemsPerPage),
                        flag: articles.articles.length ? true : false
                    });
                }
            })
        }
    }


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


    render() {

        return (
            <Fragment>
                <div className="secHeader flexRow evenSpace sceHeads">
                    <div className="secTitle">
                        <label className="secName">{this.props.testCity ? this.props.testCity.split(",")[0] : "Locality"} News</label><br />
                        <label className="secDesc">Selected content where you are</label>
                    </div>
                </div>

                <ArticleCard articles={this.state.articles} />

                <div className="haCenter">
                    {!this.state.finished ? <div className="spinner-grow text-primary" style={{ "width": "3rem", "height": "3rem" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div> :
                        (!this.state.over && <button type="button" className={this.state.loading ? "loadmoreBtn rating-loading btn-fill-blue" : "loadmoreBtn"} onClick={(e) => this.onChangeItemsPage(e)}>Load More Articles</button>)
                    }
                </div>
            </Fragment >
        )
    }
}

function mapStateToProps(state) {
    let articles = state.LocationArticles.articles;
    let isLoggedIn = state.Authentication.loggedIn;
    // let lat = (state.Locations.locations.length) ? state.Locations.locations[0].lat : "";
    // let lng = (state.Locations.locations.length) ? state.Locations.locations[0].lng : "";
    let lng = state.Locations.locations[0].lng
    let lat = state.Locations.locations[0].lat
    let city = (state.Locations.locations.length) ? state.Locations.locations[0].locationTag : "";
    let testCity = (state.Locations.locations.length) ? state.Locations.locations[0].address : "";
    let length = state.Locations.locations[0].address.split(",").length
    let address = state.Locations.locations[0].address.split(",")[length - 1]

    console.log("adresss" , testCity)


    let radius = (state.Locations.locations.length) ? state.Locations.locations[0].radius : "";
    return {
        articles,
        lat,
        lng,
        radius,
        isLoggedIn,
        city,
        testCity,
        address
    };
}

function mapDispatchToProps(dispatch) {
    return {
        popActions: bindActionCreators(PopActions, dispatch),
        locActions: bindActionCreators(LocActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(LocationArticles);
