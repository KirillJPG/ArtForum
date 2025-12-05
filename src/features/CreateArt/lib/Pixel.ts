import type { position } from "./Canvas"
import { Vector } from "./Vector"

export class Pixel{
    color = "#FFFFFF"
    position!:position
    isHover = false
    constructor(color:string,position:position){
        this.color = color
        this.position = position
    }
    setHover(isHover:boolean){
        this.isHover = isHover
    }

}