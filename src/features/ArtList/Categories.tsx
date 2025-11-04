import { Button } from "@/shared/ui/Button/Button";
import Choose from "@/shared/ui/Choose/Choose";
import { useCallback, useState, type MouseEvent } from "react";
import { useArtListStore } from "./ArtListStore";

const categories = ["all","characters", "creatures", "objects", "environments", "fantasy", "sci-fi", "food", "vehicles", "plants", "animals", "weapons", "icons", "buildings", "pixel-fonts", "tilesets", "ui-elements", "holiday", "seasonal", "abstract", "retro-gaming", "mythical", "robots", "space", "underwater", "magic", "technology", "medieval", "cyberpunk", "steampunk", "voxel-art"]

export function Categories(){
    const {category,setCategory} = useArtListStore()
    const [showAll,setShowAll] = useState(false)

    const onSelect = useCallback((e:MouseEvent<HTMLOptionElement>)=>{
        setCategory(e.currentTarget.value)
    },[])
    const onToggle = useCallback(()=>{
        setShowAll(e=>!e)
    },[])
    
    const categoriesList = categories.slice(0,showAll ? -1 : 10).map((e)=><Choose select={e == category ? "select" : "no_select"} value={e} className="text-center" size="large" onClick={onSelect} key={e}>{e}</Choose>)

    return (
        <div className="">
            <div className="grid auto-cols-max grid-cols-10 gap-2 pb-2">
                {categoriesList}
            </div>
            
            <Button variant={showAll ? "secondary" : "primary"} size={"small"} onClick={onToggle} children={showAll ? "Hide" : "Show All"} />
        </div>
    )
}