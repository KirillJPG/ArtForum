import { Vector } from "./Vector"

export class Pixel{
    color = "#FFFFFF"
    position:Vector = new Vector(0,0)
    isHover = false
    constructor(color:string,position:Vector){
        this.color = color
        this.position = position
    }
    setHover(isHover:boolean){
        this.isHover = isHover
    }

}