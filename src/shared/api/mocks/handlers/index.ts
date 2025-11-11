import type { ApiSchemas } from "../..";

export const users: ApiSchemas["User"][]=[
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

export const arts: ApiSchemas["ArtResponse"][] = [

  {
    id: crypto.randomUUID(),
    name: "artkiwejorewjorjioujriowjrwojorwioreio2art2artowekrowekrowkroworwekorwkowokoworoe",
    imageUrl:"/public/arts/bg.jpg",
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
