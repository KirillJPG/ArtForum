import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./LineForm.module.css"

interface ILineForm extends InputHTMLAttributes<HTMLInputElement>{
    errorMsg?:string
    icon?:ReactNode

};

export function LineForm({errorMsg,icon,...props}:ILineForm){
    return (
    <div className={styles.lineform}>
        <label className={styles.label}>
            <input {...props} className={styles.input}/>
            <div className={styles.placeholder}>{props.placeholder}</div>
            {icon}
        </label>
        {errorMsg && <div className={styles.error}>{errorMsg}</div>}
    </div>
    )
}