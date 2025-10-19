import { Container } from "@/shared/ui/Container/Container";
import { Logo } from "@/shared/ui/Logo/Logo";
import { Avatar } from "../user";

export default function Header(){
    return (
        <div className="py-2 shadow-md shadow-gray-100 ">
            <Container>
                <div className="grid grid-flow-col items-center">
                    <Logo/>
                    <div className="">

                    </div>
                    <div className="grid justify-end">
                        <Avatar/>
                    </div>
                </div>
            </Container>
        </div>
    )
}