import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import { router } from './router.tsx';
import { QueryProvider } from './providers/QueryClientProvider.tsx';
import "./main.css"

async function enableMocking(){
  const { worker } = await import("@shared/api/mocks/browser")
  return worker.start()
}

enableMocking().then(()=>{
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryProvider>
          <RouterProvider router={router}/>
        </QueryProvider>
    </StrictMode>,
  )
})