import { createBrowserRouter, redirect } from "react-router";
import Layout from "./Layout";
import { ROUTES } from "@/shared/model/routes";
import { lazy } from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:  Layout,
    children: [
      { index: true, Component:lazy(()=>import("@features/home/index") )},
      { path: ROUTES.USER, Component:lazy(()=>import("@features/Profile/index") )},
      { path: ROUTES.ART, Component:lazy(()=>import("@features/ArtPage/index"))},
      { path: ROUTES.ANY, loader:()=>redirect(ROUTES.HOME)},


    ],
  },
]);
