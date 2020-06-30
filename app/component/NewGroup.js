import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import GoogleMapComponent from './maps/googleMap';
import * as Myprofileaction from '../actions/myprofileAction';
import * as TagActions from '../actions/tagsActions';
import * as GroupAction from "../actions/groupActions";
import '../../style/component/NewGroup.css';
import CreatableSelect, { makeCreatableSelect } from 'react-select/creatable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SimpleReactValidator from 'simple-react-validator';
import ImageCrop from '../common/imageCrop';
import * as ManagedMediaActions from '../actions/ManagedMediaActions';
import styled from "styled-components";
import NewGroupCards from "../common/NewGroupCards";
import AsyncSelect from 'react-select/async';





const MainSqureBoxWrapper = styled.div`
  display: flex;
  flex-flow: row;
  /* margin-left: 129px; */
  /* margin: 0 160px 0px 160px; */
    padding: 20px 20px 20px 20px;
    margin-left: 150px;

  @media only screen and (max-width: 480px) {
    display: block;
    flex-flow: column;
    margin: 0px 45px 0px 45px;
    padding: 15px 0px 0px 0px;
    /* padding: 60px 0 0 0; */
  }
`;


const SqureBox = styled.div`
  width: 200px;
  height: 200px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ffffff;
  opacity: 1px;
  text-align: center;
  margin: 0 80px 0px 0px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    background-color: #024b99;
    border: 2px solid #024b99;
    .colorh4 {
      color: white ;
      border: 2px #ffffff solid;
    }
    .colorh6 {
      color: white ;
    }
  }

  @media only screen and (max-width: 480px) {
    margin: 0px 0 30px 0;
    border-radius: 10px;
  }
`;
const DivContent = styled.div`
  margin-top: 25px;
`;
const H4 = styled.h4`
  color: #bb4d9a;
  border: 1px #bb4d9a solid;
  width: 25px;
  height: 25px;
  border-radius: 30px;
  font-weight: bolder;
  border-radius: 30px;
  margin: auto;
`;

const H6 = styled.h6`
  font-size: 16px;
  font-weight: bolder;
  color: #bb4da6;
  padding: 12px;
`;

const P = styled.p`
  line-height: 1.5rem;
  padding: 0 0 30px 0;
`;

const Input = styled.input`
  margin: 0px 0px 0px 0px;
`;
const Label = styled.label`
    text-align: left;
    font: Bold 16px/22px Lato;
    letter-spacing: 0;
    color: #BB4D9A;
    display: block;
    margin-bottom: 12px;

`;









class NewGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 93,
            gname: '',
            description: '',
            latitude: 51.5074,
            longitude: -0.1278,
            address: "",
            locationTag: "",
            userName: "",
            allTags: [],
            tags: [],
            openCroppingModal: false,
            imageToCrop: null,
            image: "",
            openPhotoModal: false,
            page: "newGroup",
            aspectRatio: 16 / 9,
            location: [],
            phone: "",
            email: "",
            facebook: "",
            linkedin: "",
            twitter: "",
            groupType: "Public",
            members: [],
            membersToInvite: [],
            admins: [],
            admin: []
        }
        this.validator = new SimpleReactValidator()
    }

    componentDidMount() {




        document.body.addEventListener("click", () => {
            setTimeout(() => {
                this.setState({
                    location: []
                })
            }, 20);

        });
        // const input = document.getElementById('gmap_geocoding_address');
        // let autocomplete = new google.maps.places.Autocomplete(input);
        // this.setState({ autocomplete })
        // autocomplete.addListener('place_changed', () => this.handlePlaceChanged());

        this.props.myprofileaction.getmyprofile(this.props.userId).then((resp) => {
            this.setState({
                userName: resp['firstName'] + " " + resp['lastName']
            })
        })

        this.props.tagActions.getAllTags().then((resp) => {
            let tagsList = resp.map((resp) => {
                return resp.name;
            })
            this.setState({
                allTags: tagsList
            })
        })

        this.scrollup();
    }


    componentWillUnmount() {
        this.props.managedMediaActions.uploadMediaFile({ filename: null, file: null, src: null })

    }

    removePicture = () => {
        this.props.managedMediaActions.uploadMediaFile({ filename: null, file: null })

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
                console.log("location", prediction)

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
        let countryName = locationValue.split(",")[locationValue.split(",").length - 1];
        this.setState({
            location: []
        })

        geocoder = new google.maps.Geocoder();

        let address = this.state.location[index];
        geocoder.geocode({ 'address': address }, (results, status) => {
            if (status == 'OK') {
                console.log(results[0].geometry.location)
                let location = {};
                location.lat = results[0].geometry.location.lat();
                location.lng = results[0].geometry.location.lng();
                location.locationTag = countryName
                this.setState({
                    locationValue: locationValue,
                    latitude: location.lat,
                    longitude: location.lng,
                    locationTag: location.locationTag,
                    address: locationValue

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
        let location = {};
        location.lat = position.lat();
        location.lng = position.lng();
        location.locationTag = cntryName;
        location.address = place.formatted_address;
        this.setState({
            latitude: location.lat,
            longitude: location.lng,
            locationTag: location.locationTag,
            address: location.address
        })
    }

    extractAttribute(place, attribute) {
        const foundObject = place.address_components.filter(component => component.types.indexOf(attribute) >= 0);
        return foundObject.length > 0 ? foundObject[0].long_name : null;
    }

    scrollup() {
        document.body.scrollTo({ top: 0, behavior: 'smooth' })
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onform = (e) => {
        return 'Create ' + e + ' option'
    }

    changeTags = (e) => {

        this.setState({
            tags: e
        })
    }

    newTags = (e) => {
        const newTags = this.state.tags;
        newTags.push(e);
        this.setState({
            tags: newTags
        })
    }

    onChangeItems = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    onSave = () => {
        let imageUrl = this.props.groupImageUrl;
        const data = {
            id: null,
            name: this.state.gname,
            paymentPlanId: 1,
            parentGroupId: null,
            description: this.state.description,
            phone: this.state.phone,
            email: this.state.email,
            linkedin: this.state.linkedin,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            address: this.state.address,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            groupType: this.state.groupType.toUpperCase(),
            image: imageUrl,
            tags: this.state.tags,
            locationTag: "",
            admins: this.state.admins,
            membersToInvite: this.state.membersToInvite,
            emailsToInvite: []
        }
        if (this.validator.allValid()) {
            this.props.groupAction.PublishGroup(data).then((resp) => {
                swal({
                    title: 'Group published successfully',
                    text: 'Group has been published successfully',
                    icon: 'success',
                    timer: 900
                })
                this.setState({
                    id: resp.id
                })
                this.props.history.goBack();
            })

        }
        else {
            this.validator.showMessages();
        }
        return data;
    }

    openFile = () => {
        // document.getElementById('fileElement').click();
        if (!this.props.articleImage) {
            this.setState({
                openCroppingModal: true

            })
        }
    }

    loadImage = (files) => {
        if (files.length) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    imageToCrop: e.target.result
                });
            };
            reader.readAsDataURL(files[0])
        }
        this.setState({
            openCroppingModal: true
        })
    }

    onCropImage = (filename, file, onError) => {
        ManagedMediaActions.uploadMediaFile(filename, file).then((savedMedia) => {
            let media = savedMedia;
            this.setState({
                activePage: 1,
                imageToCrop: null,
                loading: false,
                selectedMedia: savedMedia,
                image: `/media/${media.directory}/${media.fileName}`,
                openCroppingModal: false
            });
        }).catch((err) => {
            console.log(err);
        })

    };

    hidingModal = () => {
        this.setState({
            openCroppingModal: false
        })
    }

    onMembersChange = (e) => {

        this.props.groupAction.getMembers(e.target.value).then(res => {
            console.log("aaaa", res)
            this.setState({
                members: res
            })
        })
        return e


    }



    filterColors = (inputValue) => {
        // return this.state.members.filter(i =>
        //   i.toLowerCase().includes(inputValue.toLowerCase())
        // );
        return this.state.members
    };

    loadOptions = (e, callback) => {
        console.log("load oprtio", e)
        this.props.groupAction.getMembers(e).then(res => {
            // console.log("aaaa", res)
            // this.setState({
            //     members: res
            // })

            let arr = [];
            res.forEach((elem) => {
                arr.push({
                    label: elem.username,
                    value: elem.username,
                    id: elem.id
                })
            })

            console.log("arrrrrrr", arr)
            this.setState({
                members: arr
            }, () => {


                callback(this.filterColors(e));

            })



            // return arr;
        })

    }


    loadOptionsAdmin = (e, callback) => {
        console.log("load oprtio", e)
        this.props.groupAction.getAdmins(e).then(res => {
            // console.log("aaaa", res)
            // this.setState({
            //     members: res
            // })

            let arr = [];
            res.forEach((elem) => {
                arr.push({
                    label: elem.username,
                    value: elem.username,
                    id: elem.id
                })
            })

            console.log("arrrrrrr", arr)
            this.setState({
                admin: arr
            }, () => {


                callback(this.filterColors(e));

            })



            // return arr;
        })

    }

    onMemberSelect = (e, type) => {
        console.log("member", e)
        if (e.length) {
            if (type == "members") {
                let membersToInvite = this.state.membersToInvite
                membersToInvite.push(e[e.length - 1].id)
                this.setState({
                    membersToInvite
                })
            }
            else {
                let admins = this.state.admins;
                admins.push(e[e.length - 1].id)
                this.setState({
                    admins
                })
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header currentUrl={this.props.currentUrl} />

                {this.state.openCroppingModal &&

                    <ImageCrop show={this.state.openCroppingModal} hideModal={() => this.hidingModal()} page={this.state.page} aspectRatio={this.state.aspectRatio} />
                }
                <Container>
                    <div className="section">
                        <div className="secHeader flexRow evenSpace">
                            <div className="secTitle">
                                <label className="secNameCommunities">New Community</label><br />
                                <label className="secDescCommunities">by {this.state.userName}</label>
                            </div>
                        </div>
                        <div className="articlefieldBox">
                            <Label >Community Type</Label>

                            {/* -------------------------------------- */}
                            <MainSqureBoxWrapper>
                                <SqureBox>
                                    <DivContent>
                                        <H4 className="colorh4">1</H4>
                                        <H6 className="colorh6">Public</H6>
                                        <P>Open to all</P>
                                        <Input type="radio" id="Public" name="groupType" value="Public" onChange={(e) => { this.setState({ groupType: e.target.value }) }} checked={this.state.groupType == "Public"} />
                                    </DivContent>
                                </SqureBox>
                                <SqureBox >
                                    <DivContent>
                                        <H4 className="colorh4">2</H4>
                                        <H6 className="colorh6">Private</H6>
                                        <P>Publicly visible with Private Membership</P>
                                        <Input type="radio" id="Private" name="groupType" value="Private" onChange={(e) => { this.setState({ groupType: e.target.value }) }} />
                                    </DivContent>
                                </SqureBox>
                                <SqureBox>
                                    <DivContent>
                                        <H4 className="colorh4">3</H4>
                                        <H6 className="colorh6">Invited Only</H6>
                                        <P>Hidden and Invitation only</P>
                                        <Input type="radio" id="Invited Only" name="groupType" value="Invited_Only" onChange={(e) => { this.setState({ groupType: e.target.value }) }} />
                                    </DivContent>
                                </SqureBox>
                            </MainSqureBoxWrapper>
                            {/* --------------------------------------------- */}
                        </div>
                        <div className="articleSec">
                            <div className="flexRow evenSpace">
                                <div className="box articleFieldsBox">
                                      <div className="flexColumn evenSpace">
                                        <div className="articlefieldBox">
                                            <Label>Community Name</Label>
                                            <div className="flexRow">
                                                <input id="gname" type="text" className="articlefield" onChange={this.onChangeItems} placeholder="Group Name here" />
                                            </div>
                                            <span style={{ "color": "#a94442" }}> {this.validator.message('group', this.state.gname, 'required|string')} </span>
                                        </div>

                                        <div className="articlefieldBox evenSpace">
                                            <Label>Community Description</Label>
                                            <div className="flexRow">
                                                <textarea id="description" onChange={this.onChangeItems} className="articlefield introField" placeholder="Up to 300 character"></textarea>
                                            </div>
                                            <span style={{ "color": "#a94442" }}> {this.validator.message('description', this.state.description, 'required|string')} </span>
                                        </div>

                                        <div className="articlefieldBox">
                                            <Label>Select Tags...</Label>
                                            <div className="flexRow">

                                                <CreatableSelect
                                                    isMulti
                                                    formatCreateLabel={this.onform}
                                                    value={this.state.tags}
                                                    onChange={this.changeTags}
                                                    onCreateOption={this.newTags}
                                                    getOptionLabel={(option) => option.label ? option.label : option}
                                                    getOptionValue={(option) => option.value ? option.value : option}
                                                    options={this.state.allTags}
                                                    placeholder="Ex: Music, Social, Technology" />
                                            </div>
                                        </div>

                                        {/* ------------------------------ */}

                                        {this.state.groupType == "Public" && <div>
                                            <div className="articlefieldBox">
                                                <Label>Additional Details</Label>
                                                <div className="flexRow">
                                                    <input id="phone" type="number" className="articlefield" onChange={this.onChangeItems} placeholder="Phone Number" />
                                                </div>
                                                <span style={{ "color": "#a94442" }}> {this.validator.message('phone', this.state.phone, 'phone')} </span>
                                            </div>
                                            <div className="articlefieldBox">

                                                <div className="flexRow">
                                                    <input id="email" type="email" className="articlefield" onChange={this.onChangeItems} placeholder="Email" />
                                                </div>
                                                <span style={{ "color": "#a94442" }}> {this.validator.message('email', this.state.email, 'email')} </span>

                                            </div>

                                            <div className="articlefieldBox">

                                                <div className="flexRow">
                                                    <input id="facebook" type="text" className="articlefield" onChange={this.onChangeItems} placeholder="Facebook" />
                                                </div>

                                            </div>

                                            <div className="articlefieldBox">

                                                <div className="flexRow">
                                                    <input id="twitter" type="text" className="articlefield" onChange={this.onChangeItems} placeholder="Twitter Handle" />
                                                </div>

                                            </div>

                                            <div className="articlefieldBox">

                                                <div className="flexRow">
                                                    <input id="linkedIn" type="text" className="articlefield" onChange={this.onChangeItems} placeholder="LinkedIn Profile" />
                                                </div>

                                            </div>
                                        </div>}



                                        {this.state.groupType != "Public" &&
                                            <div className="articlefieldBox">
                                                <Label>Invite Members...</Label>
                                                <div className="flexRow">

                                                    <AsyncSelect
                                                        cacheOptions
                                                        isMulti
                                                        loadOptions={this.loadOptions}



                                                        onChange={(e) => this.onMemberSelect(e, "members")}
                                                    />


                                                </div>
                                            </div>}


                                        {this.state.groupType != "Public" &&
                                            <div className="articlefieldBox">
                                                <label className="fieldTitle">Asign Admins...</label>
                                                <div className="flexRow">

                                                    <AsyncSelect
                                                        cacheOptions
                                                        isMulti
                                                        loadOptions={this.loadOptionsAdmin}


                                                        onChange={(e) => this.onMemberSelect(e, "admins")}
                                                    />




                                                </div>
                                            </div>}

                                        {/* --------------------------    */}


                                    </div>
                                </div>
                                <div className="box articleImageBox">
                                    <div className="coverImageBox">
                                        <Label>Main Community Image</Label>
                                        {/* <div className="imageHolder" onClick={this.openFile}>
                                            {this.state.image && <img src={this.state.image} className="coverSelctedPic" width="100%" alt="Image" name="CoverPic" />}
                                            <p className="instructionImg">Select Image From Your Device</p>
                                            <input id="fileElement" type="file" style={{ "position": "absolute", "top": "-1000px" }} accept="image/x-png,image/jpg, image/jpeg"
                                                onChange={(e) => this.loadImage(e.target.files)}   ></input>
                                            <label className="infoImg">Use wide images (1280 * 760px) for a better viewing on article page</label>
                                        </div> */}
                                        <div className="imageHolder" onClick={() => this.openFile()}  >
                                            {this.props.articleImage && <div className="coverSelctedPicWrapper"><img src={this.props.articleImage} className="coverSelctedPic" width="100%" height="250px" alt="Image" name="CoverPic" />
                                                <button id="save" type="button" onClick={() => this.removePicture()} className="removeBtn btn-fill-red">Remove <i className="fa fa-trash"></i></button>

                                            </div>}

                                            <p className="instructionImg" style={{color: '#c48fb4'}}>{!this.props.articleImage && "Select Image From Your Device"}</p>
                                            {/* <input id="fileElement" type="file" style={{ "position": "absolute", "top": "-1000px" }} accept="image/x-png,image/jpg, image/jpeg"
                                                onChange={(e) => this.loadImage(e.target.files)}   ></input> */}

                                            <label className="infoImg" style={{color: '#c48fb4'}}>Use wide images (1280 * 760px) for a better viewing on group page</label>
                                        </div>
                                    </div>

                                    <div className="articlefieldBox ">
                                        <div className="articlefieldBox">
                                            <Label>Choose Location</Label>
                                            <div className="flexRow">
                                                <input type="text" className="articlefield videoLinkField" id="gmap_geocoding_address" placeholder="Tag in a Location" value={this.state.locationValue} onChange={(e) => this.makeAutoComplete(e)} />
                                            </div>
                                            {this.state.location.length != 0 && <div className="placesAutoComplete" >
                                                {this.state.location.map((item, index) => {
                                                    return (<div className="locationList" onClick={() => this.onClickCity(index)}><span className="locationPrediction"> <i className="fa fa-map-marker" aria-hidden="true"></i> {item}</span></div>)
                                                })}
                                            </div>}
                                            <span style={{ "color": "#a94442" }}> {this.validator.message('location', this.state.address, 'required')} </span>
                                            <div id="locationMap" className="locationMap">
                                                <GoogleMapComponent latitude={this.state.latitude}
                                                    longitude={this.state.longitude} radius={0}
                                                    containerElement={<div style={{ position: "relative", overflow: "hidden", flex: 1 }} />}
                                                    mapElement={<div style={{ height: `224px` }} />} />
                                            </div>
                                        </div>
                                    </div>

                                    <span style={{ "color": "#a94442" }}> {this.validator.message('tags', this.state.tags, 'required')} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <If condition={(this.state.groupType == "Private") || (this.state.groupType == "Invited_Only")}>
                            <NewGroupCards />
                        </If>
                    </div>
                    <div className="haCenter">
                        <button type="button" onClick={() => this.onSave()} className="articlepostBtn btn-fill-blue">START Community</button>
                    </div>
                    <div className="haCenter">
                        <button type="button" className="upBtn" onClick={(e) => this.scrollup(e)}><i className="fa fa-angle-up" aria-hidden=""></i></button>
                    </div>
                    {/* {this.state.openCroppingModal && <CroppingModal image={this.state.imageToCrop} onCrop={this.onCropImage} />} */}
                </Container>
                <Footer />
            </React.Fragment >
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log("props chec------>", ownProps)
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let userId = state.Authentication.loggedUserId;
    let articleImage = state.MyProfile.articleImage;
    let groupImageUrl = state.MyProfile.aricleImageUrl;

    return {
        currentUrl,
        userId,
        articleImage,
        groupImageUrl
    };
}

function mapDispatchToProps(dispatch) {
    return {
        tagActions: bindActionCreators(TagActions, dispatch),
        myprofileaction: bindActionCreators(Myprofileaction, dispatch),
        groupAction: bindActionCreators(GroupAction, dispatch),
        managedMediaActions: bindActionCreators(ManagedMediaActions, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);