import { Header } from "@/features/header/index"
import { Suspense } from "react"
import { Outlet } from "react-router"




function Layout() {
  return (
    <>
     <Header/>
     <Suspense fallback={<>loading</>}>
      <Outlet/>
     </Suspense>
    </>
  )
}

export default Layout
