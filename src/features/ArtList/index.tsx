import { Container } from "@/shared/ui/Container/Container";
import { Categories } from "./Categories";
import { List } from "./List";

export function ArtList(){
    return (
        <Container>
            <div className="py-2">
                <Categories/>
            </div>
            <List/>
        </Container>
    )
}