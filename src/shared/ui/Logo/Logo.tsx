import { ROUTES } from "@/shared/model/routes";
import clsx from "clsx";
import { Link } from "react-router";

export function Logo({light=false}:{light?:boolean}){
    return (
        <Link to={ROUTES.HOME} className={clsx(light?"text-white":"text-black","text-xl font-bold duration-500")}>Art.io</Link>
    )
}