import { useState } from 'react';
import { ReactComponent as LoupeIcon } from '../../icons/loupe.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';


const Searchbar = ({ findImg }) => {
    const [galleryImgName, setGalleryImgName] = useState('');

    const handleNameChange = e => {
        setGalleryImgName(e.currentTarget.value.toLowerCase())
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (galleryImgName.trim() === '') {
            // alert('Enter the name of image');
            toast.info('Enter the name of image');
            return
        }

        findImg(galleryImgName);
        setGalleryImgName('');
    };

    return (
        <header className={s.searchbar} >
            <form className={s.form} onSubmit={handleSubmit}>

                <button type="submit" className={s.button}>
                    <LoupeIcon className={s.loupeIcon} width="40" height="40" fill="grey" />
                </button >

                <input
                    className={s.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={galleryImgName}
                    onChange={handleNameChange}
                />
            </form >
        </header >
    )
}

Searchbar.propTypes = {
    onclick: PropTypes.func
}

export default Searchbar