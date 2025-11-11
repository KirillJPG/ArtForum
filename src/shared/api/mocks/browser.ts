import { setupWorker } from "msw/browser";
import { ArtHandlers } from "./handlers/Art";
import { UserHandlers } from "./handlers/User";

export const worker = setupWorker(...ArtHandlers,...UserHandlers);