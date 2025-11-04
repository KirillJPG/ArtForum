import Search from "#public/icon/search.svg?react"
import clsx from "clsx"

export function SearchIcon({className}:{className?:string}){
    return (
        <Search width={20} height={20} className={clsx("fill-black90",className)}/>
    )
}