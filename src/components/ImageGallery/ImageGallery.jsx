
import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery';

class ImageGallery extends Component {

    render() {
        return (
            <ul className={s.gallery} >
                {this.props.gallery.map(img => (<ImageGalleryItem key={img.id} />))}
            </ul>
        )
    }
}

export default ImageGallery