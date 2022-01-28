
   
import PropTypes from 'prop-types';
import styles from './search-options.module.css';

SearchOptions.propTypes = {
    showOptions: PropTypes.bool,
    searchTerm: PropTypes.string,
    options: PropTypes.array,
    onClick: PropTypes.func
};

export default function SearchOptions({showOptions, searchTerm, options = [], onClick}) {
    //add the typed search term to the options list
    const newOptions = [{name: searchTerm}, ...options];

    if(showOptions && newOptions.length < 1) return <div className={styles.options__container}>loading...</div>
    if(showOptions)
    return (
        <div className={styles.options__container} title="suggestion-dropdown">
            {newOptions?.map((item,index) => (
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