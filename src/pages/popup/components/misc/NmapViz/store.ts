import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '../../createPersistedState';
import alasql from 'alasql';
import scanmeData from './scanme.json';

interface StoreState {
    data: any[];
    tableData: any[];
    setData: (data: any[]) => void;
    setTableData: (tableData: any[]) => void;
    queryData: (query: string) => void;
}

// Load db in memory
alasql('CREATE TABLE nmap');
scanmeData.forEach((service) => {
    // Include all fields from service
    alasql('INSERT INTO nmap VALUES ?', [{
        ...service,
        // Flatten scripts_results
        scripts_results: JSON.stringify(service.scripts_results),
    }]);
});

const useStore = create<StoreState>(
    // @ts-ignore
    persist(
        (set) => ({
            data: scanmeData,
            setData: (data) => set({ data }),
            tableData: [],
            setTableData: (tableData) => set({ tableData }),
            queryData: (query) => {
                try {

                    let sqlQueryForTable = "SELECT * from nmap"
                    let whereClause = query.toLowerCase().split("where")[1];
                    if (whereClause) {
                        sqlQueryForTable += " WHERE " + whereClause;
                    }
                    const result = alasql(query);
                    set({ data: result });

                    const tableResult = alasql(sqlQueryForTable)
                    set({ tableData: tableResult })

                } catch (error) {
                    console.error("Invalid SQL query: ", error);
                    set({ data: scanmeData }); // Display all data if query is invalid
                }
            },
        }),
        {
            name: 'nmapviz-store',
            getStorage: () => storage,
        }
    )
);

export default useStore;