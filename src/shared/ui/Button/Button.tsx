import type { ButtonHTMLAttributes } from "react";
import {cva,type VariantProps} from "class-variance-authority"

export type ButtonProps = VariantProps<typeof buttonVariance>;
const buttonVariance = cva("text-red-500",{
    defaultVariants: {
        variant: "primary",
        size: "large",
    },
    variants:{
        variant:{
            primary:"bg-white90",
            secondary:"bg-black90"
        },
        size:{
            small:"p-0",
            medium:"p-1",
            large:"p-2"
        }
    }
})
interface UI_Button extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant:ButtonProps
}

export function Button({variant,...props}:UI_Button){
    return (
        <button {...props} className={buttonVariance(variant)}/>
    )
}