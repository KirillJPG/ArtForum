import { ArtList } from "../ArtList";
import { Hero } from "../hero";
import { useHeaderVariant } from "../header/index";

export default function Home(){    
    
    useHeaderVariant("light")
    return(
        <>
        <Hero/>
        <ArtList/>
        </>
    )
}

