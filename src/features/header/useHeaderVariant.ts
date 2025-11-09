import { useEffect } from "react";
import { useStoreHeader, type Variant } from "./headerStore";

export function useHeaderVariant(variant:Variant){
    const {setVariant} = useStoreHeader()
    useEffect(()=>{
        setVariant(variant)
        return()=>{
            setVariant(variant=="black" ? "light" : "black")
        }
    },[])
}