import { Container } from "@/shared/ui/Container/Container";
import { Logo } from "@/shared/ui/Logo/Logo";
import  { useStoreHeader } from "./headerStore";
import { SearchHeader } from "./SearchHeader";
import { Avatar } from "../user";

export function Header(){
    const {variant} = useStoreHeader()
    return ( 
        <div className="py-2 bg-transparent w-full fixed z-10">
            <Container>
                <div className="grid grid-flow-col items-center">
                    <Logo light={variant=="light"}/>
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
