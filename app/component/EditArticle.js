import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import GoogleMapComponent from './maps/googleMap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ArticleActions from '../actions/popularArticleActions';
import * as Myprofileaction from '../actions/myprofileAction';
import MediaInput from '../component/MediaInput';
import * as TagActions from '../actions/tagsActions';
import Select from 'react-select';
import * as ManagedMediaActions from '../actions/ManagedMediaActions';
import * as BlobUtil from "blob-util";
import Cropper from "react-cropper";
import CroppingModal from './CroppingModal';
//import Select from 'react-select-plus';
import CreatableSelect, { makeCreatableSelect } from 'react-select/creatable';
import RichEditor from './richeditor/RichEditor';
import { Container } from "react-bootstrap";
import ImageCrop from '../common/imageCrop'
import * as GroupActions from '../actions/groupActions';


class EditArticle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            id: props.currentarticle.id,
            userId: this.props.userId,
            title: props.currentarticle.title,
            introduction: props.currentarticle.introduction,
            content: "",
            image: null,
            tags: [],
            latitude: -34.397,
            longitude: 150.644,
            locationTag: "",
            address: "",
            openPhotoModal: false,
            selectedOption: null,
            allTags: [],
            imageToCrop: null,
            userName: "",
            text: '',
            page: "editArticle",
            aspectRatio: 16 / 9,
            location: [],
            groups: [],
            allGroups: [],
            selectedGroup: [],
            selectgroupsId:[]
        }

    }

    componentDidMount() {
        // const input = document.getElementById('gmap_geocoding_address');
        // let autocomplete = new google.maps.places.Autocomplete(input);
        // let article = this.props.currentarticle;
        // // debugger;
        // // console.log(article);
        // this.setState({ autocomplete, ...article })
        // autocomplete.addListener('place_changed', () => this.handlePlaceChanged());

        document.body.addEventListener("click", () => {
            setTimeout(() => {
                this.setState({
                    location: []
                })
            }, 20);

        });


        this.props.tagActions.getAllTags().then((resp) => {

            let tagsList = resp.map((resp) => {
                return resp.name;
            })
            this.setState({
                allTags: tagsList
            })
        })

        this.props.articleActions.getArticlebySlug(this.props.slugId).then((resp) => {
            console.log("article tags check", resp)
            this.setState({
                article: resp,
                title: resp.title,
                introduction: resp.introduction,
                latitude: resp.latitude,
                longitude: resp.longitude,
                tags: resp.tagName,
                locationValue: resp.address
                // tags: resp.article.tags[0].name
                // value: resp.articleRating.articleRate
            });
            // console.log("latitude:", parseFloat(resp.latitude));
            // console.log(resp);
        })


        this.props.myprofileaction.getmyprofile(this.props.userId).then((resp) => {
            console.log("article umage check",this.props.currentarticle.image)
            this.setState({
                userName: resp['firstName'] + " " + resp['lastName'],
                image: this.props.currentarticle.image
            })
        })

        this.props.groupActions.getGroups().then((resp) => {
            console.log("groups id check-->", resp)
            let groupList = resp.groups.map((resp) => {
                return  resp.name;
            })
            let selectedGroups = resp.groups.filter(elem => {
                return this.state.article.groups.indexOf(elem.id) != -1;
            }).map(elem=>{
                return elem.name
            })
            this.setState({
                groups: groupList,
                allGroups : resp.groups,
                selectedGroup: selectedGroups

            });
        })



        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.articleImageUrl !== this.props.articleImageUrl) {
            console.log("updating....", nextProps.articleImageUrl)
            //Perform some operation
            this.setState({ image: nextProps.articleImageUrl });

        }
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

    onChange = (e) => {
        let location = this.state.locations[0];
        location.radius = e.target.value;
        this.setState({
            locActions: [location]
        })
    }

    componentWillReceiveProps = (nextProps)=>{
        // console.log("this props",this.props.aricleImageUrl)
        // console.log("nextProps",nextProps.aricleImageUrl)
        if(this.props.aricleImageUrl != nextProps.aricleImageUrl){
            this.setState({
                imageUrl:nextProps.articleImageUrl
            })
        }
    }

    extractAttribute(place, attribute) {
        const foundObject = place.address_components.filter(component => component.types.indexOf(attribute) >= 0);
        return foundObject.length > 0 ? foundObject[0].long_name : null;
    }

    onSave = () => {
        let data = {
            id: this.state.id,
            adImage: null,
            adUrl: null,
            title: this.state.title,
            introduction: this.state.introduction,
            content: this.state.content,
            tags: this.state.tags,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            locationTag: "",
            address: this.state.address,
            groups: this.state.selectgroupsId,
            image: this.state.image,
            userId: this.props.userId,
            publicMediaType: "IMAGE",
            videoUrl: ""
        }

        this.props.articleActions.saveArticle(data).then((resp) => {
            swal({
                title: 'Article Saved',
                text: 'Article has been saved as draft  successfuly',
                icon: 'success',
                timer: 900

            })
            this.setState({
                id: resp.id
            })
            this.props.history.goBack();
        })
        // console.log('savevd');
    

    }

    onPublish = () => {
        this.props.articleActions.publishArticle(this.state.id).then((resp) =>
            swal({
                title: 'Article published successfully',
                text: 'Article has been published successfuly',
                type: 'success'
            }))
    }

    onChangeItems = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        if (e.target.id == "gmap_geocoding_address") {
            this.setState({ text: e.target.value })
        }
        // console.log(e.target.value);
    }

    openPhotoPopup = () => {
        this.setState({
            openPhotoModal: true
        })
    }

    onSelectImage = (imgurl) => {
        this.setState({
            image: imgurl,
            openPhotoModal: false
        })
        // console.log(imgurl);
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

    openFile = (e) => {

        if (!this.state.image) {
            this.setState({
                openCroppingModal: true

            })

        }


        // document.getElementById('fileElement').click();
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

    onOpen = () => {
        let media = this.state.selectedMedia;
        this.props.onSelect(`/media/${media.directory}/${media.fileName}`);
    };

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

    onform = (e) => {

        return 'Create ' + e + ' option'
    }

    changeContent = (e) => {
        this.setState({
            content: e
        })
        console.log(e);
    }

    hidingModal = () => {
        this.setState({
            openCroppingModal: false
        })
    }

    removePicture = () => {
        this.setState({
            image: null
        })
    }

    newGroups = (e) => {
        const newGroups = this.state.selectedGroup;
        newGroups.push(e);
        this.setState({
            selectedGroup: newGroups
        })
    }

    
    changeGroups = (e) => {
        if (e) {
            let arrlist = []
            for (let i = 0; i < e.length; i++) {
                const element = e[i];
                console.log(i, "th", element);
                console.log("typeof element", typeof (element));
                console.log("groups", this.state.allGroups);
                let temp = this.state.allGroups.filter(x => x.name == element).map(x => x.id);
                arrlist.unshift(temp.pop());
                console.log("temp[arr]:", arrlist);
                this.setState({
                    selectedGroup: e,
                    selectgroupsId: arrlist
                })
            }
        }
        else{
            this.setState({
                selectedGroup: [],
                selectgroupsId: []
             
            })

        }
        // let selectgroupsId = this.state.selectgroupsId ? this.state.selectgroupsId : [];
        // console.log("selectgroupId", selectgroupsId);

    }


    // changeGroups = (e) => {
    //     this.setState({
    //         selectedGroup: e
    //     })
    // }

    render() {
        console.log("slugsss" , this.props.currentarticle)
        return (
            <React.Fragment>
                {/* <Header currentUrl={this.props.currentUrl} /> */}
                {this.state.openCroppingModal &&

                    <ImageCrop show={this.state.openCroppingModal} hideModal={() => this.hidingModal()} page={this.state.page} aspectRatio={this.state.aspectRatio} />
                }
             <Container fluid>
                <div class="row">
                <div className="rightcolumn">

                    <div className="section">
                        <div className="secHeader flexRow evenSpace">
                            <div className="secTitle">
                                <label className="secName">Edit Article</label><br />
                                <label className="secDesc">by {this.state.userName}</label>
                            </div>
                        </div>
                        <div className="articleSec">
                            <div className="flexRow evenSpace">
                                {/* <div className="box articleFieldsBox">
                                    <div className="flexColumn evenSpace">
                                    

                                       
                                    </div>
                                </div> */}
                                <div className="box articleImageBox">
                                    <div className="coverImageBox">
                                        <label className="fieldTitle">Cover Image</label>
                                        <div className="imageHolder" onClick={this.openFile}  >
                                            {/* {this.state.image && <img src={this.state.image} className="coverSelctedPic" width="100%" alt="Image" name="CoverPic" />} */}
                                            {this.state.image && <div className="coverSelctedPicWrapper"><img src={this.state.image} className="coverSelctedPic" width="100%" height="250px" alt="Image" name="CoverPic" />
                                                <button id="save" type="button" onClick={() => this.removePicture()} className="removeBtn btn-fill-red">Remove <i className="fa fa-trash"></i></button>

                                            </div>}
                                            <p className="instructionImg">Select Image From Your Device</p>
                                            {/* <input id="fileElement" type="file" style={{ "position": "absolute", "top": "-1000px" }} accept="image/x-png,image/jpg, image/jpeg"
                                                onChange={(e) => this.loadImage(e.target.files)}   ></input> */}
                                            <label className="infoImg">Use wide images (1280 * 760px) for a better viewing on article page</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box articleFieldsBox">
                                <div className="flexColumn evenSpace">
                                    <div className="articlefieldBox">
                                        <label className="fieldTitle">Title</label>
                                        <div className="flexRow">
                                            <input type="text" id="title" defaultValue={this.state.title}
                                                onChange={this.onChangeItems} className="articlefield titleField"
                                                placeholder="Up to 180 character" />
                                        </div>
                                    </div>
                                    <div className="articlefieldBox">
                                        <label className="fieldTitle">Introduction</label>
                                        <div className="flexRow">
                                            <textarea id="introduction" onChange={this.onChangeItems} defaultValue={this.state.introduction} className="articlefield introField" placeholder="Up to 300 character"></textarea>
                                        </div>
                                    </div>
                                    <div className="articlefieldBox">
                                        <label className="fieldTitle">Tell us your story</label>
                                        {/* <div className="flexRow">
                                                <textarea id="content" onChange={this.onChangeItems} defaultValue={this.state.content} className="articlefield stryField" placeholder="Up to 3000 characters" ></textarea>
                                            </div> */}
                                        <RichEditor ref='editor'
                                            content={this.state.article.content}
                                            placeholder="Max 10,000 characters"
                                            onChange={this.changeContent}
                                            onBlur={this.onBlur}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flexRow evenSpace">
                                <div className="box articleFieldsBox">
                                    <div className="flexColumn evenSpace">
                                        <div className="articlefieldBox">
                                            <label className="fieldTitle">Tags</label>
                                            <div className="flexRow">
                                                <CreatableSelect
                                                    style={{ "width": "500px" }}
                                                    isMulti
                                                    formatCreateLabel={this.onform}
                                                    value={this.state.tags}
                                                    onChange={this.changeTags}
                                                    onCreateOption={this.newTags}
                                                    getOptionLabel={(option) => option.label ? option.label : option}
                                                    getOptionValue={(option) => option.value ? option.value : option}
                                                    options={this.state.allTags}
                                                />
                                                {/* <select className="articlefield catField" >
                                                        <option value="">Select</option>
                                                        <option value="a">A</option><option value="b">B</option><option value="c">C</option>
                                                        <option value="d">D</option><option value="e">E</option><option value="f">F</option>
                                                    </select> */}
                                            </div>
                                        </div>
                                        {/* <div className="articlefieldBox">
                                            <label className="fieldTitle">Video</label>
                                            <div className="flexRow">
                                                <input type="text" className="articlefield videoLinkField" placeholder="Paste video link here" />
                                            </div>
                                        </div> */}

                                        <div className="articlefieldBox">
                                            <label className="fieldTitle">Submit to Group</label>
                                            <div className="flexRow">
                                                {/* <select className="articlefield tagField">
                                                    <option value="">Select</option>
                                                    <option value="a">A</option><option value="b">B</option><option value="c">C</option>
                                                    <option value="d">D</option><option value="e">E</option><option value="f">F</option>
                                                </select> */}
                                                {/* <select value={this.state.selectedTeam}
                                                        onChange={(e) => this.setState({ selectedTeam: e.target.value })}>
                                                        {this.state.teams.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
                                                    </select> */}
                                                <CreatableSelect
                                                    style={{ "width": "500px" }}
                                                    isMulti
                                                    formatCreateLabel={this.onform}
                                                    value={this.state.selectedGroup}
                                                    onChange={this.changeGroups}
                                                    onCreateOption={this.newGroups}
                                                    getOptionLabel={(option) => option.label ? option.label : option}
                                                    getOptionValue={(option) => option.value ? option.value : option}
                                                    options={this.state.groups}
                                                />
                                            </div>
                                        </div>

                                        <div className="articlefieldBox">
                                            <label className="fieldTitle">Choose Location</label>
                                            <div className="flexRow">
                                                <input type="text" className="articlefield videoLinkField" id="gmap_geocoding_address" placeholder="Tag in a Location" value={this.state.locationValue} onChange={(e) => this.makeAutoComplete(e)} />
                                            </div>
                                            {this.state.location.length != 0 && <div className="placesAutoComplete" >
                                                {this.state.location.map((item, index) => {
                                                    return (<div className="locationList" onClick={() => this.onClickCity(index)}><span className="locationPrediction"> <i class="fa fa-map-marker" aria-hidden="true"></i> {item}</span></div>)
                                                })}
                                            </div>}

                                        </div>
                                    </div>
                                </div>
                                <div className="box articleLocationBox">
                                    <div className="flexColumn evenSpace">
                                        <div className="articlefieldBox">
                                            {/* <label className="fieldTitle">Choose Location</label> 
                                                <div className="flexRow">
                                                    <select className="articlefield locationField">
                                                        <option value="">Select</option>
                                                        <option value="a">A</option><option value="b">B</option><option value="c">C</option>
                                                        <option value="d">D</option><option value="e">E</option><option value="f">F</option>
                                                    </select>

                                                </div>*/}
                                            <div className="locationMap">
                                                <GoogleMapComponent latitude={this.state.latitude}
                                                    longitude={this.state.longitude} radius={0}
                                                    containerElement={<div style={{ position: "relative", overflow: "hidden", flex: 1 }} />}
                                                    mapElement={<div style={{ height: `224px` }} />} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="haCenter">
                        <button type="button" onClick={this.onSave} className="articlesaveBtn btn-fill-blue">Save Changes</button>
                    </div>
                    <div className="haCenter">
                        <button type="button" className="upBtn"><i className="fa fa-angle-up" aria-hidden=""></i></button>
                    </div>
                    {/* {this.state.openCroppingModal && <CroppingModal image={this.state.imageToCrop} onCrop={this.onCropImage} />} */}
                </div>
                </div>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }

}

function mapStateToProps(state, ownProps) {
    console.log(ownProps , "djghkjsdhgjklsdgjkl")
    let slugId = ownProps.match.params.id;
    let currentarticle = state.MyArticle.article.find(x => x.slug == slugId) || {};
    let userId = state.Authentication.loggedUserId;
    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let isLoggedIn = state.Authentication.loggedIn;
    let articleImage = state.MyProfile.articleImage;
    let aricleImageUrl = state.MyProfile.aricleImageUrl;

    return {
        currentarticle,
        currentUrl: currentUrl,
        slugId,
        isLoggedIn,
        userId,
        articleImage,
       aricleImageUrl
    };
}

function mapDispatchToProps(dispatch) {
    
    return {
        articleActions: bindActionCreators(ArticleActions, dispatch),
        tagActions: bindActionCreators(TagActions, dispatch),
        myprofileaction: bindActionCreators(Myprofileaction, dispatch),
        managedMediaActions: bindActionCreators(ManagedMediaActions, dispatch),
        groupActions: bindActionCreators(GroupActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
