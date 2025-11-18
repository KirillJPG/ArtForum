import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Canvas } from "./lib/Canvas";

interface State{
    color:string,
    canvas:Canvas
}
interface Action{
    setColor:(color:string)=>void
}


export const useStore = createStore<State & Action>()(immer((set)=>({
        canvas:new Canvas(100,100),
        color:"#000000",
        setColor:(color)=>set((state)=>{
            state.color = color
        })
})))