import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode, RefObject } from "react";

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {
    icon?:ReactNode,
    ref?:RefObject<HTMLInputElement | null>
}

export function Search({icon,ref,className,...props}:ISearch){
    return (
        <label className={clsx("rounded-sm focus:border bg-white90 py-2 relative px-3 placeholder:text-black60 grid grid-flow-col justify-between items-center",className)}>
            <input className="w-full" {...props} ref={ref}/>
            {icon}
        </label>
    )
}