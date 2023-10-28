import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '../../createPersistedState';
import alasql from 'alasql';
import scanmeData from './scanme.json';

interface StoreState {
    data: any[];
    setData: (data: any[]) => void;
    queryData: (query: string) => void;
}

// Load db in memory
alasql('CREATE TABLE nmap');
scanmeData.forEach((result) => {
    result.services.forEach((service) => {
        // Include all fields from result and service
        alasql('INSERT INTO nmap VALUES ?', [{
            ...result,
            ...service,
            // Flatten scripts_results and metadata
            scripts_results: JSON.stringify(service.scripts_results),
            metadata_state: service.metadata.state,
            metadata_observation: service.metadata.observation,
        }]);
    });
});

const useStore = create<StoreState>(
    // @ts-ignore
    persist(
        (set) => ({
            data: scanmeData,
            setData: (data) => set({ data }),
            queryData: (query) => {
                try {
                    const result = alasql(query);
                    set({ data: result });
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