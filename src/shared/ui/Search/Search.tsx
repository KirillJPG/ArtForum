import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode, RefObject } from "react";

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {
    icon?:ReactNode,
    ref?:RefObject<HTMLInputElement | null>
}

export function Search({icon,ref,className,...props}:ISearch){
    return (
        <label className={clsx("rounded-sm focus:border bg-white90 py-2 px-3 placeholder:text-black60 relative grid grid-flow-col auto-cols-max justify-between   items-center",className)}>
            <input {...props} ref={ref}/>
            {icon}
        </label>
    )
}