import styles from "./switch-encoding.module.css";

export default function SwitchEncoding({onChangeEncoding, encoding}){

    function handleChangeEncoding(e) {
        onChangeEncoding(e.target.value);
    }
    return (
        <div className={styles.encoding}>
            <label>
                <input type="radio" value="" name="encoding" checked={encoding === ""} onChange={handleChangeEncoding} /> JSON
            </label>
            <label>
                <input type="radio" value="wookiee" name="encoding" checked={encoding === "wookiee"} onChange={handleChangeEncoding} /> Wookie
            </label>
        </div>
    )
}