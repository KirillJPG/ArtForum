import Loading from "#public/icon/loading.svg?react"
import clsx from "clsx"
import style from "./LoadingIcon.module.scss"

export function LoadingIcon({className}:{className?:string}){
    return (
        <Loading  width={20} height={20} className={clsx(style.spin,className)}/>
    )
}