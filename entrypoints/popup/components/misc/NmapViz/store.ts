import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "@components/createPersistedState"
import alasql from "alasql";
import { message } from "antd";

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
  queryResult: [];
  setQueryResults: (queryResult: any) => void;
  queryTableResult: [];
  setQueryTableResult: (queryTableResult: any) => void;
  activeScanResult: string;
  setActiveScanResult: (name: string) => void;
  scanResults: Record<string, any>;
  setScanResults: (scanResults: Record<string, any>) => void;
  initializeDatabase: (data: any[]) => void;
}

const useStore = create<StoreState>(
  // @ts-ignore
  persist(
    (set, get) => ({
      scanResults: {},
      queryResult: [],
      queryTableResult: [],
      setQueryTableResult: (queryTableResult) => set({ queryTableResult }),
      setQueryResults: (queryResult) => set({ queryResult }),
      activeScanResult: "",
      setActiveScanResult: (name) => set({ activeScanResult: name }),
      setScanResults: (scanResults) => set({ scanResults }),
      aliases: {},
      setAliases: (aliases) => set({ aliases }),
      data: [],
      searchQuery: "SELECT * FROM nmap WHERE state == 'open'",
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setData: (data) => set({ data }),
      tableData: [],
      setTableData: (tableData) => set({ tableData }),
      queryData: (query) => {
        if (!get().data || get().data.length === 0) {
          console.error("No data available to query");
          return;
        }
        try {
          // Alias resolution
          const { aliases } = get();
          let queries = query.split(" ");
          queries = queries.map((q) => {
            // Replace the alias with its corresponding query
            return aliases[q] ? aliases[q] : q;
          });
          query = queries.join(" ");

          let sqlQueryForTable = "SELECT * from nmap";
          let whereClause = query.toLowerCase().split("where")[1];
          if (whereClause) {
            sqlQueryForTable += " WHERE " + whereClause;
          }
          console.log({ sqlQueryForTable });
          let result;
          let tableResult;
          try {
            result = alasql(query) || [];
            tableResult = alasql(sqlQueryForTable) || [];
            console.log({ result, tableResult });
            if (result.length === 0)
              message.warning("Your query returned no results.");
            set({ queryResult: result, queryTableResult: tableResult });
          } catch (error) {
            console.error("Query returned no results: ", error);
          }
        } catch (error) {
          console.error("Invalid SQL query: ", error);
          message.warning(
            "Invalid SQL Query. Defaulting to 'SELECT * FROM nmap'"
          );
          set({ data: alasql("SELECT * from nmap") }); // Display all data if query is invalid
        }
      },
      initializeDatabase: (data: any[]) => {
        try {
          alasql("DROP TABLE IF EXISTS nmap;");
        } catch (error) {
          console.error("Failed to drop table: ", error);
        }
        // Create new database
        try {
          alasql("CREATE TABLE nmap");
        } catch (error) {
          console.error("Failed to create table: ", error);
        }
        data.forEach((service) => {
          // Include all fields from service
          try {
            alasql("INSERT INTO nmap VALUES ?", [
              {
                ...service,
                // Flatten scripts_results
                scripts_results: JSON.stringify(service.scripts_results),
              },
            ]);
          } catch (error) {
            console.error("Failed to insert data into table: ", error);
          }
        });
      },
    }),
    {
      name: "nmapviz-store",
      getStorage: () => storage,
    }
  )
);

export default useStore;
