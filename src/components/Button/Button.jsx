import s from './Button.module.css';

const Button = ({ galleryAppear }) => {
    return (
        <button type="button" onClick={galleryAppear} className={s.button}>Load more</button>
    )
}

export default Button