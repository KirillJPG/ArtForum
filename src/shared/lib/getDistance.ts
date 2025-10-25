import { Levenstein } from "./Levenstein";

export function getDisntance(str:string,str2:string){
    console.log(str,str2)
    const lenght = Levenstein(str+"",str2+"")
    const percent = lenght / str.length * 100
    console.log(percent)
    return percent
}