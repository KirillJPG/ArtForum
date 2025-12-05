import { memo, useEffect, useRef, type ReactNode} from "react"
import { useStore } from "./CanvasStore"
import type { Tool } from "./lib/Canvas"
import { EraserIcon, FillIcon, PencilIcon } from "@/shared/ui/Icons/Icons"
import clsx from "clsx"
import "./PaintStyle.css"

export function PaintCanvas(){
    return (
        <div className="grid grid-cols-[max-content_auto] gap-5 h-full">
            <SidePaint/>
            <BodyPaint/>
        </div>
    )
}

function BodyPaint(){
    return <div className="h-full w-full relative grid justify-center items-center p-2">
        <Canvas/>
    </div>
}

function Canvas(){
    const setCanvas = useStore(state=>state.setCanvas)
    const mouseMove = useStore(state=>state.mouseMove)
    const mouseExit = useStore(state=>state.mouseExit)
    const onMouseDown = useStore(state=>state.onMouseDown)
    const onMouseUp = useStore(state=>state.onMouseUp)
    const onScroll = useStore(state=>state.onScroll)
    const refCanvas = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        const onload = setTimeout(()=>{
            if (refCanvas.current){
                setCanvas(refCanvas.current)
            }
        })
        return ()=>{
            clearTimeout(onload)
        }
    },[refCanvas.current])
    return (
        <canvas className="border w-full h-full relative overflow-y-scroll " onWheel={onScroll} onMouseLeave={mouseExit} onMouseDown={onMouseDown} onMouseUp={onMouseUp}  onMouseMove={mouseMove} ref={refCanvas}></canvas>
    )
}

function SidePaint(){
    return <div className="p-2 grid gap-2 auto-rows-max">
        <Pallete/>
        <Tools/>
    </div>
}


function Pallete(){
    const pallete = useStore(state=>state.pallete)
    return(
        <div className="grid">
            <div className="text-lg">Colors</div>
            <div className="grid gap-1 grid-cols-6 ">
                {pallete.map((e)=>(
                    <ChooseColor color={e} key={e}/>
                ))}
            </div>
        </div>
    )
}

const ChooseColor = memo(function ChooseColor({color}:{color:string}){
    const selectedColor = useStore(state=>state.color)
    const setColor = useStore(state=>state.setColor)
    const isSelected = selectedColor == color
    return(
        <div onClick={()=>setColor(color)} className={clsx(isSelected && "border-black",`w-6 h-6 cursor-pointer duration-500 border-2 border-transparent hover:border-white60`)} style={{background:color}}></div>
    )
})

function Tools(){
    return (
        <div className="grid gap-2">
            <div className="text-lg">Tools</div>
            <div className="grid gap-2 grid-flow-col auto-cols-max">
                <ChooseTool name="pencil" icon={<PencilIcon width={16} height={16}/>}/>
                <ChooseTool name="fill"   icon={<FillIcon   width={16} height={16}/>}/>
                <ChooseTool name="eraser" icon={<EraserIcon width={16} height={16}/>}/>
            </div>
        </div>
    )
}

const ChooseTool = memo(function ChooseTool({name,icon}:{name:Tool,icon:ReactNode}){
    const setTool = useStore(state=>state.setTool)
    const tool = useStore(state=>state.tool)
    const isSelect = name == tool
    return (
        <div className={clsx("rounded-md p-1 duration-300 hover:bg-gray-400 cursor-pointer border border-black90",!isSelect && "border-transparent")} onClick={()=>setTool(name)}>
            {icon}
        </div>
    )
})