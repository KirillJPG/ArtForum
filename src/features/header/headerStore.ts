import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type Variant = "light"|"black"

interface State{
    variant:Variant
}
interface Action{
    setVariant:(state:Variant)=>void
}


export const useStoreHeader = create<State & Action>()(immer((set) => ({
  variant:"black",
  setVariant:(variant)=>set((state)=>{
    state.variant = variant
  })    
})))