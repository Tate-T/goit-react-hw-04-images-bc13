import { ReactComponent as LoupeIcon } from '../../icons/loupe.svg';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = ({ onClick }) => {
    return (
        <header className={s.searchbar}>
            <form className={s.form}>
                <LoupeIcon className={s.loupeIcon} width="40" height="40" fill="grey" />
                {/* <button type="submit" className={s.button} onClick={onClick}>
                    <span className={s.button__label}>Search</span>
                </button > */}

                <input
                    className={s.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form >
        </header >
    )
}

Searchbar.propTypes = {
    onclick: PropTypes.func
}

export default Searchbar