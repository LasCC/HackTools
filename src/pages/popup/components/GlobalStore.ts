import create from 'zustand'
import { persist } from 'zustand/middleware'
import Tabs, {IRouterComponent} from './SideItemMenuRouting'



interface CurrentHacktoolsPage {
    mode: string
    index: string | number
}    
interface GlobalState {
    hacktoolsRoutingState: CurrentHacktoolsPage
    hacktoolsColormode: string
    switchHacktoolsColormode: (mode: string) => void
    setHacktoolsRoutingState: (mode: string, index: number) => void
    darkMode: boolean
    setDarkModeState: (mode: boolean) => void
    hackTools: string
    setHackToolsState: (mode: string) => void
    index: string
    setIndex: (index: string) => void
}

// @ts-ignore
export const useStore = create<GlobalState>(persist(
    (set,get) => ({
        hacktoolsRoutingState: {
            mode: Tabs[0].type,
            index: Tabs[0].key
        },
        hacktoolsColormode: 'light',
        switchHacktoolsColormode: (mode: string) => set(() => ({
            hacktoolsColormode: get().hacktoolsColormode === 'light' ? 'dark' : 'light',
        })),
        setHacktoolsRoutingState: (mode: string, index: number) => set(() => ({
            hacktoolsRoutingState: {
                mode,
                index,
            }
        })),
        darkMode: false,
        setDarkModeState: (mode: boolean) => set(() => ({
            darkMode: mode,
        })),
        hackTools: "web",
        setHackToolsState: (mode: string) => set(() => ({
            hackTools: mode,
        })),
        index: '1',
        setIndex: (index: string) => set(() => ({
            index: index,
        })),
    }),
    {
        name: 'GlobalState', // unique name
        getStorage: () => localStorage, 
    }
))