import { Pixel } from "./Pixel"

export class Canvas{
    width = 0
    height = 0
    pixels:Pixel[][] = []
    constructor(width:number,height:number){
        this.width = width
        this.height  = height
        this.generatePixels()
    }
    generatePixels(){
        this.pixels = []
        for (let y=0;y<this.height;y++){
            const column:Pixel[] = []
            for (let x = 0; x< this.width;x++){
                const pixel = new Pixel("#FFFFFF",x,y)
                column.push(pixel)
            }
            this.pixels.push(column)
        }
    }
    
}