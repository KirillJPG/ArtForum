import { Link, type LinkProps} from "react-router-dom";

interface ILink extends LinkProps{
    type?:string
}
export function NavLink({...props}:ILink){
    console.log(name)
    return (
        <Link {...props} className="decoration-0 px-2 py-1 text-violet-600 font-medium duration-500 hover:brightness-50"/>
    )
}