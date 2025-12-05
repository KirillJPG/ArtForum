import type { MouseEvent,  WheelEvent } from "react";
import { Pixel } from "./Pixel"
import { Vector } from "./Vector";

export type Tool = "eraser" | "fill" | "pencil"

export interface position{
    x:number,
    y:number
}
export class Canvas{
    width = 0
    height = 0
    pixels:Pixel[][] = []
    canvas!:HTMLCanvasElement;
    ctx!:CanvasRenderingContext2D;
    mouseHold:boolean = false
    pixelSize = 20
    selectColor:string = "#444444"
    tool:Tool = "pencil"
    newMousePosition:position = {x:0,y:0}
    oldMousePosition:position = {x:0,y:0}
    constructor(width:number,height:number){
        this.width = width
        this.height  = height
        this.generatePixels()
    }
    setTool(tool:Tool){
        this.tool = tool
    }
    mouseExit(event:MouseEvent<HTMLCanvasElement>){
        const {clientX,clientY} = event
        this.newMousePosition = {x:0,y:0}
        this.oldMousePosition = {x:0,y:0}
        this.mouseHold = false

        this.setHoverPixel(this.getPixelByPos(clientX,clientY))
        this.onChange()
    }
    setMouseHold(hold:boolean){
        this.mouseHold = hold
        this.onChange()
    }
        onChange(){
        switch(this.tool){
            case "pencil":
                this.draw()
                break
            case "eraser":
                this.eraser()
                break
            case "fill":
                this.fill()
                break
        }
    }
    getNeighborsPixel(pixel?:Pixel){
        if (!pixel) return []
        const {x,y} = pixel.position
        const neighbors:Pixel[] = []
        for (const row of this.pixels){
            for (const pixel2 of row){
                const {x:x2,y:y2} = pixel2.position
                if ((Math.abs(x2-x)+Math.abs(y-y2)) <= 1 && pixel != pixel2){
                    neighbors.push(pixel2)
                }
            }
        }
        return neighbors
    }
    fill(){
        for (const row of this.pixels){
            for (const pixel of row){
                if (this.mouseHold && pixel.isHover){
                    const color = pixel.color
                    pixel.color = this.selectColor
                    const neighbors = this.getNeighborsPixel(pixel).filter(e=>e.color == color)
                    const processed:Pixel[] = []
                    while (neighbors.length != 0){
                        const first = neighbors[0]
                        const neighbors_first = this.getNeighborsPixel(first).filter(e=>e.color == color && !processed.includes(first) && !neighbors.includes(e))
                        neighbors.push(...neighbors_first)
                        first.color = this.selectColor
                        processed.push(first)
                        neighbors.shift()
                    }
                    return 
                }
            }
        }
    }
    eraser(){
        const hoverPixel =  this.getPixelByPos(this.newMousePosition.x,this.newMousePosition.y)!.position
        const oldPixel = this.getPixelByPos(this.oldMousePosition.x,this.oldMousePosition.y)!.position
        if (!this.mouseHold || !hoverPixel || !oldPixel) return
        const linePixels = this.getLinePixels(hoverPixel,oldPixel)
        for (const pixel of linePixels){
            pixel.color = "transparent"
        }
    }

