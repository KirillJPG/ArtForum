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
      { path: ROUTES.ARTS, Component:lazy(()=>import("@features/art-list/index"))},
      { path: ROUTES.ANY, loader:()=>redirect(ROUTES.HOME)},

    ],
  },
]);
