import { createOpenApiHttp } from "openapi-msw";
import type { paths } from "@/shared/api/schema/generated";


export const http = createOpenApiHttp<paths>({
  baseUrl: "http://localhost:5173",
});