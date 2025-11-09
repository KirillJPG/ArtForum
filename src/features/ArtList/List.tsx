import { rqClient } from "@/shared/api/instance";
import { useArtListStore } from "./ArtListStore";
import { Card } from "./Card";
import { LoadingIcon } from "@/shared/ui/Icons/LoadingIcon";

export function List(){
    const {category,page} = useArtListStore()
    const {data,isLoading} = rqClient.useQuery("get","/art",{params:{query:{category,page}}})
    if (isLoading) return <Loading/>
    return (
        <div className="grid grid-cols-4 gap-3 py-2 pb-10"> 
            {data?.map((e,id)=><Card {...e} key={id}/>)}
        </div>
    )
}


function Loading(){
    return <div className="grid w-full justify-items-center"><LoadingIcon /><div className="text-center text-lg">Loading</div></div>
}