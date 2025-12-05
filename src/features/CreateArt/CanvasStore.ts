import { immer } from "zustand/middleware/immer";
import { Canvas, type Tool } from "./lib/Canvas";
import { create } from "zustand";
import type { MouseEvent,  WheelEvent } from "react";

interface State{
    pallete:string[]
    canvas:Canvas,
    tool:Tool,
    color:string,
}
interface Action{
    addColorPallete:(color:string)=>void,
    setColor:(color:string)=>void
    setCanvas:(canvas:HTMLCanvasElement)=>void,
    mouseMove:(event:MouseEvent<HTMLCanvasElement>)=>void,
    onMouseDown:()=>void,
    onMouseUp:()=>void,
    setTool:(tool:Tool)=>void,
    mouseExit:(event:MouseEvent<HTMLCanvasElement>)=>void
    onScroll:(event:WheelEvent<HTMLCanvasElement>)=>void
}


export const useStore = create<State & Action>()(immer((set)=>({
        canvas:new Canvas(50,50),
        color:"#111111",
        tool:"pencil",
        pallete:["#123123","#234345","#AF2817","#FFFAAA"],
        mouseExit:(event)=>set(state=>{
            state.canvas.mouseExit(event)
        }),
        setColor:(color)=>set((state)=>{
            state.canvas.selectColor = color
            state.color = color
        }),
        setCanvas:(canvas)=>set((state)=>{
            state.canvas.setCanvas(canvas)
        }),
        mouseMove:(event)=>set((state)=>{
            state.canvas.onMouseMove(event)
        }),
        onScroll:(event)=>set((state)=>{
            state.canvas.onScroll(event)
        }),
        onMouseDown:()=>set(state=>{
            state.canvas.setMouseHold(true)
        }),        
        onMouseUp:()=>set(state=>{
            state.canvas.setMouseHold(false)
        }),    
        addColorPallete:(color)=>set(state=>{
            state.pallete.push(color)
        }),    
        setTool:(tool)=>set(state=>{
            state.canvas.setTool(tool)
            state.tool = tool
        })      
})))