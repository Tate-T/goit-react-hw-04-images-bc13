import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
    return (
        <li className={s.galleryItem}
            onClick={() => { onClick(largeImageURL) }}>
            <img src={webformatURL} alt="" className={s.galleryItem__image} />
        </li>
    )
}

export default ImageGalleryItem