    onScroll(e:WheelEvent<HTMLCanvasElement>){
        const {deltaY,clientX:x,clientY:y} = e
        this.oldMousePosition = this.newMousePosition
        this.newMousePosition = {x,y}
        const isDown = deltaY > 0 ? true : false
        if (isDown){
            this.pixelSize*=0.9
            this.pixelSize = +this.pixelSize.toFixed(0)
        }else{
            this.pixelSize*=1.1
            this.pixelSize = +this.pixelSize.toFixed(0)
        }
        
        this.updateHover()
        this.render()
    }
    getAABB(pos1:position,pos2:position){
        const {x:xPos,y:yPos} = pos1
        const {x:x2Pos,y:y2Pos} = pos2
        const [xFrom,xTo] = [Math.min(xPos,x2Pos),Math.max(xPos,x2Pos)]
        const [yFrom,yTo] = [Math.min(yPos,y2Pos),Math.max(yPos,y2Pos)]
        return {xFrom,xTo,yFrom,yTo}
    }
    checkIsValid(min:number,value:number,max:number){
        return Math.min(Math.max(min,value),max) == value
    }
    getLinePixels(pos1:position,pos2:position){
        let vector = new Vector(pos1.x-pos2.x,pos1.y-pos2.y)
        const length = vector.getLenght()
        const linePixels:Pixel[] = [this.pixels[pos1.y][pos1.x]]
        for (let i = 0; i<length;i++){
            const normalized = vector.getNormalized()
            vector = new Vector(vector.x-normalized.x,vector.y-normalized.y)
            linePixels.push(this.pixels[pos1.y-vector.y][pos1.x-vector.x])
        }  
        return linePixels
    }
    draw(){
        const hoverPixel =  this.getPixelByPos(this.newMousePosition.x,this.newMousePosition.y)!.position
        const oldPixel = this.getPixelByPos(this.oldMousePosition.x,this.oldMousePosition.y)!.position
        if (!this.mouseHold || !hoverPixel || !oldPixel) return
        const linePixels = this.getLinePixels(hoverPixel,oldPixel)
        for (const pixel of linePixels){
            pixel.color = this.selectColor
        }
    }
    generatePixels(){
        this.pixels = []
        for (let y=0;y<this.height;y++){
            const column:Pixel[] = []
            for (let x = 0; x< this.width;x++){
                const pixel = new Pixel("transparent",{x,y})
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
        this.drawBackground()
    }
    getPixelByPos(mouseX:number,mouseY:number):Pixel | null{
        const [x,y] = [mouseX,mouseY]
        const [xPixel,yPixel] = [Math.floor(x/Math.abs(this.pixelSize)).toFixed(0),Math.floor(y/Math.abs(this.pixelSize)).toFixed(0)]
        try{
            const pixel = this.pixels[+yPixel][+xPixel]
            return pixel
        }catch{
            return null
        }
    }
    updateHover(){
        this.setHoverPixel(this.getPixelByPos(this.newMousePosition.x,this.newMousePosition.y))
    }
    onMouseMove(e:MouseEvent<HTMLCanvasElement>){
        const {left,top} = this.canvas.getBoundingClientRect()
        const {clientX,clientY} = e
        this.oldMousePosition = this.newMousePosition
        this.newMousePosition = {x:clientX-left,y:clientY-top}
        this.updateHover()
        this.onChange()
    }
    setHoverPixel(hoveredPixel?:Pixel | null){
        for (const row of this.pixels){
            for (const pixel of row){
                if (pixel == hoveredPixel ) pixel.isHover = true
                else {
                    pixel.isHover = false
                }

            }
        }
        this.render()
    }
    
    resizeCanvas(){
        const {width,height} = this.canvas.getBoundingClientRect()
        this.canvas.width = width
        this.canvas.height = height
    }
    drawBackground(){
         this.pixels.forEach((row)=>{
            row.forEach((pixel)=>{
                const positionNum = pixel.position.x + pixel.position.y
                if (positionNum % 2 == 1) this.ctx.fillStyle = "#22222240"
                else this.ctx.fillStyle = "white"
                this.ctx.fillRect(pixel.position.x*this.pixelSize,pixel.position.y*this.pixelSize,this.pixelSize,this.pixelSize)
            })
        })
    }
    render(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.drawBackground()
        this.drawPixels()
    }
    drawPixels(){
        this.pixels.forEach((row)=>{
            row.forEach((pixel)=>{
                this.ctx.fillStyle = pixel.color
                if (pixel.isHover) this.ctx.fillStyle = this.selectColor
                if (this.tool == "eraser" && pixel.isHover) this.ctx.fillStyle = "transparent"
                if (this.tool == "fill" && pixel.isHover) this.ctx.fillStyle = this.selectColor
                this.ctx.fillRect(pixel.position.x*this.pixelSize,pixel.position.y*this.pixelSize,this.pixelSize,this.pixelSize)
            })
        })
    }
    
}