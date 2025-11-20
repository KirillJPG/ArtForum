import { useEffect, useRef} from "react"
import { useStore } from "./CanvasStore"

export function PaintCanvas(){
    return (
        <div className="grid grid-cols-[min-content_auto] gap-5 h-full">
            <SidePaint/>
            <BodyPaint/>
        </div>
    )
}

function BodyPaint(){
    return <div className="h-full grid justify-center items-center p-2">
        <Canvas/>
    </div>
}

function Canvas(){
    const {setCanvas,mouseMove} = useStore()
    const refCanvas = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
        if (refCanvas.current){
            setCanvas(refCanvas.current)
        }
    })

    return (
        <canvas className="border w-full h-full" onMouseMove={mouseMove} ref={refCanvas}></canvas>
    )
}

function SidePaint(){
    return <div className="p-2">
        <Pallete/>
    </div>
}


function Pallete(){
    return(
        <div className="grid">
            <div className="text-lg">Colors</div>
            <div className="flex gap-1">
                <ChooseColor color="#000000"/>
                <ChooseColor color="#000000"/>
            </div>
        </div>
    )
}

function ChooseColor({color}:{color:string}){
    const {setColor} = useStore()
    return(
        <div onClick={()=>setColor(color)} className={`p-3 cursor-pointer duration-500 border-2 border-transparent hover:border-white60`} style={{background:color}}></div>
    )
}