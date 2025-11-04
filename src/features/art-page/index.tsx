import type { PathParams, ROUTES } from "@/shared/model/routes"
import { Container } from "@/shared/ui/Container/Container"
import { useParams } from "react-router"

export default function Art(){
    const {artId} = useParams<PathParams[typeof ROUTES["ART"]]>()
    return(
        <Container>
            <>Art</>
        </Container>
    )
}

