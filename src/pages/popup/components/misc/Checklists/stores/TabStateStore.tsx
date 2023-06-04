import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import OWSTG from '../OWSTG';

const initialItems = [
    { label: "OWSTG", children: <OWSTG id={"0"} />, key: "0" , closable: false},
];

interface State {
    activeKey: string;
    items: typeof initialItems;
    newTabIndex: number;
    setActiveKey: (activeKey: string) => void;
    setItems: (items: typeof initialItems) => void;
    add: () => void;
    remove: (targetKey: string) => void;
}

const useStore = create<State>(
    // @ts-ignore
    persist(
        (set, get) => ({
            activeKey: initialItems[0].key,
            items: initialItems,
            newTabIndex: 0,

            setActiveKey: (activeKey: string) => set({ activeKey }),
            setItems: (items: typeof initialItems) => set({ items }),

            add: () => {
                const newActiveKey = `${++get().newTabIndex}`;
                const newPanes = [...get().items];
                // @ts-ignore
                newPanes.push({
                    label: "New Tab",
                    children: <OWSTG id={newActiveKey} />,
                    key: newActiveKey,
                });
                set({ items: newPanes, activeKey: newActiveKey, newTabIndex: get().newTabIndex });
            },

            remove: (targetKey: string) => {
                const newPanes = get().items.filter(item => item.key !== targetKey);
                let newActiveKey = get().activeKey;
                if (newActiveKey === targetKey) {
                    newActiveKey = newPanes.length ? newPanes[0].key : "";
                }
                set({ items: newPanes, activeKey: newActiveKey });
                window.localStorage.removeItem(`methodology-tab-state-${targetKey}`);
            },
        }),
        {
            name: `tab-management-store`,
            getStorage: () => window.localStorage,
        }
    )
);

export default useStore;
