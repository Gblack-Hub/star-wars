import PropTypes from 'prop-types';
import { formatNumberInThousand } from "../../../../utils";
import styles from "./search-result-card.module.css";

SearchResultCard.propTypes = {
    result: PropTypes.object,
    searchType: PropTypes.string
}

function SearchResultCard({result, searchType}) {
    return (
        <div className={styles.card} title="search-result-card">
            <div className={styles.card_lead_text}>{result?.name}</div>
            <div className={styles.card_list}>
                {searchType === "people" &&
                    <>
                        <div>
                            <span className={styles.card_list_title}>Height:</span> {result?.height !== "unknown" && result?.height+"cm"}
                        </div>
                        <div>
                            <span className={styles.card_list_title}>Mass:</span> {result?.mass !== "unknown" && result?.mass+"kg"}
                        </div>
                    </>
                }
                {searchType === "planets" &&
                    <div>
                        <span className={styles.card_list_title}>Population:</span> {formatNumberInThousand(result?.population)}
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchResultCard;