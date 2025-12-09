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
    onMouseDown:(event:MouseEvent<HTMLCanvasElement>)=>void,
    onMouseUp:(event:MouseEvent<HTMLCanvasElement>)=>void,
    setTool:(tool:Tool)=>void,
    mouseExit:(event:MouseEvent<HTMLCanvasElement>)=>void,
    onScroll:(event:WheelEvent<HTMLCanvasElement>)=>void,
    onMovePaint:(event:MouseEvent<HTMLDivElement>)=>void,
    onMouseUpPaint:(event:MouseEvent<HTMLDivElement>)=>void,
}


export const useStore = create<State & Action>()(immer((set)=>({
        canvas:new Canvas(100,100),
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
        onMouseDown:(event)=>set(state=>{
            state.canvas.onMouseDown(event)
        }),        
        onMouseUp:(event)=>set(state=>{
            state.canvas.onMouseUp(event)
        }),    
        addColorPallete:(color)=>set(state=>{
            state.pallete.push(color)
        }),    
        setTool:(tool)=>set(state=>{
            state.canvas.setTool(tool)
            state.tool = tool
        }),
        onMovePaint:(event)=>set(state=>{
            state.canvas.moveCanvas(event.movementX,event.movementY)
        }),
        onMouseUpPaint:(event)=>set(state=>{
            if (event.button == 1) state.canvas.setCanvasMove(false)
        }),
})))