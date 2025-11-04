import { memo, type ButtonHTMLAttributes } from "react";
import {cva,type VariantProps} from "class-variance-authority"

export type ButtonProps = VariantProps<typeof buttonVariance>;
const buttonVariance = cva("font-bold duration-500 hover:cursor-pointer disabled:bg-black30 disabled:text-black30 disabled:border-0 disabled:cursor-not-allowed",{
    defaultVariants: {
        variant: "primary",
        size: "large",
    },
    variants:{
        variant:{
            primary:"bg-primary text-white hover:bg-primary80 border border-transparent",
            secondary:" bg-transparent text-black60 border border-black60 "
        },
        size:{
            large:`text- px-6 py-4 text-xl rounded-3xl`,
            medium:"px-5 py-3 text-lg rounded-3xl",
            small:"px-4 py-2 text-xs rounded-xl",
        }
    }
})
type UI_Button = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps

export const Button =memo(function Button({variant,size,...props}:UI_Button){
    return (
        <button {...props} className={buttonVariance({variant,size})}/>
    )
})