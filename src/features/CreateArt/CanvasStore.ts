import { immer } from "zustand/middleware/immer";
import { Canvas } from "./lib/Canvas";
import { create } from "zustand";
import type { MouseEvent } from "react";

interface State{
    color:string,
    canvas:Canvas
}
interface Action{
    setColor:(color:string)=>void
    setCanvas:(canvas:HTMLCanvasElement)=>void,
    mouseMove:(event:MouseEvent<HTMLCanvasElement>)=>void,
}


export const useStore = create<State & Action>()(immer((set)=>({
        canvas:new Canvas(100,100),
        color:"#000000",
        setColor:(color)=>set((state)=>{
            state.color = color
        }),
        setCanvas:(canvas)=>set((state)=>{
            state.canvas.setCanvas(canvas)
        }),
        mouseMove:(event)=>set((state)=>{
            state.canvas.onMouseMove(event)
        }),
        
})))