import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '../../createPersistedState';
import alasql from 'alasql';
import scanmeData from './scanme.json';

interface StoreState {
    data: any[];
    tableData: any[];
    searchQuery: string;
    setData: (data: any[]) => void;
    setTableData: (tableData: any[]) => void;
    setSearchQuery: (query: string) => void;
    queryData: (query: string) => void;
    aliases: Record<string, string>;
    setAliases: (aliases: Record<string, string>) => void;


    activeScanResult: string;
    setActiveScanResult: (name: string) => void;
    scanResults: Record<string, any>;
    setScanResults: (scanResults: Record<string, any>) => void;
    initializeDatabase: (data: any[]) => void;
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
        (set, get) => ({
            scanResults: {},
            activeScanResult: '',
            setActiveScanResult: (name) => set({ activeScanResult: name }),
            setScanResults: (scanResults) => set({ scanResults }),
            aliases: {},
            setAliases: (aliases) => set({ aliases }),
            data: [],
            searchQuery: "SELECT * FROM nmap",
            setSearchQuery: (searchQuery) => set({ searchQuery }),
            setData: (data) => set({ data }),
            tableData: [],
            setTableData: (tableData) => set({ tableData }),
            queryData: (query) => {
                try {
                    const { aliases } = get();
                    let queries = query.split(' ');
                    queries = queries.map(q => {
                        // Replace the alias with its corresponding query
                        return aliases[q] ? aliases[q] : q;
                    });
                    query = queries.join(' ');

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
            initializeDatabase: (data: any[]) => {
                alasql('DROP TABLE IF EXISTS nmap');
                // Create new database
                alasql('CREATE TABLE nmap');
                data.forEach((service) => {
                    // Include all fields from service
                    alasql('INSERT INTO nmap VALUES ?', [{
                        ...service,
                        // Flatten scripts_results
                        scripts_results: JSON.stringify(service.scripts_results),
                    }]);
                });
            },
        }),
        {
            name: 'nmapviz-store',
            getStorage: () => storage
        }
    )
);

export default useStore;