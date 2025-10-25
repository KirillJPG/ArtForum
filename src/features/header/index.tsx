import { Container } from "@/shared/ui/Container/Container";
import { Logo } from "@/shared/ui/Logo/Logo";
import { Avatar } from "../user";
import { Search } from "@/shared/ui/Search/Search";
import { rqClient } from "@/shared/api/instance";
import { LoadingIcon } from "@/shared/ui/Icons/LoadingIcon";
import { SearchIcon } from "@/shared/ui/Icons/SearchIcon";
import { useState } from "react";
import { Modal } from "@/shared/ui/Modal/Modal";
import type { ApiSchemas } from "@/shared/api";
import { useDebounce } from "@/shared/lib/useDebounce";

export default function Header(){
    return (
        <div className="py-2 shadow-md shadow-gray-100 ">
            <Container>
                <div className="grid grid-flow-col items-center">
                    <Logo/>
                    <div className="">
                        <SearchHeader/>
                    </div>
                    <div className="grid justify-end">
                        <Avatar/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

function SearchHeader(){
    const [focus,setFocus] = useState(false)
    const {state:search,setDebounceState:setSearch} = useDebounce("",1000)
    const {isLoading,data} = rqClient.useQuery("get","/art/{name}",{params:{path:{name:search}}})
    return (
        <div className="relative">
            <Search onChange={e=>setSearch(e.target.value+"")} className="border-transparent border w-full has-focus:border-black90 duration-500" onBlur={()=>setFocus(false)} onFocus={()=>setFocus(true)}  placeholder="Search of arts" icon={isLoading ? <LoadingIcon/> : <SearchIcon/>}/>
            {(focus) && <Modal><ListItems arts={data} isLoading={isLoading}/></Modal>}

        </div>
    )
}

interface IModalSearch{
    arts?:ApiSchemas["ArtResponse"][]
    isLoading:boolean
}

function ListItems({arts,isLoading}:IModalSearch){
    if (isLoading) return <div className="text-black90 text-lg">Loading</div>
    if (!arts) return <div className="text-black90 text-lg w-full align-middle">Not Found</div>
    return (
        <div className="grid gap-4">
            {arts.map(e=>(
                <div className="" key={e.id}>{e.name}</div>
            ))}
        </div>
    )
}