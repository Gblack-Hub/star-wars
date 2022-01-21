import { useState } from "react";
import styles from "./switch-encoding.module.css";

export default function SwitchEncoding({onChangeEncoding}){
    const [encoding, setEncoding] = useState("");

    function handleChangeEncoding(e) {
        setEncoding(e.target.value);
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