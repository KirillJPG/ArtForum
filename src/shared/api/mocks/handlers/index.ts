import { delay, HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../..";
import { getDisntance } from "@/shared/lib/getDistance";

const users: ApiSchemas["User"][]=[
  {
    id: crypto.randomUUID(),
    avatar:"/public/image/avatar.webp",
    createAt:new Date().getTime(),
    name:"Vladix"
  },
  {
    id: crypto.randomUUID(),
    avatar:"/public/image/avatar.webp",
    createAt:new Date().getTime(),
    name:"SlaveX"
  },
]


const arts: ApiSchemas["ArtResponse"][] = [

  {
    id: crypto.randomUUID(),
    name: "artkiwejorewjorjioujriowjrwojorwioreio2art2artowekrowekrowkroworwekorwkowokoworoe",
    imageUrl:"/public/arts/amogus.jpg",
    author:users[0],
    categories:["characters","fantasy"],
    createAt:new Date().getTime(),
    likes:0
  },
  {
    id: crypto.randomUUID(),
    name: "SDSDSDASAS",
    imageUrl:"/public/arts/amogus.jpg",
    author:users[1],
    categories:["buildings","abstract","tilesets"],
    createAt:new Date().getTime(),
    likes:0
  },
  {
    id: crypto.randomUUID(),
    name: "CVCVCVCk",
    imageUrl:"/public/arts/amogus.jpg",
    author:users[0],
    categories:["characters","animals"],
    createAt:new Date().getTime(),
    likes:0
  },

];

export const handlers = [
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
      console.log(filtered,category,page)

      return HttpResponse.json(filtered)
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
];