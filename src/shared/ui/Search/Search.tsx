import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

interface ISearch extends InputHTMLAttributes<HTMLInputElement>{
    icon?:ReactNode
}

export function Search({icon,className,...props}:ISearch){
    return (
        <label className={clsx("rounded-sm bg-white90 py-2 px-3 placeholder:text-black60 relative grid grid-flow-col auto-cols-max justify-between   items-center",className)}>
            <input {...props} />
            {icon}
        </label>
    )
}