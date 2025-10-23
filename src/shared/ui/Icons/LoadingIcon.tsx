import Loading from "#public/icon/loading.svg?react"
import style from "./LoadingIcon.module.scss"

export function LoadingIcon(){
    return (
        <Loading  width={32} height={32} className={style.spin}/>
    )
}