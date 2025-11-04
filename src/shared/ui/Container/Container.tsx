import type { ReactNode } from "react";

export function Container({children}:{children:ReactNode}){
    return (
        <div className="grid h-full w-full grid-cols-[1fr_minmax(auto,1200px)_1fr]">
            <div className="col-end-3 col-start-2">
                {children}
            </div>
        </div>
    )
}