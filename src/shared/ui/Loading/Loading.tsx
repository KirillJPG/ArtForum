import { LoadingIcon } from "../Icons/LoadingIcon";

export function Loading(){
    return <div className="grid w-full justify-items-center items-center"><div className="flex gap-2"><LoadingIcon /><div className="text-center text-lg">Loading</div></div></div>
}