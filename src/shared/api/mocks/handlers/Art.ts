import { delay,  HttpResponse } from "msw"
import { arts, users } from "."
import type { ApiSchemas } from "../.."
import { getDisntance } from "@/shared/lib/getDistance"
import { http } from "../http"

export const ArtHandlers = [
    http.get("/art", 
    async(ctx) => {
      await delay(100)
      const category = ctx.query.get("category")
      const page = +ctx.query.get("page")
      let filtered:ApiSchemas["ArtResponse"][] = arts
      if (category != "" && category != "all"){
        filtered = arts.filter(e=>e.categories.includes(category))
      }
      filtered = filtered.slice(+page*10,+page*10+10)

      return HttpResponse.json(filtered)
    }
  ),
  http.get("/art/{name}", async(ctx) => {
      const {name} = ctx.params
      
      const filtered = arts.filter(e=>getDisntance(e.name.toLowerCase(),name) < 50 || e.name.toLowerCase().includes(name)).splice(0,10)
      await delay(100)

      return HttpResponse.json(filtered)
      
    }
  ),
  http.post("/art",async (ctx)=>{
    const {name} = await ctx.request.json() as ApiSchemas["CreateArt"]
    
    const newArt:ApiSchemas["ArtResponse"] = {
        name,
        imageUrl:"",
        id:crypto.randomUUID(),
        author:users[0],
        categories:["buildings"],
        createAt:new Date().getTime(),
        likes:0
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
] 