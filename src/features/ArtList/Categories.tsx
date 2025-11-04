import { Button } from "@/shared/ui/Button/Button";
import { useState } from "react";

const categories = ["All Recommendation","Most Popular","By Date"]

export function Categories(){
    const [select,setSelect] = useState(categories[0])

    return (
        <div className="flex gap-2">
            {categories.map((e)=><Button variant={{size:"medium",variant:"secondary"}} key={e}>e</Button>)}
        </div>
    )
}