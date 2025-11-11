import { Footer } from "@/features/footer"
import { Header } from "@/features/header/index"
import { Suspense } from "react"
import { Outlet } from "react-router"




function Layout() {
  return (
    <div className="grid min-h-screen grid-rows-[min-content_1fr_min-content]">
     <Header/>
     <Suspense  fallback={<div>loading</div>}>
      <Outlet/>
     </Suspense>
      <Footer/>
    </div>
  )
}

export default Layout
