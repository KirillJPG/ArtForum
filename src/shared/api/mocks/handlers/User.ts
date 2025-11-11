import { delay,  HttpResponse } from "msw"
import { http } from "../http"
import { users } from "."

export const UserHandlers = [
    http.get("/user/{name}", 
    async(ctx) => {
      await delay(100)
      const {name} = ctx.params
      const user = users.filter(e=>e.name == name)[0]
      return HttpResponse.json(user)
    }
  ),
] 