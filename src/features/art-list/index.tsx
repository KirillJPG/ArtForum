import { apiInstance } from "@/shared/api"

export default function Art(){
    return(
        <div className="">
            Arts
            <List/>
        </div>
    )
}

function List(){
    const {data,isLoading,isError,error} = apiInstance.useQuery("get","/art")
    if (isLoading){
        return <div className="">loading</div>
    }
    if (isError){
        return <div className="">{error.code} <span>{error.meaasge}</span></div>
    }
    if (!data){
        return <div className="">Not found</div>
    }
    return (
        <div className="">
            {data.map(e=><div className="">{e.name}</div>)}
        </div>
    )
}