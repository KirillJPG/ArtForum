import type { ReactNode } from "react";

export function Modal({children}:{children?:ReactNode[] | ReactNode}){
    return (
        <div className=" rounded-md top-full mt-2 starting:opacity-0 w-full  duration-500 absolute max-w-full overflow-hidden p-4 bg-white90 border border-black90">
            {children}
        </div>
    )
}