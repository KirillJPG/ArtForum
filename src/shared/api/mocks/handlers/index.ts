import { delay, HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../..";
import { getDisntance } from "@/shared/lib/getDistance";


const arts: ApiSchemas["ArtResponse"][] = [

  {
    id: crypto.randomUUID(),
    name: "artkiwejorewjorjioujriowjrwojorwioreio2art2artowekrowekrowkroworwekorwkowokoworoe",
    imageUrl:"/public/arts/amogus.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Art 4",
    imageUrl:"/public/arts/amogus.jpg"
  },

];

export const handlers = [
  http.get("/art", 
    async() => {
      await delay(100)
      return HttpResponse.json(arts)
    }
  ),
  http.get("/art/{name}", async(ctx) => {
      const name = ctx.params.name.toLowerCase()
      
      const filtered = arts.filter(e=>getDisntance(e.name.toLowerCase(),name) < 50 || e.name.toLowerCase().includes(name)).splice(0,10)
      await delay(100)

      return HttpResponse.json(filtered)
      
    }
  ),
  http.post("/art",async (ctx)=>{
    const {name,image} = await ctx.request.json() as ApiSchemas["CreateArt"]
    const type = image.split("data:")[1].split(";")[0]
    const reader = new File([image],name,{type})
    
    console.log(reader,)
    const newArt:ApiSchemas["ArtResponse"] = {
        name,
        imageUrl:"",
        id:crypto.randomUUID()
    }
    arts.push(newArt)
    return HttpResponse.json(newArt)
  }),

  http.delete("/art/{id}",async (ctx)=>{
    const {id} = ctx.params
    const index = arts.findIndex(e=>e.id == id)
    if (index === -1){
        return HttpResponse.json({
            code:404,
            meaasge:"Not found art"
        })
    }
    arts.splice(index,1)
    return HttpResponse.json({code:200,meaasge:"Delete Successfull"})
  })
];