import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


interface State{
    category:string,
    page:number
} 
interface Action{
    setCategory:(param:string)=>void
    setPage:(param:number)=>void
} 


export const useArtListStore = create<State & Action>()((immer((set)=>({
    category:"all",
    page:0,
    setCategory:(param)=>set(state=>{
        state.category = param
    }),
    setPage:(param)=>set(state=>{
        state.page = param
    })
}))))