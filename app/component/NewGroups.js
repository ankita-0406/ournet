import React from "react";
import { Container } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import GoogleMapComponent from "./maps/googleMap";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

import * as Myprofileaction from '../actions/myprofileAction';
import * as TagActions from '../actions/tagsActions';
import * as GroupAction from "../actions/groupActions";
import '../../style/component/NewGroup.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CroppingModal from './CroppingModal';

import SimpleReactValidator from 'simple-react-validator';
import ImageCrop from '../common/imageCrop';
import * as ManagedMediaActions from '../actions/ManagedMediaActions';

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const MainComponentsBox = styled.div`
  @media only screen and (max-width: 480px) {
    margin: 20px;
  }
`;

const NewGroupTitleBox = styled.div`
  padding: 50px 0 0px 0;
  display: flex;
  flex-flow: row;
  @media only screen and (max-width: 480px) {
    display: block;
    flex-flow: row;
    text-align: left;
  }
`;

const H1 = styled.h1`
  color: #bb4d9a;
  font: Black 40px/34px Lato;
  opacity: 1px;
  font-size: 30px;
  font-weight: bolder;
`;

const Label = styled.label`
  color: #bb4d9a !important;
  font: Black 24px/34px Lato;
  opacity: 1px;
  
`;

const MainGroupsWrapper1 = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 22px;

  @media only screen and (max-width: 480px) {
    display: inline;
    text-align: center;
  }
`;
const MainTitleHeading = styled.div`
  @media only screen and (max-width: 480px) {
    text-align: left;
  }
`;

const MainSqureBoxWrapper = styled.div`
  display: flex;
  flex-flow: row;
  margin-left: 129px;


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
  margin: 0 50px 0px 0px;
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
const NameField = styled.input`
  background: #ffffff;
  border-radius: 10px;
  border: none;
  text-align: left;
  font: 16px/16px Lato;
  letter-spacing: 0;
  padding: 15px 10px;
  width: 100%;
  transition: all 200ms ease-out;
`;

const NameFieldWrapper = styled.div`
  margin-left: 120px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const GroupDescriptionField = styled.textarea`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  border: none;
  text-align: left;
  font: 16px/20px Lato;
  letter-spacing: 0;
  transition: all 200ms ease-out;

  height: 110px;
  resize: none;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const GroupDescriptionFieldWrapper = styled.div`
  margin-left: 85px;
  width: 700px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const TagSelectWrapper = styled.div`
  margin-left: 178px;
  width: 700px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const GroupImageWrapper = styled.div`
  margin-left: 122px;
  width: 700px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const GroupLocationWrapper = styled.div`
  margin-left: 105px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const GoogleMapComponentWrapper = styled.div`
  margin-left: 207px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 700px;
  margin-left: 215px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
    display: block;
  }
`;

const Rapper = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 22px;

  @media only screen and (max-width: 480px) {
    display: block;
    flex-flow: column;
  }
