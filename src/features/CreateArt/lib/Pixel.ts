import type { position } from "./Canvas"
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