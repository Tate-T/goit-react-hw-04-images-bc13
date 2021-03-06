import { Puff } from 'react-loader-spinner';
import s from './Loader.module.css';

const LoaderSpinner = () => {
    return (
        <div className={s.loader}>
            <Puff
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100} />
        </div>
    );
};

export default LoaderSpinner