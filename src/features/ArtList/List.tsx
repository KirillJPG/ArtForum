import { rqClient } from "@/shared/api/instance";
import { useArtListStore } from "./ArtListStore";

export function List(){
    const {category} = useArtListStore()
    const {data} = rqClient.useQuery("get","/art")

    return (
        <div className="grid"></div>
    )
}