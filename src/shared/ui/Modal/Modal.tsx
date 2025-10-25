import type { ReactNode } from "react";

export function Modal({children}:{children?:ReactNode[] | ReactNode}){
    return (
        <div className=" rounded-md top-full mt-2 starting:opacity-0  duration-500 absolute w-full p-4 bg-white90 border border-black90">
            {children}
        </div>
    )
}