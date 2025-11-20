import type { MouseEvent } from "react";
import { Pixel } from "./Pixel"
import { Vector } from "./Vector";

export class Canvas{
    width = 0
    height = 0
    pixels:Pixel[][] = []
    canvas!:HTMLCanvasElement;
    ctx!:CanvasRenderingContext2D;
    pixelSize = 30
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
                const pixel = new Pixel("#555555",new Vector(x,y))
                column.push(pixel)
            }
            this.pixels.push(column)
        }
    }
    setCanvas(canvas:HTMLCanvasElement){
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")!
        this.resizeCanvas()
        this.drawPixels()
    }
    onMouseMove(e:MouseEvent<HTMLCanvasElement>){
        const {clientX,clientY,currentTarget:{offsetLeft,offsetTop}} = e
        const [x,y] = [clientX-offsetLeft,clientY-offsetTop]
        const [xPixel,yPixel] = [Math.floor(x/this.pixelSize).toFixed(0),Math.floor(y/this.pixelSize).toFixed(0)]
        const pixel = this.pixels[+yPixel][+xPixel]
        this.setHoverPixel(pixel)

    }
    setHoverPixel(hoveredPixel:Pixel){
        for (const row of this.pixels){
            for (const pixel of row){
                if (pixel == hoveredPixel) pixel.isHover = true
                else pixel.isHover = false
            }
        }
        this.drawPixels()
    }
    
    resizeCanvas(){
        const bound = this.canvas.getBoundingClientRect()
        const width = bound.width
        const height = bound.height 
        this.canvas.width = +width
        this.canvas.height = +height
    }
    drawPixels(){
        this.pixels.forEach((row)=>{
            row.forEach((pixel)=>{
                this.ctx.fillStyle = pixel.color
                if (pixel.isHover) this.ctx.fillStyle = "red"
                this.ctx.fillRect(pixel.position.x*this.pixelSize,pixel.position.y*this.pixelSize,this.pixelSize,this.pixelSize)
            })
        })
    }
    
}