`;

class NewGroups extends React.Component {
  // state = {
  //   selectedOption: null,
  // };


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
      groupType:"PUBLIC"
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

  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
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


  onSave = (option) => {
    if (option == "finish") { 
    let imageUrl = this.props.groupImageUrl;
    const data = {
      id: null,
      name: this.state.gname,
      paymentPlanId: 1,
      parentGroupId: null,
      description: this.state.description,
      phone: '',
      email: "",
      website: "",
      linkedin: null,
      twitter: null,
      facebook: null,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      groupType: "PUBLIC",
      image: imageUrl,
      tags: this.state.tags,
      locationTag: "",
      admins: [],
      membersToInvite: [],
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







render() {
  const { selectedOption } = this.state;
  return (
    <React.Fragment>
      <Header />
      {this.state.openCroppingModal &&

        <ImageCrop show={this.state.openCroppingModal} hideModal={() => this.hidingModal()} page={this.state.page} aspectRatio={this.state.aspectRatio} />
      }
      <Container>

        <MainComponentsBox>

          <NewGroupTitleBox>
            <H1>New Communities </H1>
          </NewGroupTitleBox>

          <MainGroupsWrapper1>

            <MainTitleHeading>
              <Label>Communities Type</Label>
            </MainTitleHeading>

            <MainSqureBoxWrapper>
              <SqureBox>
                <DivContent>
                  <H4 className="colorh4">1</H4>
                  <H6 className="colorh6">Public</H6>
                  <P>Open to all</P>
                  <Input type="radio" id="Public" name="groupType" value="Public" onChange={(e)=>{this.setState({groupType:e.target.value})}}/>
                </DivContent>
              </SqureBox>
              <SqureBox>
                <DivContent>
                  <H4 className="colorh4">2</H4>
                  <H6 className="colorh6">Private</H6>
                  <P>Publicly visible with Private Membership</P>
                  <Input type="radio" id="Private" name="groupType" value="Private" onChange={(e)=>{this.setState({groupType:e.target.value})}} />
                </DivContent>
              </SqureBox>
              <SqureBox>
                <DivContent>
                  <H4 className="colorh4">3</H4>
                  <H6 className="colorh6">Invited Only</H6>
                  <P>Hidden and Invitation only</P>
                  <Input type="radio" id="Invited Only" name="groupType" value="Invited Only" onChange={(e)=>{this.setState({groupType:e.target.value})}}/>
                </DivContent>
              </SqureBox>
            </MainSqureBoxWrapper>
          </MainGroupsWrapper1>

          <Rapper>
            <Label>Communities Name</Label>
            <NameFieldWrapper>
              <NameField
                type="text"
                id="gname"
                value={this.state.gname}
                onChange={this.onChangeItems}
                // className="articlefield titleField"
                placeholder="Up to 80 character"
              />
            </NameFieldWrapper>
          </Rapper>

          <Rapper>
            <Label>Communities Description</Label>
            <GroupDescriptionFieldWrapper>
              <GroupDescriptionField
                // className="profilefield"
                name="description"
                defaultValue=""
                placeholder="Up to 300 character">
              </GroupDescriptionField>
            </GroupDescriptionFieldWrapper>
          </Rapper>

          <Rapper>
            <Label>Tags </Label>
            <TagSelectWrapper>
              <CreatableSelect
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                placeholder="Select, or add your own tags"
              />
            </TagSelectWrapper>
          </Rapper>

          <Rapper>
            <Label> Communities Image </Label>
            <GroupImageWrapper>
              <div className="imageHolder" onClick={this.openFile} id="titleId">
                {this.props.articleImage && (
                  <div className="coverSelctedPicWrapper">
                    <img
                      src={this.props.articleImage}
                      className="coverSelctedPic"
                      width="100%"
                      height="250px"
                      alt="Image"
                      name="CoverPic"
                    />
                    <button
                      id="save"
                      type="button"
                      onClick={() => this.removePicture()}
                      className="removeBtn btn-fill-red"
                    >
                      Remove <i className="fa fa-trash"></i>
                    </button>
                  </div>
                )}

                <p className="instructionImg">
                  {!this.props.articleImage && "Select Image From Your Device"}
                </p>
                {/* <input id="fileElement" type="file" style={{ "position": "absolute", "top": "-1000px" }} accept="image/x-png,image/jpg, image/jpeg"
                                                onChange={(e) => this.loadImage(e.target.files)}   ></input> */}

                <label className="infoImg">
                  Use wide images (1280 * 760px) for a better viewing on article
                  page
                </label>
              </div>
            </GroupImageWrapper>
          </Rapper>

          <Rapper>
            <Label>Community Location </Label>
            <GroupLocationWrapper>
              {/* <CreatableSelect
                  placeholder="Tag in a Location" 
                  value={this.state.locationValue} 
                  onChange={(e) => this.makeAutoComplete(e)}
                  options={this.state.location}
                /> */}
              <div className="flexRow">
                <input type="text" className="articlefield videoLinkField" id="gmap_geocoding_address" placeholder="Tag in a Location" value={this.state.locationValue} onChange={(e) => this.makeAutoComplete(e)} />
              </div>
              {this.state.location.length != 0 && <div className="placesAutoComplete" >
                {this.state.location.map((item, index) => {
                  return (<div className="locationList" onClick={() => this.onClickCity(index)}><span className="locationPrediction"> <i class="fa fa-map-marker" aria-hidden="true"></i> {item}</span></div>)
                })}
              </div>}
            </GroupLocationWrapper>
          </Rapper>

          <Rapper>
            <GoogleMapComponentWrapper>
              <GoogleMapComponent
                latitude={this.state.latitude}
                longitude={this.state.longitude} radius={0}
                containerElement={<div style={{ position: "relative", overflow: "hidden", flex: 1 }} />}
                mapElement={<div style={{ height: `224px` }} />} />
            </GoogleMapComponentWrapper>
          </Rapper>

          <Rapper>
            <ButtonsWrapper>
              <button id="cancel" type="button" onClick={() => this.onSave("cancel")} className="articlesaveBtn btn-fill-blue btn-solid-border">CANCEL</button>
              <button id="finish" type="button" onClick={() => this.onSave("finish")} className="articlepostBtn btn-fill-blue">FINISH</button>
            </ButtonsWrapper>
          </Rapper>

        </MainComponentsBox>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
}

function mapStateToProps(state, ownProps) {
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
    managedMediaActions: bindActionCreators(ManagedMediaActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroups);
