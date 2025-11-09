import { Container } from "@/shared/ui/Container/Container"
import { useHeaderVariant } from "../header"

export default function Art(){
    useHeaderVariant("black")
    
    return(
        <Container>
            <div className="text-black">Art</div>
        </Container>
    )
}

