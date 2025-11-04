import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


interface State{
    category:string
} 
interface Action{
    setCategory:(param:string)=>void
} 


export const useArtListStore = create<State & Action>()((immer((set)=>({
    category:"all",
    setCategory:(param)=>set(state=>{
        state.category = param
    })
}))))