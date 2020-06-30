import React, { Component } from 'react';
import Cropper from "react-cropper";
import Modal from 'react-modal';
import * as BlobUtil from "blob-util";
import UUID from "../util/UUID";



export default class CroppingModal extends React.Component {

    constructor(props) {
        super(props);
        const { image, width, height } = this.props;
        this.state = {
            opened: true,
            fileName: UUID.randdomString(),
            cropping: false,
            data: {
                left: 0,
                top: 0,
                width: width ? width : 250,
                height: height ? height : 250,
                scaleX: 1,
                scaleY: 1
            }
        }
    }

    onCrop = () => {
        const { width, height } = this.props;
        let options = { width: width ? width : 250, height: height ? height : 250 };
        var croppedCanvas = this.refs.cropper.getCroppedCanvas(options);
        if (typeof croppedCanvas !== 'undefined') {
            this.setState({ cropping: true });
            BlobUtil.canvasToBlob(croppedCanvas).then(b => {
                this.props.onCrop(this.state.fileName + '.jpg', b, (error) => {
                    this.setState({ error , opened:false });
                });
                this.setState({ cropping: false ,opened:false});
            }).catch(err => {
                console.error(err)
            });
        }
    };

    onClose = () => {
        this.setState({ cropping: false ,opened:false});
    }

    onChangefilename = (e)=>{
        this.setState({
            fileName:e.target.value 
        })
    }

    render() {
        return (
            <Modal isOpen={this.state.opened}
                ariaHideApp={false}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button className="close"> close  </button>
                        <h4 className="modal-title">
                            <span> Modal heading </span>
                        </h4>
                    </div>
                    <div className="modal-body">
                        <form>
                            <input type="text" defaultValue= {this.state.fileName} onChange ={this.onChangefilename}></input>
                        </form>
                        <div>
                            <Cropper
                                ref='cropper'
                                src={this.props.image}
                                style={{ height: "600px", width: '400px' }}
                                data={this.state.data}
                                aspectRatio={1}
                                dragMode="none"
                                zoomable={false}
                                guides={false} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <label className="btn sbold green" onClick={this.onCrop}
                            style={{ "float": "left" }}>
                            <span>Crop</span>

                        </label>
                        {/* <label className="btn sbold green" >
                            <span>Open</span>
                        </label> */}
                        <label className="btn sbold green" onClick={this.onClose}>
                            <span>Close</span>
                        </label>
                    </div>
                </div>
            </Modal>
        )
    }

}