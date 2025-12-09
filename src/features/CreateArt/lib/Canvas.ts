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
    isMouseHold:boolean = false
    isCanvasMoving:boolean = false
    pixelSize = 1
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
        this.isMouseHold = false
        document.body.style.cursor = "default"
        this.setHoverPixel(this.getPixelByPos(clientX,clientY))
        this.onChange()
    }
    onMouseDown(event:MouseEvent<HTMLCanvasElement>){
        if (event.button == 0) this.setMouseHold(true)         
        if (event.button == 1) this.setCanvasMove(true)         
    }
    onMouseUp(event:MouseEvent<HTMLCanvasElement>){
        if (event.button == 0) this.setMouseHold(false) 
        if (event.button == 1) this.setCanvasMove(false)         
    }
    setCanvasMove(move:boolean){
        this.isMouseHold = false
        this.isCanvasMoving = move
        document.body.style.cursor = move ? "move" : "default"
        this.onChange()
    }
    setMouseHold(hold:boolean){
        this.isMouseHold = hold
        this.isCanvasMoving = false
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
                if (this.isMouseHold && pixel.isHover){
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
        if (!this.isMouseHold || !hoverPixel || !oldPixel) return
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
            this.pixelSize =Math.max(1, Math.floor(this.pixelSize))
        }else{
            this.pixelSize*=2
            this.pixelSize = Math.floor(this.pixelSize)
        }
        this.resizeCanvas()
        this.render()
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
        const hoverPixel =  this.getPixelByPos(this.newMousePosition.x,this.newMousePosition.y)?.position
        const oldPixel = this.getPixelByPos(this.oldMousePosition.x,this.oldMousePosition.y)?.position
        if (!this.isMouseHold || !hoverPixel || !oldPixel) return
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
        this.resizeCanvas()
        this.ctx = canvas.getContext("2d")!
        this.drawPixels()
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
    moveCanvas(moveX:number,moveY:number){
        if(!this.isCanvasMoving) return
        this.canvas.style.left = this.canvas.offsetLeft+moveX+"px"
        this.canvas.style.top = this.canvas.offsetTop+moveY+"px"
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
        this.canvas.width =  this.width*this.pixelSize
        this.canvas.height = this.height*this.pixelSize
    }
    render(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
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