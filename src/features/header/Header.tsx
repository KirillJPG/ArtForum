import { Container } from "@/shared/ui/Container/Container";
import { Logo } from "@/shared/ui/Logo/Logo";
import  { useStoreHeader } from "./headerStore";
import { SearchHeader } from "./SearchHeader";
import { Avatar } from "../user";
import clsx from "clsx";

export function Header(){
    const {variant} = useStoreHeader()
    return ( 
        <div className={clsx("py-2 h-fit w-full z-20",variant=="black"? "bg-white shadow sticky":"fixed z-20 bg-black95")}>
            {variant == "light" && <div className="absolute top-0 left-0 w-full h-full bg-black60 backdrop-blur-[5px]"></div>}
            <Container>
                <div className="grid grid-flow-col items-center z-30 relative">
                    <Logo light={variant=="light"}/>
                    <div className="-z-10">
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
