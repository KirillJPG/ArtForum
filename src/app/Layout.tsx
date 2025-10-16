import { lazy } from "react"
import { Outlet } from "react-router"

const Header = lazy(()=>import("@features/header/index"))

function Layout() {
  return (
    <>
     <Header/>
     <Outlet/>
    </>
  )
}

export default Layout
