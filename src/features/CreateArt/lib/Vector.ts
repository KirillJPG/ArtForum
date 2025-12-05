export class Vector{
    x =0
    y =0
    constructor(x:number,y:number){
        this.x = x
        this.y = y
    }
    getLenght(){
        return Math.floor(Math.hypot(this.x,this.y))
    }
    getNormalized(){
        return new Vector(this.x==0 ? 0: this.x/Math.abs(this.x),this.y == 0 ? 0 : this.y/Math.abs(this.y))
    }
}