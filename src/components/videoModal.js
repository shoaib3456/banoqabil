import { useState } from "react";
import { Modal } from "react-bootstrap";
import "./videoCard.css";

const VideoModal = ({ videoCode }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <div className="video-play-button" onClick={handleShow} >
                <span></span>
            </div>

            <Modal show={show} centered onHide={handleClose}>
                {videoCode}
            </Modal>
        </>
    );
}


export default VideoModal;