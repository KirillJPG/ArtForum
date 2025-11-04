import { cva } from "class-variance-authority";
import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode, RefObject } from "react";

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {
    icon?:ReactNode,
    ref?:RefObject<HTMLInputElement | null>,
    variant:"light" | "black"
}


const inputVariants = cva("",{
    variants:{
        variant:{
            black:"placeholder:text-black60 bg-white90",
            light:"placeholder:text-white bg-white60"
        },
        input:{
            black:"placeholder:text-black60 ",
            light:"placeholder:text-white "
        }
    }
})

export function Search({icon,ref,className,variant,...props}:ISearch){
    return (
        <label className={clsx("rounded-sm focus:border py-2 relative px-3 grid grid-flow-col justify-between items-center",className,inputVariants({variant}))}>
            <input className={clsx("w-full",inputVariants({input:variant}))} {...props} ref={ref}/>
            {icon}
        </label>
    )
}