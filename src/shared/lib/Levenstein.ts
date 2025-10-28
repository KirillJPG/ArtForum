
export function Levenstein(str:string,str2:string){
    if (!str || !str2) return Math.max(str.length,str2.length,1)
    
    
    let current_row = [...Array(str.length+1).fill(0).map((e,id)=>id++)]
    console.log(current_row)
    for(let i=1;i<str2.length+1;i++){
        const prev_row = current_row
        current_row = [i,...Array(str.length).fill(0)]
        for(let j=1;j<str.length+1;j++){
            let add = 0
            if (str2[i-1] !== str[j-1]) add++
            const value = Math.min(current_row[j-1]+1,prev_row[j]+1,prev_row[j-1]+add)
            current_row[j] = value 
        }
        console.log(current_row)
    }
    return current_row[str.length]
    
}