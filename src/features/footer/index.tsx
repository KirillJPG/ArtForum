import { Container } from "@/shared/ui/Container/Container";
import { Logo } from "@/shared/ui/Logo/Logo";

export function Footer(){
    return(
        <div className="bg-dark py-10 items-center relative z-10">
            <Container>
                <div className="grid gap-5 items-center">
                    <Logo light={true}/>
                    <div className="">
                        <div className="text-white60">Copyright © Art.io 2025. All Rights Reserved</div>
                    </div>
                </div>
            </Container>
        </div>
    )
}