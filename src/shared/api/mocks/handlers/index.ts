import { HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../..";


const arts: ApiSchemas["ArtResponse"][] = [
  {
    id: crypto.randomUUID(),
    name: "Dota 2",
    imageUrl:"/public/arts/amogus.jpg"
  },
];

export const handlers = [
  http.get("/art", () => {
    return HttpResponse.json(arts);
  }),

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