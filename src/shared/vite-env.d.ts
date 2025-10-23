/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
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
declare module '*.module.css' {
  const styles: { [className: string]: string };
  export default styles;
}