import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import GoogleMapComponent from './maps/googleMap';
import '../../style/component/Location.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LocActions from '../actions/locActions';
import UUID from "../util/communityIds";
import swal from 'sweetalert';
import { Container } from 'react-bootstrap';

class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            autocomplete: "",
            lat: 39,
            lng: 34,
            radius: 5,
            locationTag: '',
            address: '',
            locations: this.props.locations,
            location: []
        }
    }


    componentDidMount() {
        // const input = document.getElementById('gmap_geocoding_address');

        // window.addEventListener('scroll', () => {
        //     document.getElementsByClassName("pac-container")[0].style.display = "none";

        // });

        // let autocomplete = new google.maps.places.Autocomplete(input);
        // // console.log(autocomplete.getPlace());
        // this.setState({ autocomplete })
        // autocomplete.addListener('place_changed', () => this.handlePlaceChanged());
        // console.log(this.props.isLoggedIn);

        document.body.addEventListener("click", () => {
            setTimeout(() => {
                this.setState({
                    location: []
                })
            }, 20);

        });

        if (this.props.isLoggedIn == ("true" || true)) {
            this.props.locActions.getLocationDetails().then((resp) => {
                if (resp.locations.length) {
                    this.setState({
                        locations: resp.locations,
                        lat: resp.locations[0].lat,
                        lng: resp.locations[0].lng,
                        radius: resp.locations[0].radius,
                        locationTag: resp.locations[0].locationTag,
                        address: resp.locations[0].address
                    })
                }
            })
        }
    }

    makeAutoComplete = (e) => {

        let displaySuggestions = (predictions, status) => {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                // alert(status);
                return;
            }
            let location = []

            predictions.forEach((prediction) => {

                location.push(prediction.description)

            });

            this.setState({
                location: location
            })
        };

        let service = new google.maps.places.AutocompleteService();
        this.setState({
            locationValue: e.target.value
        })
        service.getQueryPredictions({ input: e.target.value }, displaySuggestions);

    };

    onClickCity(index) {

        let geocoder = null;
        let locationValue = this.state.location[index];
        let city = locationValue.split(",")[0]
        let countryName = locationValue.split(" ")[locationValue.split(" ").length - 1];
        this.setState({
            location: []
        })

        geocoder = new google.maps.Geocoder();

        let address = this.state.location[index];
        geocoder.geocode({ 'address': address }, (results, status) => {
            if (status == 'OK') {
                let location = ((this.state.locations.length) ? this.state.locations[0] : {});
                location.lat = results[0].geometry.location.lat();
                location.lng = results[0].geometry.location.lng();
                location.locationTag = countryName;
                location.priority = 1;
                location.city = city
                location.postalCode = "";
                location.address = locationValue
                this.setState({
                    locationValue: locationValue,
                    locations: [location],
                    lat: location.lat,
                    lng: location.lng,
                    locationTag: location.locationTag

                })
                // map.setCenter(results[0].geometry.location);
                // var marker = new google.maps.Marker({
                //     map: map,
                //     position: results[0].geometry.location
                // });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        })

        // let location = ((this.state.locations.length) ? this.state.locations[0] : {});
        // location.lat = position.lat();
        // location.lng = position.lng();
        // location.locationTag = cntryName;
        // location.priority = 1;
        // location.radius = this.state.radius;
        // location.address = place.formatted_address;
        // // location.communityId = UUID.getCommunityID(cntryName);
        // location.country = cntryName;
        // location.city = city;
        // location.postalCode = postalCode;
        // this.setState({
        //     locations: [location],
        //     lat: location.lat,
        //     lng: location.lng,
        //     locationTag: cntryName
        // })

    }

    handlePlaceChanged = () => {

        const place = this.state.autocomplete.getPlace();
        const city = this.extractAttribute(place, "locality");
        const postalCode = this.extractAttribute(place, "postal_code");
        const country = place.address_components.filter((x) => {
            return x.types.indexOf("country") != -1;
        });
        let cntryName = country ? country[0].long_name : "";
        let position = place.geometry.location;
        let location = ((this.state.locations.length) ? this.state.locations[0] : {});
        location.lat = position.lat();
        location.lng = position.lng();
        location.locationTag = cntryName;
        location.priority = 1;
        location.radius = this.state.radius;
        location.address = place.formatted_address;
        // location.communityId = UUID.getCommunityID(cntryName);
        location.country = cntryName;
        location.city = city;
        location.postalCode = postalCode;
        this.setState({
            locations: [location],
            lat: location.lat,
            lng: location.lng,
            locationTag: cntryName
        })
    }

    onChange = (e) => {
        // console.log(location);
        this.setState({
            // locations: {
            //     ...this.state.locations,
            //     radius: e.target.value
            // },
            radius: e.target.value
        })
    }

    extractAttribute(place, attribute) {
        const foundObject = place.address_components.filter(component => component.types.indexOf(attribute) >= 0);
        return foundObject.length > 0 ? foundObject[0].long_name : null;
    }

    onSave = () => {
        let location = this.state.locations;
        location[0].radius = parseInt(this.state.radius);
        if (this.props.isLoggedIn) {
            this.props.locActions.updateLocationDetails(location).then((res) => {
                console.log("after res" ,res)
                swal({
                    title: 'User Location Saved!',
                    text: 'The User Location was saved',
                    icon: 'success',
                    timer: 900
                }).then(()=>{
                    this.props.history.goBack();

                })
            })
            // this.props.history.goBack();
        }
        else {
            this.props.locActions.updateLocationDetailsForGuestUser(this.state.locations).then(() => swal({
                title: 'User Location Saved!',
                text: 'The User Location was saved',
                icon: 'success',
                timer: 900
            })).then(()=>{
                this.props.history.goBack();

            })
            // this.props.history.goBack();
        }
    }

    scrollUp = () => {
        document.body.scrollTo({ top: 0, behavior: 'smooth' })
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }

    render() {
        return (
            <React.Fragment>
                <Header currentUrl={this.props.currentUrl} />
                <Container>
                    <div className="section">
                        <div className="secHeader">
                            <div className="secTitle">
                                <label className="secName">Location</label><br />
                                <label className="secDesc">Tailor your OurNet experience to match your location/s and interests.</label>
                                <p className="locInfo">
                                    You can configure OurNet to only show articles that are relevant to your location. Set your location and your preferred radius around it, below.</p>
                            </div>
                        </div>
                        <div className="locationSec">
                            <div className="flexRow">
                                <div className="locationBox">
                                    <label className="locBoxTitle">CURRENT LOCATION</label>
                                    <div className="flexColumn evenSpace">
                                        <div className="locfieldBox">
                                            <label className="fieldTitle">Region, City</label>
                                            <div className="flexRow">
                                                <input type="text" id="gmap_geocoding_address" placeholder={this.state.address} className="locfield" value={this.state.locationValue} onChange={(e) => this.makeAutoComplete(e)} />
                                            </div>
                                            {this.state.location.length != 0 && <div className="placesAutoComplete" >
                                                {this.state.location.map((item, index) => {
                                                    return (<div className="locationList" key={index} onClick={() => this.onClickCity(index)}><span className="locationPrediction"> <i className="fa fa-map-marker" aria-hidden="true"></i> {item}</span></div>)
                                                })}
                                            </div>}
                                        </div>
                                        <div className="locfieldBox">
                                            <label className="fieldTitle">Country</label>
                                            <div className="flexRow">
                                                <input type="text" disabled className="locfield" defaultValue={this.state.locationTag} />
                                            </div>
                                        </div>
                                        <div className="locfieldBox">
                                            <label className="fieldTitle">Radius: <span>{this.state.radius}</span></label>
                                            <div className="flexColumn">
                                                <input type="range" orient="horizontal" id="rangeSlider" onChange={(e) => this.onChange(e)} value={this.state.radius} className="locrangeSlider" min="0" max="50" step="1" />
                                                <div className="flexRow evenSpace">
                                                    <span className="minLimit limit">1 km</span>
                                                    <span className="maxLimit limit">50 km</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <GoogleMapComponent latitude={this.state.lat}
                                    longitude={this.state.lng} radius={this.state.radius}
                                    containerElement={<div style={{ position: "relative", overflow: "hidden", flex: 2 }} />}
                                    mapElement={<div style={{ height: `100%` }} />} />

                            </div>
                        </div>
                    </div>
                    <div className="haCenter">
                        {/* <button type="button" className="locaddBtn btn-fill-blue btn-dotted-border">ADD NEW LOCATION</button> */}
                        <button type="button" className="locsaveBtn btn-fill-blue" onClick={() => this.onSave()}>Save</button>
                    </div>
                    <div className="haCenter">
                        <button type="button" className="upBtn" onClick={() => this.scrollUp()}><i className="fa fa-angle-up" aria-hidden=""></i></button>
                    </div>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {

    let isLoggedIn = state.Authentication.loggedIn;
    let locations = (state.Locations.locations.length) ? state.Locations.locations[0] : "";

    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    return {
        isLoggedIn,
        locations,
        currentUrl
    };
}

function mapDispatchToProps(dispatch) {
    return {
        locActions: bindActionCreators(LocActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
