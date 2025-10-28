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
import { Link } from "react-router";
import { generateTypedPath, ROUTES } from "@/shared/model/routes";

export default function Header(){
    return (
        <div className="py-2 shadow-md shadow-gray-100 max-w-full">
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
    const {state:search,setDebounceState:setSearch} = useDebounce("",10)
    const {isLoading,data} = rqClient.useQuery("get","/art/{name}",{params:{path:{name:search}}})
    return (
        <>
            {(focus) && <div className="fixed duration-500 starting:opacity-0 left-0 top-0 right-0 bottom-0 bg-black90 backdrop-blur-[2px]" onClick={()=>setFocus(false)}></div> }
            <Search onChange={e=>setSearch(e.target.value)} className="border-transparent border w-full has-focus:border-black90 duration-500"  onFocus={()=>setFocus(true)}  placeholder="Search of arts" icon={isLoading ? <LoadingIcon/> : <SearchIcon/>}/>
            {(focus) && <div className="relative z-20">
                <Modal><ListItems search={search} arts={data} isLoading={isLoading}/></Modal>
            </div>}
        </>
    )
}

interface IModalSearch{
    arts?:ApiSchemas["ArtResponse"][]
    isLoading:boolean,
    search:string
}

function ListItems({arts,isLoading}:IModalSearch){
    if (isLoading) return <div className="text-black90 text-lg">Loading</div>
    if (!arts?.length) return <div className="text-black90 text-lg w-full align-middle">Not Found</div>
    return (
        <div className="grid gap-4 relative w-full">
            {arts.map(e=>(
                <ItemCard {...e}  key={e.id}/>
            ))}
        </div>
    )
}

function ItemCard({id,imageUrl,name}:ApiSchemas["ArtResponse"]){
    return(
        <Link to={generateTypedPath(ROUTES["ART"],{artId:id})} >
            <div className="grid grid-cols-[max-content_1fr] items-center gap-4 rounded-md p-3">
                <div className="">
                    <img src={imageUrl} alt="" className="max-h-14 object-cover max-w-20" />
                </div>
                <div className="wrap-anywhere text-black text-lg ">{name}</div>
            </div>
        </Link>
    )
}