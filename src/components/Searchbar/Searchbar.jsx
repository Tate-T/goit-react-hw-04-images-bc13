import { Component } from 'react';
import { ReactComponent as LoupeIcon } from '../../icons/loupe.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';


export default class Searchbar extends Component {
    state = {
        galleryImgName: '',
    };

    handleNameChange = e => {
        this.setState({ galleryImgName: e.currentTarget.value.toLowerCase() })
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.galleryImgName.trim() === '') {
            // alert('Enter the name of image');
            toast.info('Enter the name of image');
            return
        }

        this.props.findImg(this.state.galleryImgName);
        this.setState({ galleryImgName: '' });
    };

    render() {
        return (
            <header className={s.searchbar} >
                <form className={s.form} onSubmit={this.handleSubmit}>

                    <button type="submit" className={s.button}>
                        <LoupeIcon className={s.loupeIcon} width="40" height="40" fill="grey" />
                    </button >

                    <input
                        className={s.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.galleryImgName}
                        onChange={this.handleNameChange}
                    />
                </form >
            </header >
        )
    }
}

Searchbar.propTypes = {
    onclick: PropTypes.func
}