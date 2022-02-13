
import s from './ImageGallery';

const ImageGallery = ({ children }) => {
    return (
        <ul className={s.gallery} >
            {children}
        </ul>
    )
}

export default ImageGallery