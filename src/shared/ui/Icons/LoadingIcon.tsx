import Loading from "#public/icon/loading.svg?react"
import style from "./LoadingIcon.module.scss"

export function LoadingIcon(){
    return (
        <Loading  width={20} height={20} className={style.spin}/>
    )
}