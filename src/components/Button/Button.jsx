import s from './Button.module.css';

const Button = (toggleModal) => {
    return (
        <button type="button" onClick={toggleModal} className={s.button}>Load more</button>
    )
}

export default Button