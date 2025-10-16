/// <reference types="vite/client" />

interface ImportMetaEnv{
    readonly VITE_BASE_API_URL:string
}
 
interface ImportMeta{
    readonly env:ImportMetaEnv
}
declare module '*.module.scss' {
  const styles: { [className: string]: string };
  export default styles;
}