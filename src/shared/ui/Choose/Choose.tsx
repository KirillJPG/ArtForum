import { cva } from "class-variance-authority";
import clsx from "clsx";
import type { OptionHTMLAttributes } from "react";

type Size = "large" | "small"
type Select = "select" | "no_select"

interface IChoose extends OptionHTMLAttributes<HTMLOptionElement>{
    size:Size,
    select:Select
}

const optionStyle = cva("bg-transparent border disabled:brightness-[0.25]",{
    variants:{
        variant:{
            select:"border-primary text-primary",
            no_select:"border-black60 text-black60"
        },
        size:{
            small:"text-[12px] py-1 px-2",
            large:"text-[14px] py-2 px-4"
        }
    }
})

export function Choose({className,select,size,...props}:IChoose){
    return (
        <option className={clsx(optionStyle({size,variant:select}),className)} {...props}/>
    )
}