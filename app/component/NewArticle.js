import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import GoogleMapComponent from "./maps/googleMap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ArticleActions from "../actions/popularArticleActions";
import * as GroupActions from "../actions/groupActions";
import * as TagActions from "../actions/tagsActions";
import * as Myprofileaction from "../actions/myprofileAction";
import * as ManagedMediaActions from "../actions/ManagedMediaActions";
import * as MyArticleAction from "../actions/myarticleAction";
import CreatableSelect from "react-select/creatable";
import RichEditor from "./richeditor/RichEditor";
import SimpleReactValidator from "simple-react-validator";
import { Container, Spinner } from "react-bootstrap";
import ImageCrop from "../common/imageCrop";
import axios from "axios";

import styled from "styled-components";

const Section = styled.div`
  /* ------------------- */
`;

const SecHeader = styled.div`
  padding: 50px 0px 0px 0px;
  align-items: flex-end;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-top: 18px;

  @media only screen and (max-width: 480px) {
    padding: 50px 0 0px 0;
  }
`;

const SecTitle = styled.div`
  /* ----------------------- */
`;

const SecNameL = styled.label`
  text-align: left;
  font: Bold 40px/34px Lato;
  letter-spacing: 0;
  color: #024b99;
`;
const SecNameG = styled.label`
  text-align: left;
  font: Bold 40px/34px Lato;
  letter-spacing: 0;
  color: #BB4D9A;
`;

const SecDescL = styled.label`
  font: 26px/30px Lato;
  letter-spacing: 0;
  color: #024b99;
  opacity: 1;
  display: block;
  margin-top: 10px;
`;

const SecDescG = styled.label`
  font: 26px/30px Lato;
  letter-spacing: 0;
  color: #BB4D9A;
  opacity: 1;
  display: block;
  margin-top: 10px;
`;

const ArticleSec = styled.div`
  position: relative;
  padding: 0px;
`;

const ArticleSecContent = styled.div`
  /* display: flex;
  flex-flow: row; */
  justify-content: space-between;
`;

const ArticleImageBox = styled.div`
  /* margin: 20px; */
  flex: 1;
`;

const CoverImageBox = styled.div`
  margin-top: 45px;
`;

const FieldTitleG = styled.label`
 color: #bb4d9a;
`;

const FieldTitleL = styled.label`
  color: #024b99;
`;

const ImageHolder = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  border: 1px dashed #024b99;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const InstructionImgL = styled.p`
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

const InstructionImgG = styled.p`
  margin-left: 50%;
  color: #BB4D9A;
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

const InfoImgL = styled.label`
  position: absolute;
  bottom: 10px;
  left: 0px;
  right: 0px;
  color: #024b99;
  font: bold 11px/15px lato;
  text-transform: uppercase;
  text-align: center;
`;

const InfoImgG = styled.label`
  position: absolute;
  bottom: 10px;
  left: 0px;
  right: 0px;
  color: #BB4D9A;;
  font: bold 11px/15px lato;
  text-transform: uppercase;
  text-align: center;
`;

const ArticleFieldBox = styled.div`
  margin-top: 15px;
`;
const Content = styled.div`
  display: flex;
  flex-flow: row;
`;

const Input = styled.input`
  background: #ffffff;
  border-radius: 10px;
  border: none;
  text-align: left;
  font: 16px/16px Lato;
  letter-spacing: 0;
  padding: 15px 10px;
  width: 50%;
  transition: all 200ms ease-out;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const ArticleFieldsBox = styled.div`
  flex: 1;
  /* margin: 0 20px; */
`;

const ArticleFieldsBoxEqual = styled.div`
  flex: 1;
  /* margin: 20px; */
`;

const FlexRowWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`;

const FlexColumnWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const LocaFlexRowWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-top: 20px;
  @media only screen and (max-width: 480px) {
    display: block;
  }
`;

const IntroductionTextArea = styled.textarea`
  background: #ffffff;
  border-radius: 10px;
  border: none;
  text-align: left;
  font: 16px/16px Lato;
  letter-spacing: 0;
  padding: 15px 10px;
  width: 50%;
  transition: all 200ms ease-out;

  height: 70px;
  /* resize: none; */
  width: 100%;
`;

const SelectFieldBox = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

const LocationMap = styled.div`
  height: 224px;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 40px;
`;

const LoadingSave = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index:6;
    left: 50%;
    /* vertical-align: text-bottom; */
    text-align: center;
