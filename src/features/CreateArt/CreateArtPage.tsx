import { PaintCanvas } from "./PaintCanvas";
import { useHeaderVariant } from "../header";

export function CreateArtPage(){
    useHeaderVariant("black")
    return(
        <PaintCanvas/>
    )
}