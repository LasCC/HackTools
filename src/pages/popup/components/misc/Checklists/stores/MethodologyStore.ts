import { saveAs } from 'file-saver';
import jsyaml from 'js-yaml';
import Papa from 'papaparse';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Substep = {
  description: string;
};

export type Test = {
  id: string;
  description: string;
  reference: string;
  objectives: string[];
  observations: string;
  substeps: Substep[];
  wasTested: boolean;
  hasConcern: boolean;
  note: string;
};

export type Category = {
  id: string;
  title: string;
  atomic_tests: Test[];
};

export type State = {
  typeOfChecklist: 'pentest' | 'generic' | '';
  setTypeOfChecklist: (type: 'pentest' | 'generic' | '') => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  toggleTested: (categoryId: string, testId: string) => void;
  setHasConcern: (categoryId: string, testId: string, concern: boolean) => void;
  setNote: (categoryId: string, testId: string, note: string) => void;
  downloadCSV: (exportOption: string) => void;
  reset: () => void;
  importState: (file: File) => void;
  fetchMethodology: (url?: string) => Promise<void>;
  setMethodologyOption: (option: 'default' | 'custom') => void; // New setter function for methodology option
  methodologyOption: 'default' | 'custom'; // New state variable
};



const extractTypeofChecklist = parsedData => {

}



const createOWSTGStore = (id: string) =>
  create<State>(
    // @ts-ignore
    persist(
      (set, get) => ({
        // Define the checklist type to display the appropriate fields in the UI
        typeOfChecklist: '',
        setTypeOfChecklist: (type: 'pentest' | 'generic' | '') => set({ typeOfChecklist: type }),
        categories: [],
        setCategories: (categories: Category[]) => set({ categories }),
        toggleTested: (categoryId: string, testId: string) => {
          const categories = [...get().categories];
          const category = categories.find((cat) => cat.id === categoryId);
          const test = category?.atomic_tests.find((test) => test.id === testId);
          if (test) test.wasTested = !test.wasTested;
          set({ categories });
        },
        setHasConcern: (categoryId: string, testId: string, concern: boolean) => {
          const categories = [...get().categories];
          const category = categories.find((cat) => cat.id === categoryId);
          const test = category?.atomic_tests.find((test) => test.id === testId);
          if (test) test.hasConcern = concern;
          set({ categories });
        },
        setNote: (categoryId: string, testId: string, note: string) => {
          const categories = [...get().categories];
          const category = categories.find((cat) => cat.id === categoryId);
          const test = category?.atomic_tests.find((test) => test.id === testId);
          if (test) test.note = note;
          set({ categories });
        },
        downloadCSV: (exportOption) => {
          const categories = [...get().categories];
          let csvData = [];

          categories.forEach((category) => {
            category.atomic_tests.forEach((test) => {
              if (
                exportOption === 'all' ||
                (exportOption === 'vulnerable' && test.hasConcern) ||
                (exportOption === 'not_vulnerable' && test.wasTested && !test.hasConcern)
              ) {
                csvData.push({
                  category: category.title,
                  id: test.id,
                  name: test.description,
                  reference: test.reference,
                  tested: test.wasTested ? 'Yes' : 'No',
                  vuln: test.hasConcern ? 'Yes' : 'No',
                  vulnDescription: test.note || '',
                });
              }
            });
          });

          const csv = Papa.unparse(csvData);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, `checklist-${new Date().toISOString()}.csv`);
        },
        reset: () => set({ categories: [] }),
        importState: (file: File) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result as string;
            const newState = JSON.parse(result);
            set(newState);
          };
          reader.readAsText(file);
        },

        methodologyOption: 'default', // Initial value for methodology option

        // New setter function for methodology option
        setMethodologyOption: (option: 'default' | 'custom') => {
          set({ methodologyOption: option });
        },

        // New function to load remote methodology  
        fetchMethodology: async (url?: string) => {
          if (get().methodologyOption === 'default') {
            // Fetch default OWSTG methodology
            try {
              const response = await fetch('https://raw.githubusercontent.com/LasCC/Hack-Tools/dev/src/pages/popup/assets/data/Methodology/owstg.yaml');
              set({typeOfChecklist: 'pentest'})
              const data = await response.text();
              const parsedData = jsyaml.load(data).map((item) => item.category) as Category[];
              set({ categories: parsedData });
            } catch (error) {
              console.error('Failed to fetch OWSTG checklist:', error);
            }
          } else if (get().methodologyOption === 'custom' && url) {
            // Fetch custom methodology from provided URL
            try {
              const response = await fetch(url);
              const data = await response.text();
              const parsedData = jsyaml.load(data)
              set({ categories:  parsedData.map((item) => item.category) as Category[] }) ;
              set({typeOfChecklist: parsedData[0]?.type})
            } catch (error) {
              console.error('Failed to fetch custom methodology:', error);
            }
          }
        },
      }),
      {
        name: `methodology-tab-state-${id}`, // unique name
        getStorage: () => window.localStorage, // Use local storage
      }
    )
  );

export default createOWSTGStore;
