import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import '../../style/component/ImageCropper.css'
import Cropper from '../component/cropper/ImgCropper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Myprofileaction from '../actions/myprofileAction';
import * as Loginaction from '../actions/loginActions';
import * as ManagedMediaActions from '../actions/ManagedMediaActions';
import * as MyArticleAction from '../actions/myarticleAction';
import * as MyProfileAction from '../actions/myprofileAction';
import * as api from '../api/MyprofileApi';
import { v4 as uuidv4 } from 'uuid';
import UUID from "../util/UUID";
import swal from 'sweetalert';


class ImageCrop extends React.Component {
    // const [show, setShow] = useState(this.props.show);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            uploaded: false
        }

    }
    handleClose = () => {
        this.props.hideModal();
        // this.setState({
        //     show:false
        // }    
    }

    uploadImage = () => {
        if (this.props.profile.img.imageDataUrl) {
            console.log("random string", UUID.randdomString())

            this.props.managedMediaActions.uploadMediaFile({ filename: UUID.randdomString(), file: this.props.profile.img.file, src: this.props.profile.img.imageDataUrl }).then(res => {
                this.props.myArticleAction.getImageUrl({ fileName: res.fileName, directory: res.directory })
            })
        }
        this.props.hideModal();

    }
    saveChanges = () => {
        switch (this.props.page) {
            case "myProfile":

                if (this.props.profile.img.imageDataUrl) {
                    // this.props.myprofileAction.updateUserProfile(this.props.profile.img.imageDataUrl);
                    this.props.managedMediaActions.uploadMediaFile({ filename: UUID.randdomString(), file: this.props.profile.img.file, src: this.props.profile.img.imageDataUrl }).then(res => {
                        this.props.myProfileAction.getImageUrl(this.props.profile.profile.userId, { fileName: res.fileName, directory: res.directory }).then(res => {
                            this.props.myprofileAction.getmyprofile(this.props.profile.profile.userId)

                            swal({
                                title: 'User Image Saved!',
                                text: 'User profile has been saved',
                                icon: 'success',
                                timer: 900
                            })
                        })
                    })
                    this.setState({
                        uploaded: true
                    })

                    this.props.hideModal();

                }

                break;
            case "New Article":
                this.uploadImage();

                // if (this.props.profile.img.imageDataUrl) {
                //     console.log("random string", UUID.randdomString())

                //     this.props.managedMediaActions.uploadMediaFile({ filename: UUID.randdomString(), file: this.props.profile.img.file, src: this.props.profile.img.imageDataUrl }).then(res => {
                //         this.props.myArticleAction.getImageUrl({ fileName: res.fileName, directory: res.directory })
                //     })
                // }
                // this.props.hideModal();
                break;
            case "newGroup":

                this.uploadImage()

                // if (this.props.profile.img.imageDataUrl) {
                //     console.log("random string", UUID.randdomString())

                //     this.props.managedMediaActions.uploadMediaFile({ filename: UUID.randdomString(), file: this.props.profile.img.file, src: this.props.profile.img.imageDataUrl }).then(res => {
                //         this.props.myArticleAction.getImageUrl({ fileName: res.fileName, directory: res.directory })
                //     })
                // }
                // this.props.hideModal();
                break;
            case "editArticle":
                this.uploadImage()
                break;
            default:
                return;

        }
    }
    render() {



        return (

            <Modal show={this.props.show} onHide={() => this.handleClose()} dialogClassName={"CSRModal"} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Picture for {this.props.page}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Cropper aspectRatio={this.props.aspectRatio} />
                    {/* <div className="button-modal" >
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.saveChanges()}>
                            Save Changes
                        </Button>
                    </div> */}
                </Modal.Body>

                <Modal.Footer>

                    <Button className="btn btn-light btn-lg" variant="secondary" onClick={() => this.handleClose()}>
                        Close
                        </Button>
                    <Button className="btn btn-primary btn-lg" variant="primary" onClick={() => this.saveChanges()}>
                        Save Changes
                        </Button>


                </Modal.Footer>
            </Modal>

        );
    }
}


function mapStateToProps(state, ownProps) {


    let loggedUserId = state.Authentication.loggedUserId;
    let profile = state.MyProfile;
    return {
        loggedUserId,
        profile
    };
}

function mapDispatchToProps(dispatch) {
    return {
        myprofileAction: bindActionCreators(Myprofileaction, dispatch),
        loginAction: bindActionCreators(Loginaction, dispatch),
        managedMediaActions: bindActionCreators(ManagedMediaActions, dispatch),
        myArticleAction: bindActionCreators(MyArticleAction, dispatch),
        myProfileAction: bindActionCreators(MyProfileAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCrop);