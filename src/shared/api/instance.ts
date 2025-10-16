import createFetchClient from "openapi-fetch"
import type { paths } from "./schema/generated"
import createClient from "openapi-react-query"
import { QueryClient } from "@tanstack/react-query"

export const fetchClient = createFetchClient<paths>({
    baseUrl:"http://localhost:5173"
})

export const queryClient = new QueryClient()
export const rqClient = createClient(fetchClient)