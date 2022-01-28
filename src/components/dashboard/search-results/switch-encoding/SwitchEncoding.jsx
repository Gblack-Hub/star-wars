import { memo, useState, useEffect } from "react";
import styles from "./switch-encoding.module.css";

function SwitchEncoding({onChangeEncoding, encoding}){
    const [encode, setEncode] = useState("");

    function handleChangeEncoding(e) {
        onChangeEncoding(e.target.value);
    }
    console.log(encoding);

    useEffect(function(){
            setEncode(encoding);
    }, [encoding])

    return (
        <div className={styles.encoding} title="switch-encoding">
            <label>
                <input type="radio" value="" checked={encode === ""} onChange={handleChangeEncoding} /> JSON
            </label>
            <label>
                <input type="radio" value="wookiee" checked={encoding === "wookiee"} onChange={handleChangeEncoding} /> Wookiee
            </label>
        </div>
    )
}

export default memo(SwitchEncoding);