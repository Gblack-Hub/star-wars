
   
import PropTypes from 'prop-types';
import styles from './search-options.module.css';

SearchOptions.propTypes = {
    showOptions: PropTypes.bool,
    option: PropTypes.array,
    onClick: PropTypes.func
};

export default function SearchOptions({showOptions, options, onClick}) {
    if(showOptions && options.length < 1) return <div className={styles.options__container}>loading...</div>
    if(showOptions)
    return (
        <div className={styles.options__container}>
            {options?.map((item,index) => (
                <div key={index} className={styles.options__item} onClick={ () => onClick(item) }>
                    <span className={styles.options__text}>
                        { item?.name }
                    </span>
                </div>
            ))}
        </div>
    );
    else return null;
}