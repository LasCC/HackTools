import { create } from "zustand";
import { persist } from 'zustand/middleware';


export enum ADB_MODE {
    LOCAL = "LOCAL",
    REMOTE = "REMOTE",
}



interface State {
    mode: ADB_MODE;
    handleModeChange: () => void;
    adb_ip : string;
    handleIPChange: (evt) => void;
    adb_port : string;
    handlePortChange: (evt) => void;

}

const useADBStore = create<State>(
    // @ts-ignore
    persist(
        (set, get) => ({

            mode: ADB_MODE.LOCAL,
            handleModeChange: () => set((state) => ({ mode: state.mode === ADB_MODE.LOCAL ? ADB_MODE.REMOTE : ADB_MODE.LOCAL })),
            adb_ip: "",
            handleIPChange: (evt) => set({ adb_ip: evt?.target.value }),
            adb_port: "",
            handlePortChange: (evt) => set({ adb_port: evt?.target.value }),
        }),
        {
            name: `adb-store`,
        }
    )
);

export default useADBStore;

