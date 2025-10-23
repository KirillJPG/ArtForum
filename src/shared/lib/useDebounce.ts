import { useState } from "react";

export function useDebounce<D>(value:D){
    const [state,setState] = useState<D>(value)
    
    return [state,setState]
}