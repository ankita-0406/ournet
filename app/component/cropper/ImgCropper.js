import React, { Fragment } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import { getOrientation } from "get-orientation/browser";
import getCroppedImg from "./cropImage";
import { getRotatedImage } from "./rotateImage";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Myprofileaction from '../../actions/myprofileAction';
import * as Loginaction from '../../actions/loginActions';
import { Button, Alert } from 'react-bootstrap';
import UUID from "../../util/UUID";
import "../../../style/component/ImageCropper.css";


const ORIENTATION_TO_ANGLE = {
    "3": 180,
    "6": 190,
    "8": -90
};

class ImgCropper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: UUID.randdomString(),
            imageSrc: null,
            crop: { x: 0, y: 0 },
            zoom: 1,
            as: this.props.aspectRatio,
            croppedAreaPixels: null,
            croppedImage: null,
            isCropping: false,
            display: false,
            uploaded: false,
            file: null,
            wide: true
        }
    }

    onCropChange = crop => {
        this.setState({ crop });
    };

    onCropComplete = (croppedArea, croppedAreaPixels) => {



        this.setState({
            croppedAreaPixels,

            isCropping: true
        });

        getCroppedImg(
            this.state.imageSrc,
            croppedAreaPixels
        ).then(res => {
            this.setState({
                croppedImage: res.imageDataUrl,
                file: res.file,
                isCropping: false,
                uploaded: true
            }, () => {
                this.props.myprofileAction.updateImageHolder({ imageDataUrl: this.state.croppedImage, file: this.state.file });
            });

        }).catch(err => {
            console.log(err)
        })
        // this.props.myprofileAction.updateImageHolder({ imageDataUrl: this.state.croppedImage, file: this.state.file });


    };

    onZoomChange = zoom => {
        this.setState({ zoom });
    };

    aspectRatio = e => {
        e.preventDefault();
        this.setState({ as: e.target.value });
    };

    as = e => {
        let as = parseFloat(e.target.value);
        this.setState({ as });
        e.preventDefault();
    };

    checkDimensions = (dimension) => {
        let height = dimension.height;
        let width = dimension.width;
        let ratio = width / height;
        let ref = 16 / 9

        console.log("check dmnsn", height, width, ratio)

        if (ratio >= ref) {
            return true;
        }
        return false;

    }

    showResult = async () => {
        try {
            this.setState({
                isCropping: true
            });


            const croppedImage = await getCroppedImg(
                this.state.imageSrc,
                this.state.croppedAreaPixels
            );

            this.setState({
                croppedImage,
                isCropping: false,
                uploaded: true
            });
            this.props.myprofileAction.updateUserProfile(this.state.croppedImage);
            setTimeout(() => {
                this.setState({
                    uploaded: false
                })
            }, 1500)

        } catch (e) {
            // console.log("croppedImage", this.state.imageSrc);
            console.log("catch");
            this.setState({
                isCropping: false
            });
        }
    };

    onClose = () => {
        this.setState({
            croppedImage: null
        });
    };

    onSubmit = () => {
        this.props.myprofileAction.updateUserProfile(this.state.croppedImage).then(() => swal({
            title: 'User Location Saved!',
            text: 'The User Location was saved',
            icon: 'success',
            timer: 900
        }))
    }

    onFileSelect = async e => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            let imageDataUrl = await readFile(file);
            return imageDataUrl;
        }

        // apply rotation if needed
        // const orientation = await getOrientation(file);
        // console.log("orient-->",orientation)
        // const rotation = ORIENTATION_TO_ANGLE[orientation];
        // if (rotation) {
        //     imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        // }



    };

    imageData = async (url) => {
        let img = new Image;
        img.src = url
        return img.onLoad = await function () {
            return {
                width: img.width,
                height: img.height
            }
        }

    }

    onFileChange = (e) => {

        let imageDataUrl = null;

        this.onFileSelect(e).then(res => {
            let width;
            let height;

            imageDataUrl = res;
            // let img = new Image();

            // img.onload = function () {
            //     height = img.height;
            //     width = img.width;
            //     this.setState({
            //         wide:(width / height) >= 16 / 9,
            //     })
            //     // code here to use the dimensions
            // }
            // img.src = imageDataUrl
            this.imageData(imageDataUrl).then(res => {
                width = res().width;
                height = res().height
                console.log("height , width", width, height)

                this.setState({
                    imageSrc: imageDataUrl,
                    wide: (width / height) >= 16 / 9,

                    crop: { x: 0, y: 0 },
                    croppedAreaPixels: {
                        width: 1200,
                        height: 800,
                        x: 100,
                        y: 400
                    },
                    zoom: 1
                });
                console.log("state checkkk", this.state)

                getCroppedImg(
                    this.state.imageSrc,
                    this.state.croppedAreaPixels,
                    0,
                    this.state.wide
                ).then(res => {

                    this.setState({
                        croppedImage: res.imageDataUrl,
                        file: res.file
                    });



                    this.props.myprofileAction.updateImageHolder({ imageDataUrl: this.state.croppedImage, file: this.state.file });

                }).catch(err => {
                    console.log(err)
                })


            })


        })




    }

    render() {
        return (
            <div>
                <input type="file" onChange={(e) => this.onFileChange(e)} accept="image/x-png,image/gif,image/jpeg" />
                {this.state.imageSrc && (
                    <Fragment>
                        <div className="crop-container">
                            <Cropper
                                image={this.state.imageSrc}
                                crop={this.state.crop}
                                zoom={this.state.zoom}
                                aspect={this.state.wide ? 16 / 9 : 4 / 3}
                                onCropChange={this.onCropChange}
                                onCropComplete={this.onCropComplete}
                                onZoomChange={this.onZoomChange}
                            />
                        </div>
                        <div className="controls" style={{}}>
                            <Slider
                                value={this.state.zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => this.onZoomChange(zoom)}
                            />
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                            justifyContent: "flex-end",
                            marginTop: "410px"
                        }}>
                            {/* <div className="button"  >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={this.showResult}
                                >Show result
                                 </Button>

                            </div> */}
                            {/* <div className="top" style={{ marginTop: "-100px" }}>
                                <div style={{ textAlign: "center", marginTop: "10px" }}>
                                    <select
                                        className="ui dropdown"
                                        onClick={e => this.aspectRatio(e)}
                                        style={{
                                            color: "white",
                                            boxSizing: "border-box",
                                            background: "#3f51b5",
                                            borderRadius: "5px",
                                            padding: "0px 10px 0px 10px",
                                            height: "32px"
                                        }}
                                    >
                                        <option
                                            className="item"
                                            value={"1280" / "720"}
                                            onClick={e => this.as(e)}
                                        >
                                            16/9
                                    </option>
                                        <option
                                            className="item"
                                            value={"1280" / "960"}
                                            onClick={e => this.as(e)}
                                        >
                                            4/3
                                    </option>
                                        <option
                                            className="item"
                                            value={"1280" / "1706.67"}
                                            onClick={e => this.as(e)}
                                        >
                                            3/4
                                    </option>
                                        <option
                                            className="item"
                                            value={"1280" / "1280"}
                                            onClick={e => this.as(e)}
                                        >
                                            1/1
                                    </option>
                                    </select>
                                </div>
                            </div> */}
                            {/* {this.state.uploaded && (
                                <Alert variant='success' className="successAlert">
                                    Picture Uploaded
                                </Alert>
                            )} */}

                        </div>


                        {/* <ImgDialog img={this.state.croppedImage} onClose={this.onClose} /> */}

                    </Fragment>
                )}
            </div>
        );
    }
}

function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}

function mapStateToProps(state, ownProps) {

    let currentUrl = ownProps.location ? ownProps.location.pathname : "";
    let loggedUserId = state.Authentication.loggedUserId;
    let profile = state.MyProfile.profile;
    return {
        loggedUserId,
        profile,
        currentUrl
    };
}

function mapDispatchToProps(dispatch) {
    return {
        myprofileAction: bindActionCreators(Myprofileaction, dispatch),
        loginAction: bindActionCreators(Loginaction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgCropper);

// export default ImgCropper;