import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../../style/component/ImageCropper.css"
import Cropper from './ImgCropper';
import ImageCrop from '../../common/imageCrop'

// const imageModal = () => {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     return (
//         <>
//             <button onClick={() => setShow(true)} type="button" className="camIcon">
//                 <i className="fa fa-camera"></i>
//             </button>
//             <ImageCrop show={show} />
//             {/* <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Choose Profile Picture</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Cropper />
//                  </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleClose}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal> */}
//         </>
//     );
// }
class ImageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false
        }

    }

    hidingModal = ()=>{
        this.setState({
            modalShow:false
        })
    }

    onClickHandler = ()=>{
        this.setState({
             modalShow: true 
            })
    }

    render() {
        return (
            <div>
                <button onClick={() => this.onClickHandler()} type="button" className="camIcon">
                    <i className="fa fa-camera"></i>
                </button>
                {this.state.modalShow && (
                     <ImageCrop show={this.state.modalShow} hideModal = {()=>this.hidingModal()} page = {this.props.page} aspectRatio = {this.props.aspectRatio}/>
                )}
               

            </div>
        )
    }
}

export default ImageModal;
