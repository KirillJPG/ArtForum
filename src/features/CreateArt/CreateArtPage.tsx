import { Container } from "@/shared/ui/Container/Container";
import { PaintCanvas } from "./PaintCanvas";
import { useHeaderVariant } from "../header";

export function CreateArtPage(){
    useHeaderVariant("black")
    return(
        <Container>
            <PaintCanvas/>
        </Container>
    )
}