import { Container } from "@/shared/ui/Container/Container";
import { Categories } from "./Categories";

export function ArtList(){
    return (
        <Container>
            <div className="py-2">
                <Categories/>
            </div>
            
        </Container>
    )
}