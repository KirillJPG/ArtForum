import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router";

export function Logo(){
    return (
        <Link to={ROUTES.HOME} className="text-xl text-black font-bold">Art.io</Link>
    )
}