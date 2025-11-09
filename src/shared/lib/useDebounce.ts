import { useEffect, useState } from "react";

export function useDebounce<D>(value:D,ms:number=500){
    const [debounceState,setDebounceState] = useState<D>(value)
    const [state,setState] = useState<D>(value)
    useEffect(()=>{
        const timeout =setTimeout(()=>{
            setState(debounceState)
        },ms)
        return ()=>{
            clearTimeout(timeout)
        }   
    },[debounceState,ms])
    return {state,setDebounceState}
}