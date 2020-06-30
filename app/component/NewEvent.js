import React from "react";
import { Container, ProgressBar } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import GoogleMapComponent from "./maps/googleMap";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import { bindActionCreators } from "redux";
import ImageCrop from '../common/imageCrop';
import "react-datepicker/dist/react-datepicker.css";
import * as ArticleActions from "../actions/popularArticleActions";
import * as GroupActions from "../actions/groupActions";
import * as TagActions from "../actions/tagsActions";
import * as Myprofileaction from "../actions/myprofileAction";
import * as ManagedMediaActions from "../actions/ManagedMediaActions";
import * as MyArticleAction from "../actions/myarticleAction";
import { connect } from "react-redux";
import "../../style/component/Home.css"
import moment from "moment";
import * as EventAction from "../actions/eventActions";
import SimpleReactValidator from "simple-react-validator";
import { FusionTablesLayer } from "react-google-maps";




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

const H1G = styled.h1`
  color: #bb4d9a;
  font: Black 40px/34px Lato;
  opacity: 1px;
  font-size: 30px;
  font-weight: bolder;
`;

const H1E = styled.h1`
  color: #004b9c;
  font: Black 40px/34px Lato;
  opacity: 1px;
  font-size: 30px;
  font-weight: bolder;
`;

const LabelG = styled.label`
  color: #bb4d9a;
  font: Black 24px/34px Lato;
  opacity: 1px;
`;

const LabelE = styled.label`
  color: #004b9c;
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
      color: white;
      border: 2px #ffffff solid;
    }
    .colorh6 {
      color: white;
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
const TitleField = styled.input`
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
const IntroductionField = styled.input`
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

const PriceField = styled.input`
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

const EmailAddressField = styled.input`
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

const PhoneNumberField = styled.input`
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

const VenueNameField = styled.input`
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

const TitleFieldWrapper = styled.div`
  margin-left: 230px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const IntroductionFieldWrapper = styled.div`
  margin-left: 185px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const PriceFieldWrapper = styled.div`
  margin-left: 228px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const EmailAddressFieldWrapper = styled.div`
  margin-left: 175px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const PhoneNumberFieldWrapper = styled.div`
  margin-left: 170px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const VenueNameFieldWrapper = styled.div`
  margin-left: 183px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const DateAndTimeFieldWrapper = styled.div`
  margin-left: 150.5px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const InviteAdminsFieldWrapper = styled.div`
  margin-left: 210.5px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const WebsiteFieldWrapper = styled.div`
  margin-left: 212px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const LinkedInFieldWrapper = styled.div`
  margin-left: 210px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const TwitterFieldWrapper = styled.div`
  margin-left: 218px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const ProgressBarWrapper = styled.div`
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
  margin-left: 230px;
  width: 700px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;
const TaSelectWrapper = styled.div`
  margin-left: 130px;
  width: 700px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const TagsSelectWrapper = styled.div`
  margin-left: -143px;
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
  margin-left: 256px;
  width: 700px;
  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 700px;
  margin-left: 270px;

  @media only screen and (max-width: 480px) {
    margin: auto;
    width: 100%;
    display: block;
  }
`;

const Rapper = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 30px;

  @media only screen and (max-width: 480px) {
    display: block;
    flex-flow: column;
  }
`;
const LabelImgG = styled.label`
position: absolute;
  bottom: 10px;
  left: 0px;
  right: 0px;
  color: #bb4d9a;
  font: bold 11px/15px lato;
  text-transform: uppercase;
  text-align: center;
`;
const LabelImgE = styled.label`
position: absolute;
  bottom: 10px;
  left: 0px;
  right: 0px;
  color: #004b9c;
  font: bold 11px/15px lato;
  text-transform: uppercase;
  text-align: center;
`;
const PImgE = styled.p`
 margin-left: 50%;
  color: #024b99;
  font: 20px/22px lato;
  text-transform: uppercase;
  text-align: center;
  -webkit-transform: translate(-50%, 0%);
  -moz-transform: translate(-50%, 0%);
  -ms-transform: translate(-50%, 0%);
  -o-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
