import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ URL, onClose }) => {

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
    }, [])

    // componentWillUnmount() {
    //     window.removeEventListener('keydown', this.handleKeyDown)
    // }

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose()
        }
    }

    const handleBackDropClick = (e) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return createPortal(
        <div className={s.overlay} onClick={handleBackDropClick} >
            <div className={s.modal}>
                <img src={URL} alt="" />
            </div>
        </div>, modalRoot
    )
}

export default Modal