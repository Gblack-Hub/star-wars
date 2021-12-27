import styles from "./search-result-card.module.css";

function SearchResultCard({result}) {
    return (
        <div className={styles.card}>
            <div className={styles.card_lead_text}>{result.name}</div>
            <div className={styles.card_list}>
                <div>
                    <span className={styles.card_list_title}>Height:</span> {result.height !== "unknown" && result.height+"cm"}
                </div>
                <div>
                    <span className={styles.card_list_title}>Mass:</span> {result.mass !== "unknown" && result.mass+"kg"}
                </div>
            </div>
        </div>
    )
}

export default SearchResultCard;