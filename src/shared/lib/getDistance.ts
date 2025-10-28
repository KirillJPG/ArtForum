import { Levenstein } from "./Levenstein";

export function getDisntance(str:string,str2:string){
    const lenght = Levenstein(str,str2)
    const percent = lenght / str.length * 100
    console.log(lenght,str,str2)
    if (!str.length) return str2.length
    return percent
}