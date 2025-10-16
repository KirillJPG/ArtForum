import "react-router-dom";
import { generatePath } from "react-router-dom";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ARTS: "/arts",
  ART: "/arts/:artId",
  ANY:"*"

} as const;

export interface PathParams {
  [ROUTES.ART]: {
    artId: number;
  };
};

export function generateTypedPath(
  path: string,
):string



export function generateTypedPath<Path extends keyof PathParams>(
  path: Path,
  params?: PathParams[Path]
): string { 
  return generatePath(path, params);
}

declare module "react-router-dom" {
   function generatePath<Path extends keyof PathParams>(
    path: Path,
    params?: PathParams[Path]
  ): string;
}


