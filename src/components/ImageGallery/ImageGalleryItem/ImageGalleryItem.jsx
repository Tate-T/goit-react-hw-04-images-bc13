import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = () => {
    return (
        <li className={s.galleryItem}>
            <img src="" alt="" className={s.galleryItem__image} />
        </li>
    )
}

export default ImageGalleryItem