import type { ApiSchemas } from "@/shared/api";
import { generateTypedPath, ROUTES } from "@/shared/model/routes";
import { DateIcon, LikeIcon, PersonIcon } from "@/shared/ui/Icons/Icons";
import { memo } from "react";
import { Link } from "react-router";

export const Card = memo( function Card({author,createAt,imageUrl,likes,name,id}:ApiSchemas["ArtResponse"]){
    return (
            <div className="border border-black60 p-2 rounded-md grid-rows-[150px_1fr_1fr] grid gap-1">
                <div className="flex justify-center relative">
                    <span className="text-black text-sm flex items-center absolute right-0 bottom-0 p-1 bg-primary rounded-md"><DateIcon width={20} height={20}/>{new Date(createAt).toLocaleDateString()}</span>
                    <div className="flex gap-1 items-center font-bold text-black60 absolute right-0 top-0 p-1 bg-secondary rounded-md"><LikeIcon className="fill-black60" width={22} height={20}/> {likes}</div>
                    <img src={imageUrl}   className="object-cover rounded-md"/>
                </div>
                <div className="overflow-ellipsis w-full overflow-hidden ">
                    <Link to={generateTypedPath(ROUTES["ART"],{artId:id})}><span className="w-full text-[16px] capitalize">{name}</span></Link></div>
                <div className="">
                    <Link to={generateTypedPath(ROUTES["USER"],{userName:author.name})} className="hover:brightness-50 duration-300 text-primary z-20 flex gap-1 items-center"><PersonIcon width={22} height={20}/> {author.name}</Link>
                </div>
            </div>  
    )
},(prev,next)=>{
    if(prev.author.id == next.author.id && prev.categories.length == next.categories.length) return true
    return false
})