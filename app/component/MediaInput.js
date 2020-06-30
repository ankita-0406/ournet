import React, { Component } from 'react';
import Modal from 'react-modal';
import CroppingModal from './CroppingModal';
import * as ManagedMediaActions from '../actions/ManagedMediaActions';
import { Row, Col } from 'react-bootstrap';


export default class MediaInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openCroppingModal: false,
            medias: []
        }
    }

    loadImage = (files) => {
        console.log('hello files');
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
            this.setState({
                activePage: 1,
                imageToCrop: null,
                loading: false,
                selectedMedia: savedMedia
            }, this.onOpen);
        }).catch((err) => {
            console.log(err);
        })

    };

    componentDidMount() {
        ManagedMediaActions.getCurrentUserMedias().then((resp) => {
            this.setState({
                medias: resp.medias
            })
        })
    }

    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
        console.log('hello');
        console.log(this.state.medias);
        return (
            <Modal isOpen={true}
                ariaHideApp={false}
                style={customStyles} >
                <div className="modal-content">
                    <div className="modal-header">
                        <button className="close"> close  </button>
                        <h4 className="modal-title">
                            <span> Select file </span>
                        </h4>
                    </div>
                    {/* <div className="modal-body">
                        {Array(10).fill().map((_, rowindex) => {
                                return (
                                    <Row key={rowindex}>
                                        {
                                            this.state.medias.slice(rowindex * 3, (rowindex * 3) + 3).map(media => (
                                                 <Col key={media.id}  sm ={4}>
                                                    <img alt="171x180" src={`/media/${media.directory}/${media.fileName}`}></img>
                                                </Col>
                                            ))}
                                    </Row>
                                )
                            })}
                        {/* {this.state.medias.map((media)=>{
                            return(
                                <img alt="171x180" src={`/media/${media.directory}/${media.fileName}`}></img>
                            )
                        })}//
                        {this.state.openCroppingModal && <CroppingModal image={this.state.imageToCrop} onCrop={this.onCropImage} />}
                    </div> */}
                    <div className="modal-footer">
                        <label className="btn sbold green" style={{ "float": "left" }}>
                            <span>Upload New</span>
                            <input type="file" style={{ "position": "absolute", "top": "-1000px" }} accept="image/x-png,image/jpg, image/jpeg"
                                onChange={(e) => this.loadImage(e.target.files)}   ></input>
                        </label>
                        <label className="btn sbold green" >
                            <span>Open</span>
                        </label>
                        <label className="btn sbold green" >
                            <span>Close</span>
                        </label>
                    </div>
                </div>
            </Modal>
        )
    }


}