`;

class NewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: null,
      userId: this.props.userId,
      title: "",
      introduction: "",
      content: " ",
      tags: [],
      latitude: 51.509865,
      longitude: -0.118092,
      locationTag: "",
      address: "",
      openPhotoModal: false,
      image: "",
      selectedOption: null,
      allTags: [],
      imageToCrop: null,
      userName: "",
      groups: [],
      groupList: [],
      selectedGroup: [],
      selectgroupsId: [],
      videourl: "",
      imageUrl: null,

    };
    this.state = {
      id: null,
      userId: this.props.userId,
      title: "",
      introduction: "",
      content: " ",
      tags: [],
      latitude: 51.509865,
      longitude: -0.118092,
      locationTag: "",
      address: "",
      openPhotoModal: false,
      image: "",
      selectedOption: null,
      allTags: [],
      imageToCrop: null,
      userName: "",
      groups: [],
      groupList: [],
      selectedGroup: [],
      selectgroupsId: [],
      videourl: "",
      page: "New Article",
      aspectRatio: 16 / 9,
      location: [],
      saving: false,

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

    this.props.myprofileaction.getmyprofile(this.props.userId).then((resp) => {
      this.setState({
        userName: resp["firstName"] + " " + resp["lastName"],
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
    this.props.managedMediaActions.uploadMediaFile({
      filename: null,
      file: null,
      src: null,
    });
  }

  makeAutoComplete = (e) => {
    if (e.target.value.length > 0 && this.validator.fieldValid("Title")) {
      this.setState({
        saving: true
      })
    }
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
          locationTag: location.locationTag,
          address: locationValue,
          saving: true
        }, () => {
          this.autoSave()
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

  updatePlace = () => {
    console.log("Func Exectured!");
    // this.state.userTags.filter(x => x.tagType == true).map(x => x.tagName);
    // console.log(this.state.selectedGroup,"selected groups");
    // selectgroups = this.state.selectedGroup ? this.state.groups.filter(x => x.name == this.state.selectedGroup).map(x => x.id) : '';
    // this.state.selectedGroup.length <= 1 ? '' : '';
    // console.log("selected group Ids:", selectgroups);

    // if (this.state.selectedGroup) {
    //     if (this.state.selectedGroup.length <= 1) {
    //         let selectgroupsId = [];
    //         selectgroupsId = selectgroups.push(this.state.groups.filter(x => x.name == this.state.selectedGroup).map(x => x.id));
    //         console.log("selectgroupsId", selectgroupsId);

    //     }
    //     else {
    //         console.log("Array length is:", this.state.selectedGroup.length);
    //     }
    // }
  };

  onChange = (e) => {
    let location = this.state.locations[0];
    location.radius = e.target.value;
    this.setState({
      locActions: [location],
    });
  };

  extractAttribute(place, attribute) {
    const foundObject = place.address_components.filter(
      (component) => component.types.indexOf(attribute) >= 0
    );
    return foundObject.length > 0 ? foundObject[0].long_name : null;
  }

  componentWillReceiveProps = (nextProps) => {
    // console.log("this props",this.props.aricleImageUrl)
    // console.log("nextProps",nextProps.aricleImageUrl)
    if (this.props.aricleImageUrl != nextProps.aricleImageUrl) {
      this.setState({
        imageUrl: nextProps.aricleImageUrl,
      });
    }
  }



  autoSave = () => {
    if (this.validator.fieldValid("Title") && this.state.title.length >= 4) {

      let data = {
        adImage: null,
        adUrl: null,
        id: this.state.id,
        title: this.state.title,
        introduction: this.state.introduction,
        content: this.state.content,
        tags: this.state.tags,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        locationTag: "",
        address: this.state.address,
        category: "",
        groups: this.state.selectgroupsId,
        image: this.state.imageUrl,
        userId: this.props.userId,
        publicMediaType: "IMAGE",
        videoUrl: this.state.videourl,
      };
      this.props.articleActions.saveArticle(data).then((resp) => {

        let id = this.state.id ? this.state.id : resp.id
        // if (!this.state.id) {
        //   id = resp.id
        // }
        // else {
        //   id = this.state.id
        // }


        this.setState({
          id: id,
          saving: false
        })

      })




    }


  }

  postAll = async () => {
    if (this.state.imageUrl) {
      return this.state.imageUrl;



    }

    return axios
      .get(
        `https://api.unsplash.com/search/photos?query=${this.state.tags[0]}&per_page=1&client_id=VTn01gGafvn6lQ6SiLyjZlZ_KWl0Asn80pJ_IciXOqA`
      )
      .then((res) => {
        return res.data.results[0].links.download;
      });
  };



  onSave = (e) => {
    if (this.props.group != undefined) {
      this.setState({
        selectgroupsId: [this.props.group.id]
      })
    }
    this.postAll().then((res) => {
      let imageUrl = res;
      // console.log("imageUrl", imageUrl);
      let data = {
        adImage: null,
        adUrl: null,
        id: this.props.id,
        title: this.state.title,
        introduction: this.state.introduction,
        content: this.state.content,
        tags: this.state.tags,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        locationTag: "",
        address: this.state.address,
        category: "",
        groups: this.state.selectgroupsId,
        image: imageUrl,
        userId: this.props.userId,
        publicMediaType: "IMAGE",
        videoUrl: this.state.videourl,
        type:this.props.group?this.props.group.groupType.toUpperCase() : "PUBLIC"
      };

      if (this.validator.allValid()) {
        this.props.articleActions.saveArticle(data).then((resp) => {
          if (e === "save") {
            this.onPublish(resp.id);
            swal({
              title: "Article published successfully",
              text: "Article has been published successfully",
              icon: "success",
              timer: 900,
            });
            this.setState({
              id: resp.id,
            });
            return this.props.history.push(`/article/${resp.slug}`);
          }
          if (e === "draft") {
            swal({
              title: "Article saved as draft",
              text: "Article has been saved as draft successfuly",
              icon: "success",
              timer: 900,
            });
            this.props.history.goBack();
          }
          const initial = this.initialState;
          this.setState({
            ...initial,
          });
        });
      } else {

        if (e === "draft" && this.validator.fieldValid("Title") && this.validator.fieldValid("introduction")) {

          this.props.articleActions.saveArticle(data).then((resp) => {

            swal({
              title: "Article saved as draft",
              text: "Article has been saved as draft successfuly",
              icon: "success",
              timer: 900,
            }).then(() => {

              this.props.history.goBack();

            });


          })
          return;

        }
        this.validator.showMessages();
        if (!this.validator.fieldValid("Title")) {
          const id = "titleId";
          const yourElement = document.getElementById(id);
          yourElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (!this.validator.fieldValid("introduction")) {
          const id = "introId";
          const yourElement = document.getElementById(id);
          yourElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (!this.validator.fieldValid("tags")) {
          const id = "tagsId";
          const yourElement = document.getElementById(id);
          yourElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (!this.validator.fieldValid("location")) {
          const id = "locationId";
          const yourElement = document.getElementById(id);
          yourElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        this.forceUpdate();
      }

    })


  }





  onPublish = (id) => {
    this.props.articleActions.publishArticle(id).then(() => { });
  };

  onChangeItems = (e) => {

    if (e.target.id === "introduction" && e.target.value.length < 256) {

      this.setState({
        [e.target.id]: e.target.value,
        saving: true
      }, () => {
        this.autoSave()
      });
    } else if (e.target.id === "title" && e.target.value.length <= 180) {
      this.setState({
        [e.target.id]: e.target.value,
      })
      if (e.target.value.length >= 4) {
        this.setState({
         
          saving: true
        }, () => {
          this.autoSave()
        }
        );
      }
    }
    if (e.target.id !== "introduction" && e.target.id !== "title") {

      this.setState({
        [e.target.id]: e.target.value,
        saving: true
      });
    }
  };

  openPhotoPopup = () => {
    this.setState({
      openPhotoModal: true,
    });
  };

  onSelectImage = (imgurl) => {
    this.setState({
      image: imgurl,
      openPhotoModal: false,
    });
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
          saving: true
        }, () => {
          this.autoSave()
        });
      }
    }
    else {
      this.setState({

        selectedGroup: [],
        selectgroupsId: [],
        saving: true

      }, () => {
        this.autoSave()
      })


    }
    // let selectgroupsId = this.state.selectgroupsId ? this.state.selectgroupsId : [];
    // console.log("selectgroupId", selectgroupsId);
  };

  hidingModal = () => {
    this.setState({
      openCroppingModal: false,
    });
  };

  changeTags = (e) => {

    if (e) {
      this.setState({
        tags: e,
        saving: true
      }, () => {
        this.autoSave()
      });
    }

    else {

      this.setState({
        tags: [],
        saving: true

      }, () => {
        this.autoSave()
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

  openFile = () => {
    if (!this.props.articleImage) {
      this.setState({
        openCroppingModal: true,
      });
    }

    // document.getElementById('fileElement').click();
  };

  loadImage = (files) => {
    if (files.length) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          imageToCrop: e.target.result,
        });
      };
      reader.readAsDataURL(files[0]);
    }
    this.setState({
      openCroppingModal: true,
    });
  };

  onOpen = () => {
    let media = this.state.selectedMedia;
    this.props.onSelect(`/media/${media.directory}/${media.fileName}`);
  };

  onCropImage = (filename, file) => {
    ManagedMediaActions.uploadMediaFile(filename, file)
      .then((savedMedia) => {
        let media = savedMedia;
        this.setState({
          activePage: 1,
          imageToCrop: null,
          loading: false,
          selectedMedia: savedMedia,
          image: `/media/${media.directory}/${media.fileName}`,
          openCroppingModal: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onform = (e) => {
    return "Create " + e + " option";
  };

  scrollup() {
    // window.scrollTo(0, 0);
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }

  changeContent = (e) => {

    this.setState({
      content: e,
      saving: true
    },
      () => {
        this.autoSave()
      });
  };

  onBlur = () => {
    console.log("OnBlur Involed!");
  };
  removePicture = () => {
    this.props.managedMediaActions.uploadMediaFile({
      filename: null,
      file: null,
      src: null,
    });
    this.props.myArticleAction.getImageUrl({ fileName: null, directory: null });
  }

  render() {
    const SecName = this.props.group ? SecNameG : SecNameL
    const SecDesc = this.props.group ? SecDescG : SecDescL
    const InstructionImg = this.props.group ? InstructionImgG : InstructionImgL   
    const InfoImg = this.props.group ? InfoImgG : InfoImgL
    const FieldTitle = this.props.group ? FieldTitleG : FieldTitleL
    return (
      <React.Fragment>
        <Header currentUrl={this.props.currentUrl} isGroup = {this.props.group ? true : false} />

        {this.state.openCroppingModal && (
          <ImageCrop
            show={this.state.openCroppingModal}
            hideModal={() => this.hidingModal()}
            page={this.state.page}
            aspectRatio={this.state.aspectRatio}
          />
        )}
        <Container>
          {this.state.saving &&
            <LoadingSave>
              <span>Saving</span>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </LoadingSave>}

          <Section>
            <SecHeader>
              <SecTitle>
                <SecName>New Article</SecName>
                <br />
                <SecDesc>by {this.state.userName}</SecDesc>
              </SecTitle>
            </SecHeader>
            <ArticleSec>
              <ArticleSecContent>
                <ArticleImageBox>
                  <CoverImageBox>
                    <FieldTitle>Cover Image</FieldTitle>
                    <div className={this.props.articleImage ? "imageHolder-img" : "imageHolder"} onClick={this.openFile} id="titleId" >
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
                      <InstructionImg>
                        {!this.props.articleImage &&
                          "Select Image From Your Device"}
                      </InstructionImg>
                      {/* <input id="fileElement" type="file" style={{ "position": "absolute", "top": "-1000px" }} accept="image/x-png,image/jpg, image/jpeg"
                                                onChange={(e) => this.loadImage(e.target.files)}   ></input> */}
                      <InfoImg>
                        Use wide images (1280 * 760px) for a better viewing on
                        article page
                      </InfoImg>
                    </div>
                  </CoverImageBox>
                  <ArticleFieldBox>
                    <FieldTitle>Title</FieldTitle>
                    <Content>
                      <Input
                        type="text"
                        id="title"
                        value={this.state.title}
                        onChange={this.onChangeItems}
                        placeholder="Up to 180 character"
                      />
                    </Content>
                    <span style={{ color: "#a94442" }}>
                      {" "}
                      {this.validator.message(
                        "Title",
                        this.state.title,
                        "required|string"
                      )}{" "}
                    </span>
                  </ArticleFieldBox>
                </ArticleImageBox>
              </ArticleSecContent>
              <ArticleFieldsBox>
                <FlexColumnWrapper>
                  <ArticleFieldBox>
                    <FieldTitle>Introduction</FieldTitle>
                    <Content>
                      <IntroductionTextArea
                        id="introduction"
                        onChange={this.onChangeItems}
                        value={this.state.introduction}
                        placeholder="Up to 256 character"
                      ></IntroductionTextArea>
                    </Content>
                    <span style={{ color: "#a94442" }}>
                      {" "}
                      {this.validator.message(
                        "introduction",
                        this.state.introduction,
                        "required|string"
                      )}{" "}
                    </span>
                  </ArticleFieldBox>
                  <ArticleFieldBox>
                    <FieldTitle>Tell us your story</FieldTitle>
                    <RichEditor
                      ref="editor"
                      content={this.state.content}
                      placeholder="Max 10,000 characters"
                      onChange={this.changeContent}
                      onBlur={this.onBlur}
                    />
                    <span style={{ color: "#a94442" }}>
                      {" "}
                      {!this.state.content &&
                        "Entering Introduction is mandatory"}{" "}
                    </span>
                  </ArticleFieldBox>
                </FlexColumnWrapper>
              </ArticleFieldsBox>

              <LocaFlexRowWrapper>
                <ArticleFieldsBoxEqual>
                  <FlexColumnWrapper>
                    <ArticleFieldBox>
                      <FieldTitle>Tags</FieldTitle>
                      <SelectFieldBox>
                        <CreatableSelect
                          style={{ width: "500px" }}
                          isMulti
                          formatCreateLabel={this.onform}
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
                        />
                      </SelectFieldBox>
                      <span style={{ color: "#a94442" }}>
                        {" "}
                        {this.validator.message(
                          "tags",
                          this.state.tags,
                          "required"
                        )}{" "}
                      </span>
                    </ArticleFieldBox>

                    <ArticleFieldBox>
                      <FieldTitle>Submit to Community</FieldTitle>
                      <FlexRowWrapper>
                        {this.props.group != undefined ?
                          <input className="form-control inputHeight" value={this.props.group.name} disabled></input> :

                          <CreatableSelect
                            style={{ "width": "500px" }}
                            isMulti
                            formatCreateLabel={this.onform}
                            value={this.state.selectedGroup}
                            onChange={this.changeGroups}
                            onCreateOption={this.newGroups}
                            getOptionLabel={(option) => option.label ? option.label : option}
                            getOptionValue={(option) => option.value ? option.value : option}
                            options={this.state.groupList}

                          // onInputChange={this.updatePlace}
                          />
                        }
                      </FlexRowWrapper>
                    </ArticleFieldBox>

                    <ArticleFieldBox>
                      <FieldTitle>Choose Location</FieldTitle>
                      <FlexRowWrapper>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          className="articlefield"
                          id="gmap_geocoding_address"
                          placeholder="Tag in a Location"
                          value={this.state.locationValue}
                          onChange={(e) => this.makeAutoComplete(e)}
                        />
                      </FlexRowWrapper>
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

                      <span style={{ color: "#a94442" }}>
                        {" "}
                        {this.validator.message(
                          "location",
                          this.state.address,
                          "required"
                        )}{" "}
                      </span>
                    </ArticleFieldBox>
                  </FlexColumnWrapper>
                </ArticleFieldsBoxEqual>
                <ArticleFieldsBoxEqual>
                  <FlexColumnWrapper>
                    <ArticleFieldBox>
                      <LocationMap>
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
                          mapElement={<div style={{ height: `245px` }} />}
                        />
                      </LocationMap>
                    </ArticleFieldBox>
                  </FlexColumnWrapper>
                </ArticleFieldsBoxEqual>
              </LocaFlexRowWrapper>
            </ArticleSec>
          </Section>
          <div className="haCenter">
            <button
              id="draft"
              type="button"
              onClick={() => this.onSave("draft")}
              className="articlesaveBtn btn-fill-blue btn-solid-border"
            >
              SAVE AS DRAFT
            </button>
            <button
              id="save"
              type="button"
              onClick={() => this.onSave("save")}
              className="articlepostBtn btn-fill-blue"
            >
              POST ARTICLE
            </button>
          </div>
          <div className="haCenter">
            <button
              type="button"
              className="upBtn"
              onClick={(e) => this.scrollup(e)}
            >
              <i className="fa fa-angle-up" aria-hidden=""></i>
            </button>
          </div>
          {/* {this.state.openCroppingModal && <CroppingModal image={this.state.imageToCrop} onCrop={this.onCropImage} />} */}
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
  let aricleImageUrl = state.MyProfile.aricleImageUrl;


  let group = ownProps.location.group







  return {
    isLoggedIn,
    locations,
    currentUrl,
    userId,
    articleImage,
    aricleImageUrl,
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
