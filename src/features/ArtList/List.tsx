import { rqClient } from "@/shared/api/instance";
import { useArtListStore } from "./ArtListStore";
import { Card } from "./Card";
import { Loading } from "@/shared/ui/Loading/Loading";

export function List(){
    const {category,page} = useArtListStore()
    const {data,isLoading} = rqClient.useQuery("get","/art",{params:{query:{category,page}}})
    if (isLoading) return <div className="grid min-h-[500px] items-center"><Loading/></div>
    if (!data?.length) return <div className="justify-center min-h-[500px] grid items-center">Not Found</div>
    return (
        <div className="grid grid-cols-4 gap-3 py-2 pb-10 min-h-[500px] auto-rows-max"> 
            {data?.map((e,id)=><Card {...e} key={id}/>)}
        </div>
    )
}

