import { generateTypedPath, ROUTES,  } from "@/shared/model/routes";
import { memo } from "react";
import { Link } from "react-router";
function Avatar(){
    return (
        <Link to={generateTypedPath(ROUTES.USER,{userName:""})}>
            <img src="/public/image/avatar.webp" className="w-10 h-10 rounded-full"/>
        </Link>
    )
}
export default memo(Avatar)