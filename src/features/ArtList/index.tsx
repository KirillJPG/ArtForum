import { Container } from "@/shared/ui/Container/Container";
import { Categories as CategoriesComp} from "./Categories";
import { List } from "./List";
import { useArtListStore } from "./ArtListStore";

export const Categories = CategoriesComp

export function ArtList(){
    const {category,setCategory} = useArtListStore()
    return (
        <Container>
            <div className="py-2">
                <CategoriesComp category={category} setCategory={setCategory}/>
            </div>
            <List/>
        </Container>
    )
}