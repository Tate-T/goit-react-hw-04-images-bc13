
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery';

const ImageGallery = () => {
    return (
        <ul className={s.gallery}>
            <ImageGalleryItem />
        </ul>
    )
}

export default ImageGallery