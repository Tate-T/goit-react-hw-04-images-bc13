// import Loader from 'react-loader-spinner';
import s from './LoaderBtn.module.css';

const LoaderBtn = ({ onClickHandler }) => {
    return (
        <button type="button" onClick={onClickHandler} className={s.button}>Load more</button>
        // <div className={s.button}>
        //     <Loader
        //         type="Puff"
        //         color="#00BFFF"
        //         height={100}
        //         width={100} />
        //     Loading ...
        // </div>
    )
}

export default LoaderBtn