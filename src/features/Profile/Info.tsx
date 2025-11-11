import { rqClient } from "@/shared/api/instance"
import type { PathParams, ROUTES } from "@/shared/model/routes"
import { Loading } from "@/shared/ui/Loading/Loading"
import { useParams } from "react-router"

export function Info(){
    const {userName} = useParams<PathParams[typeof ROUTES.USER]>()
    const {isLoading,data} = rqClient.useQuery("get","/user/{name}",{params:{path:{name:userName!}}})
    if (isLoading) return <Loading/>
    if (!data) return <div className="p-10 text-black60">Not Found</div>
    return (
        <div className="grid justify-items-center gap-2 p-10">
            <img src={data.avatar} className="rounded-full w-20 h-20" />
            <div className="text-2xl">{data.name}</div>
            <div className="font-bold text-sm ">Create at {new Date(data.createAt).toLocaleDateString()}</div>
        </div>
    )
}