`;
const PImgG = styled.p`
 margin-left: 50%;
 color: #bb4d9a;
  font: 20px/22px lato;
  text-transform: uppercase;
  text-align: center;
  -webkit-transform: translate(-50%, 0%);
  -moz-transform: translate(-50%, 0%);
  -ms-transform: translate(-50%, 0%);
  -o-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
`;

class NewEvent extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      selectedOption: null,
      startDate: new Date(),
      endDate: new Date(),

      address: "",
      email: "",
      endDateRange: "",
      endTime: null,
      groups: [],
      groupList: [],
      selectedGroup: [],
      selectgroupsId: [],
      id: null,
      introduction: "",
      latitude: 51.509865,
      longitude: -0.118092,
      locationTag: [""],
      phoneNo: "",
      price: "",
      startDateRange: moment(new Date()).format("L"),
      startTime: 0,
      tags: [],
      allTags: [],
      title: "",
      venue: "",
      website: "",
      location: [],
      openCroppingModal: false,
      page: "newGroup",
      aspectRatio: 16 / 9,



    };
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    document.body.addEventListener("click", () => {
      setTimeout(() => {
        this.setState({
          location: [],
        });
      }, 20);
    });

    // const input = document.getElementById('gmap_geocoding_address');
    // let autocomplete = new google.maps.places.Autocomplete(input);
    // this.setState({
    //     autocomplete
    // })

    // autocomplete.addListener('place_changed', () => this.handlePlaceChanged());

    this.props.tagActions.getAllTags().then((resp) => {
      let tagsList = resp.map((resp) => {
        return resp.name;
      });
      this.setState({
        allTags: tagsList,
      });
    });



    this.props.groupActions.getGroups().then((resp) => {
      console.log("Groups:", resp.groups);
      let groupList = resp.groups.map((resp) => {
        return resp.name;
      });
      let groups = resp.groups.map((resp) => {
        return resp;
      });
      this.setState({
        groupList,
        groups,
      });
    });

    this.scrollup();
  }

  componentWillUnmount() {
    this.props.managedMediaActions.uploadMediaFile({ filename: null, file: null, src: null })

  }


  makeAutoComplete = (e) => {

    let displaySuggestions = (predictions, status) => {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        // alert(status);
        return;
      }
      let location = [];

      predictions.forEach((prediction) => {
        location.push(prediction.description);
        console.log("location", prediction);
      });

      this.setState({
        location: location,
      });
    };

    let service = new google.maps.places.AutocompleteService();
    this.setState({
      locationValue: e.target.value,

    });
    service.getQueryPredictions({ input: e.target.value }, displaySuggestions);
  };

  onClickCity(index) {
    let geocoder = null;
    let locationValue = this.state.location[index];
    let countryName = locationValue.split(",")[
      locationValue.split(",").length - 1
    ];


    this.setState({
      location: [],
      address: locationValue

    });

    geocoder = new google.maps.Geocoder();

    let address = this.state.location[index];
    geocoder.geocode({ address: address }, (results, status) => {
      if (status == "OK") {
        console.log(results[0].geometry.location);
        let location = {};
        location.lat = results[0].geometry.location.lat();
        location.lng = results[0].geometry.location.lng();
        location.locationTag = countryName;
        this.setState({
          locationValue: locationValue,
          latitude: location.lat,
          longitude: location.lng,
          locationTag: [location.locationTag],
          address: locationValue,

        });
        // map.setCenter(results[0].geometry.location);
        // var marker = new google.maps.Marker({
        //     map: map,
        //     position: results[0].geometry.location
        // });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  handlePlaceChanged = () => {
    const place = this.state.autocomplete.getPlace();
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
      address: location.address,
    });
  };

  onChangeItems = (e) => {

    if (e.target.id === "introduction" && e.target.value.length < 120) {

      this.setState({
        [e.target.id]: e.target.value,

      });
    } else if (e.target.id === "title" && e.target.value.length <= 60) {
      this.setState({
        [e.target.id]: e.target.value,
      })
      if (e.target.value.length >= 4) {
        this.setState({

        }
        );
      }
    }
    if (e.target.id !== "introduction" && e.target.id !== "title") {

      this.setState({
        [e.target.id]: e.target.value,

      });
    }
  };

  changeGroups = (e) => {
    if (e) {
      let arrlist = [];
      for (let i = 0; i < e.length; i++) {
        const element = e[i];
        console.log(i, "th", element);
        console.log("typeof element", typeof element);
        let temp = this.state.groups
          .filter((x) => x.name == element)
          .map((x) => x.id);
        arrlist.unshift(temp.pop());
        console.log("temp[arr]:", arrlist);
        this.setState({
          selectedGroup: e,
          selectgroupsId: arrlist,

        });
      }
    }
    else {
      this.setState({

        selectedGroup: [],
        selectgroupsId: [],


      })


    }
    // let selectgroupsId = this.state.selectgroupsId ? this.state.selectgroupsId : [];
    // console.log("selectgroupId", selectgroupsId);
  };

  changeTags = (e) => {

    if (e) {
      this.setState({
        tags: e,

      });
    }

    else {

      this.setState({
        tags: [],


      });

    }
  }

  changeLocationTag = (e) => {
    if (e) {
      this.setState({
        locationTag: e
      })
    }
    else {

      this.setState({
        locationTag: [],


      });

    }
  }

  newGroups = (e) => {
    const newGroups = this.state.selectedGroup;
    newGroups.push(e);
    this.setState({
      selectedGroup: newGroups,
    });
  };

  newTags = (e) => {
    const newTags = this.state.tags;
    newTags.push(e);
    console.log("newTags", newTags);
    this.setState({
      tags: newTags,
    });
  };

  scrollup() {
    // window.scrollTo(0, 0);
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }






  handleChange = (date, type) => {

    if (type == "startDate") {
      this.setState({
        startDateRange: moment(date).format("L"),
        startTime: date.getHours() * 60 + date.getMinutes(),
        startDate: date,
      })

    }
    else if (type == "endDate") {
      this.setState({
        endDateRange: moment(date).format("L"),
        endTime: (date.getHours() * 60 + date.getMinutes()),
        endDate: date,
      })

    }

    console.log("whole state", this.state)
  };

  onPublish = (id) => {
    this.props.eventActions.publishEvent(id).then(() => { });
  };

  onSave = () => {

    if (this.validator.allValid()) {

      let data = {
        address: this.state.address,
        email: this.state.email,
        category: [],
        endDateRange: this.state.endDateRange,
        endTime: parseInt(this.state.endTime),
        groups: this.state.selectgroupsId,
        id: null,
        introduction: this.state.introduction,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        locationTag: this.state.locationTag[0],
        phoneNo: this.state.phoneNo,
        price: this.state.price,
        startDateRange: this.state.startDateRange,
        startTime: parseInt(this.state.startTime),
        tags: this.state.tags,
        title: this.state.title,
        venue: this.state.venue,
        website: "",
        image:  this.props.eventsImageUrl
      };

      this.props.eventActions.postEvent(data).then((res) => {
        this.onPublish(res.id);
        swal({
          title: "Event Published",
          text: "Event has been published successfuly",
          icon: "success",
          timer: 1000,
        }).then(() => {

          this.props.history.goBack();

        });

      })
    }
    else {
      this.validator.showMessages();
    }

  }

  onCancel = ()=>{

    this.props.history.goBack();


  }

  openFile = () => {
    // document.getElementById('fileElement').click();
    if (!this.props.articleImage) {
      this.setState({
        openCroppingModal: true

      })
    }
  }

  hidingModal = () => {
    this.setState({
      openCroppingModal: false
    })
  }

  removePicture = () => {
    this.props.managedMediaActions.uploadMediaFile({ filename: null, file: null })

}


  render() {
    const now = 100;
    const { selectedOption } = this.state;
    const Label = this.props.location.group ? LabelG : LabelE
    const H1 = this.props.location.group ? H1G : H1E
    const LabelImg = this.props.location.group ? LabelImgG : LabelImgE
    const P = this.props.location.group ? PImgG : PImgE
    
    return (
      <React.Fragment>
        {this.state.openCroppingModal &&

          <ImageCrop show={this.state.openCroppingModal} hideModal={() => this.hidingModal()} page={this.state.page} aspectRatio={this.state.aspectRatio} />
        }
        <Header />
        <Container>
          <MainComponentsBox>
            <NewGroupTitleBox>
              <H1>New Event</H1>
            </NewGroupTitleBox>

            <Rapper>
            <Label>Image </Label>
            <GroupImageWrapper>
              <div style={{ marginLeft: '100px'}} className="imageHolder" onClick={this.openFile} id="titleId">
                {/* {this.props.articleImage && ( */}
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
                {/* )} */}

                <P>
                  {!this.props.articleImage && "Select Image From Your Device"}
                </P>
                {/* <input id="fileElement" type="file" style={{ "position": "absolute", "top": "-1000px" }} accept="image/x-png,image/jpg, image/jpeg"
                                                onChange={(e) => this.loadImage(e.target.files)}   ></input> */}

                <LabelImg>
                  Use wide images (1280 * 760px) for a better viewing on article
                  page
                </LabelImg>
              </div>
            </GroupImageWrapper>
          </Rapper>

            <Rapper>
              <Label>Title</Label>
              <TitleFieldWrapper>
                <TitleField
                  type="text"
                  id="title"
                  value={this.state.title}
                  onChange={this.onChangeItems}
                  // className="articlefield titleField"
                  placeholder="Max 60 characrers"
                />
                <span style={{ color: "#a94442" }}>
                  {" "}
                  {this.validator.message(
                    "Title",
                    this.state.title,
                    "required|string"
                  )}{" "}
                </span>
              </TitleFieldWrapper>
            </Rapper>

            <Rapper>
              <Label>Introduction</Label>
              <IntroductionFieldWrapper>
                <IntroductionField
                  type="text"
                  id="introduction"
                  value={this.state.introduction}
                  onChange={this.onChangeItems}
                  // className="articlefield titleField"
                  placeholder="Max 120 characrers"
                />
                <span style={{ color: "#a94442" }}>
                  {" "}
                  {this.validator.message(
                    "Introduction",
                    this.state.introduction,
                    "required|string"
                  )}{" "}
                </span>
              </IntroductionFieldWrapper>
            </Rapper>

            <Rapper>
              <Label>Price</Label>
              <PriceFieldWrapper>
                <PriceField
                  type="text"
                  id="price"
                  value={this.state.price}
                  onChange={this.onChangeItems}
                  // className="articlefield titleField"
                  placeholder="Ue.g: 20 $"
                />
                <span style={{ color: "#a94442" }}>
                  {" "}
                  {this.validator.message(
                    "Price",
                    this.state.price,
                    "required|string"
                  )}{" "}
                </span>
              </PriceFieldWrapper>
            </Rapper>

            <Rapper>
              <Label>Start and end date/time</Label>
              <DateAndTimeFieldWrapper>
                <form class="form-inline">
                  <div class="form-group">
                    {/* <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label> */}
                    <div class="input-group start-date">
                      <div class="input-group-addon">From</div>
                      <DatePicker
                        style={{ height: "45px" }}
                        selected={this.state.startDate}
                        onChange={(e) => this.handleChange(e, "startDate")}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="form-control"
                        id="startData"
                        placeholder="Amount"
                      />{" "}
                      <div class="input-group-addon">
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                      </div>
                    </div>

                    {/* <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label> */}
                    <div class="input-group end-date" style={{ marginLeft: '100px' }}>
                      <div class="input-group-addon end-date ">To</div>
                      <DatePicker
                        selected={this.state.endDate}
                        onChange={(e) => this.handleChange(e, "endDate")}

                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="form-control"
                      />

                      <div class="input-group-addon">
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </form>
              </DateAndTimeFieldWrapper>
            </Rapper>

            <Rapper>
              <Label>Email Address</Label>
              <EmailAddressFieldWrapper>
                <EmailAddressField
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.onChangeItems}
                  // className="articlefield titleField"
                  placeholder="Max 40 characrers"
                />
                <span style={{ color: "#a94442" }}>
                  {" "}
                  {this.validator.message(
                    "Email",
                    this.state.email,
                    "email"
                  )}{" "}
                </span>
              </EmailAddressFieldWrapper>
            </Rapper>

            <Rapper>
              <Label>Phone Number</Label>
              <PhoneNumberFieldWrapper>
                <PhoneNumberField
                  type="text"
                  id="phoneNo"
                  value={this.state.phoneNo}
                  onChange={this.onChangeItems}
                  // className="articlefield titleField"
                  placeholder="Max 10 characrers"
                />
                <span style={{ color: "#a94442" }}>
                  {" "}
                  {this.validator.message(
                    "Phone No.",
                    this.state.phoneNo,
                    "phone"
                  )}{" "}
                </span>
              </PhoneNumberFieldWrapper>
            </Rapper>

            <Rapper>
              <Label>Venue Name</Label>
              <VenueNameFieldWrapper>
                <VenueNameField
                  type="text"
                  id="venue"
                  value={this.state.venue}
                  onChange={this.onChangeItems}
                  // className="articlefield titleField"
                  placeholder="Up to 80 character"
                />
                <span style={{ color: "#a94442" }}>
                  {" "}
                  {this.validator.message(
                    "Venue",
                    this.state.venue,
                    "required|string"
                  )}{" "}
                </span>
              </VenueNameFieldWrapper>
            </Rapper>

            {/* <Rapper>
              <Label>Main Events Image</Label>
              <div className="coverImageBox coverImageBoxIn">

             
                <div className="imageHolder" onClick={() => this.openFile()}  >
                  {this.props.articleImage && <div className="coverSelctedPicWrapper"><img src={this.props.articleImage} className="coverSelctedPic" width="100%" height="250px" alt="Image" name="CoverPic" />
                    <button id="save" type="button" onClick={() => this.removePicture()} className="removeBtn btn-fill-red">Remove <i className="fa fa-trash"></i></button>

                  </div>}

                  <p className="instructionImg">{!this.props.articleImage && "Select Image From Your Device"}</p>
                 

                  <label className="infoImg">Use wide images (1280 * 760px) for a better viewing on group page</label>
                </div>
              </div>

            </Rapper> */}


            <MainComponentsBox>
              <Rapper>
                <Label>Location</Label>
                <InviteAdminsFieldWrapper>
                  <NameField
                    style={{ width: "60%" }}
                    type="text"
                    id="title"

                    // className="articlefield titleField"
                    value={this.state.locationValue}
                    onChange={(e) => this.makeAutoComplete(e)}
                    placeholder="Enter address or Post Code"
                  />
                  <span style={{ color: "#a94442" }}>
                    {" "}
                    {this.validator.message(
                      "Location",
                      this.state.address,
                      "required|string"
                    )}{" "}
                  </span>
                  {this.state.location.length != 0 && (
                    <div className="placesAutoComplete">
                      {this.state.location.map((item, index) => {
                        return (
                          <div
                            className="locationList"
                            onClick={() => this.onClickCity(index)}
                          >
                            <span className="locationPrediction">
                              {" "}
                              <i
                                className="fa fa-map-marker"
                                aria-hidden="true"
                              ></i>{" "}
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </InviteAdminsFieldWrapper>
                <TagsSelectWrapper>
                  <div style={{ width: "60%", marginLeft: '45px' }}>
                    <CreatableSelect
                      value={this.state.locationTag}
                      // options={this.state.locationTag}
                      // onChange={this.changeLocationTag}
                      // onChange={this.handleChange}

                      placeholder="Country"
                      getOptionLabel={(option) =>
                        option.label ? option.label : option
                      }
                      getOptionValue={(option) =>
                        option.value ? option.value : option
                      }
                    />

                  </div>
                </TagsSelectWrapper>
              </Rapper>
            </MainComponentsBox>

            <Rapper>
              <GoogleMapComponentWrapper>
                <GoogleMapComponent
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  radius={0}
                  containerElement={
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        flex: 1,
                      }}
                    />
                  }
                  mapElement={<div style={{ height: `224px` }} />}
                />
              </GoogleMapComponentWrapper>
            </Rapper>

            <Rapper>
              <Label>Tags </Label>
              <TagSelectWrapper>
                <CreatableSelect
                  isMulti

                  value={this.state.tags}
                  onChange={this.changeTags}
                  onCreateOption={this.newTags}
                  getOptionLabel={(option) =>
                    option.label ? option.label : option
                  }
                  getOptionValue={(option) =>
                    option.value ? option.value : option
                  }
                  options={this.state.allTags}
                  placeholder="Select, or add your own tags"
                />
                <span style={{ color: "#a94442" }}>
                  {" "}
                  {this.validator.message(
                    "Tags",
                    this.state.tags[0],
                    "required|string"
                  )}{" "}
                </span>
              </TagSelectWrapper>
            </Rapper>
            <Rapper>
              <Label>Submit to Community </Label>
              <TaSelectWrapper>
                <CreatableSelect
                  isMulti

                  value={this.state.selectedGroup}
                  onChange={this.changeGroups}
                  onCreateOption={this.newGroups}
                  getOptionLabel={(option) => option.label ? option.label : option}
                  getOptionValue={(option) => option.value ? option.value : option}
                  options={this.state.groupList}
                  placeholder="Select, or add your own community"
                />
                <span style={{ color: "#a94442" }}>
                  {" "}
                  {this.validator.message(
                    "Group",
                    this.state.selectedGroup[0],
                    "required|string"
                  )}{" "}
                </span>
              </TaSelectWrapper>
            </Rapper>



            <Rapper>
              <ButtonsWrapper>
                <button
                  id="cancel"
                  type="button"
                  onClick={() => this.onSave("cancel")}
                  className="articlesaveBtn btn-fill-blue btn-solid-border"
                >
                  SAVE
                </button>
                <button
                  id="finish"
                  type="button"
                  onClick={() => this.onCancel()}
                  className="articlepostBtn btn-fill-blue"
                >
                  CANCEL
                </button>
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
  console.log(ownProps, "djghkjsdhgjklsdgjkl")
  let currentUrl = ownProps.location ? ownProps.location.pathname : "";
  let isLoggedIn = state.Authentication.loggedIn;
  let locations = state.Locations.locations;
  let userId = state.Authentication.loggedUserId;
  let articleImage = state.MyProfile.articleImage;
  let eventsImageUrl = state.MyProfile.aricleImageUrl;


  let group = ownProps.location.group

  console.log("props--->" , ownProps)





  return {
    isLoggedIn,
    locations,
    currentUrl,
    userId,
    articleImage,
    eventsImageUrl,
    group

  };
}

function mapDispatchToProps(dispatch) {
  return {
    articleActions: bindActionCreators(ArticleActions, dispatch),
    tagActions: bindActionCreators(TagActions, dispatch),
    myprofileaction: bindActionCreators(Myprofileaction, dispatch),
    groupActions: bindActionCreators(GroupActions, dispatch),
    managedMediaActions: bindActionCreators(ManagedMediaActions, dispatch),
    myArticleAction: bindActionCreators(MyArticleAction, dispatch),
    eventActions: bindActionCreators(EventAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
