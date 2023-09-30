import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TabItem {
    label: string;
    id: string;
    key: string;
    closable?: boolean;
}

const initialItems: TabItem[] = [
    { label: "OWSTG", id: "0", key: "0", closable: false },
];

interface State {
    activeKey: string;
    items: TabItem[];
    newTabIndex: number;
    setActiveKey: ( activeKey: string ) => void;
    setItems: ( items: TabItem[] ) => void;
    add: () => void;
    remove: ( targetKey: string ) => void;
    rename: ( targetKey: string, newLabel: string ) => void;
    exportState: () => string;
    importState: ( newState: string ) => void;
}

const tabStateStore = create<State>(
    // @ts-ignore
    persist(
        ( set, get ) => ( {
            activeKey: initialItems[ 0 ].key,
            items: initialItems,
            newTabIndex: 0,
            setActiveKey: ( activeKey: string ) => set( { activeKey } ),
            setItems: ( items: TabItem[] ) => set( { items } ),
            add: () => {
                const newActiveKey = `${ ++get().newTabIndex }`;
                const newPanes = [ ...get().items ];
                newPanes.push( { label: "New Tab", id: newActiveKey, key: newActiveKey } );
                set( { items: newPanes, activeKey: newActiveKey, newTabIndex: get().newTabIndex } );
            },
            remove: ( targetKey: string ) => {
                let newActiveKey = get().activeKey;
                localStorage.removeItem( `methodology-tab-state-${ targetKey }` );
                let lastIndex = -1;
                get().items.forEach( ( item, i ) => {
                    if ( item.key === targetKey ) {
                        lastIndex = i - 1;
                    }
                } );
                const newPanes = get().items.filter( ( item ) => item.key !== targetKey );
                if ( newPanes.length && newActiveKey === targetKey ) {
                    if ( lastIndex >= 0 ) {
                        newActiveKey = newPanes[ lastIndex ].key;
                    } else {
                        newActiveKey = newPanes[ 0 ].key;
                    }
                }
                set( { items: newPanes, activeKey: newActiveKey } );
            },
            rename: ( targetKey: string, newLabel: string ) => {
                let newItems = [ ...get().items ];
                const itemToRename = newItems.find( ( item ) => item.key === targetKey );
                if ( itemToRename ) {
                    itemToRename.label = newLabel;
                    set( { items: newItems } );
                }
            },
            exportState: () => JSON.stringify( get() ),
            importState: ( newState: string ) => {
                set( () => JSON.parse( newState ) );
            },
        } ),
        {
            name: `tab-management-store`,
            getStorage: () => localStorage // localstorage for now since there indexeddb oncChange due to async issue
        }
    )
);

export default tabStateStore;
