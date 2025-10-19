import { generateTypedPath, ROUTES,  } from "@/shared/model/routes";
import { Link } from "react-router";

export function Avatar(){
    return (
        <Link to={generateTypedPath(ROUTES.USER,{userId:1})}>
            <img src="/public/image/avatar.webp" className="w-10 h-10 rounded-full"/>
        </Link>
    )
}