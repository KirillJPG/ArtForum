
export function Levenstein(str:string,str2:string){
    if (!str || !str2) return Math.max(str.length,str2.length)
    const [large,small]= str.length > str2.length ? [str,str2] : [str2,str]
    // let [n,m]= str.length > str2.length ? [str.length,str2.length] : [str2.length,str.length]

    const large_rows = [...large].map((_,id)=>id)
    const small_rows = [...small].map((_,id)=>id)

    let current_row = large_rows
    
    for (let i = 1; i < large_rows.length;i++){
        const prevRow = current_row
        current_row = [i,...Array(small_rows.length).fill(0)]        
        for (let j = 1; j < large_rows.length;j++){
            const add = str2[j] !== str[i] ? 1 : 0
            current_row[j] = Math.min(prevRow[j]+1,current_row[j-1]+1,prevRow[j-1]+add)
        }
    }
    return current_row[small_rows.length]
}