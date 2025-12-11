import clsx from "clsx";
import { useState, type HTMLAttributes, type MouseEvent } from "react";
import { MoveIcon } from "../Icons/Icons";

export function MovingWindow({...props}:HTMLAttributes<HTMLDivElement>){
    const [moving,setMoving] = useState(false)
    const onMouseMove = (e:MouseEvent<HTMLDivElement>) =>{
        if (moving){
            const {movementX,movementY} = e
            e.currentTarget.style.left = e.currentTarget.offsetLeft+movementX+"px"
            e.currentTarget.style.top = e.currentTarget.offsetTop+movementY+"px"
        }
    }
    const onMouseLeave = (e:MouseEvent<SVGSVGElement>) =>{
        if (moving && e.currentTarget.parentElement){
            const {left,top} =e.currentTarget.parentElement.getBoundingClientRect()
            const {width,height} = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.left = e.clientX-left-Math.floor(width/2)+"px"
            e.currentTarget.style.top = e.clientY-top-Math.floor(height/2)+"px"
        }
        // setMoving(false)
    }
    return (
        <div {...props} className={clsx(props.className,"absolute z-10")} onMouseMove={onMouseMove}>
            {moving && <div className="fixed left-0 top-0 right-0 bottom-0 z-40" onMouseUp={()=>setMoving(false)}></div>}
            {props.children}
            <MoveIcon width={24} height={24} className="cursor-pointer mt-1" onMouseDown={()=>setMoving(true)} onMouseLeave={onMouseLeave}/>
        </div>
    )
}