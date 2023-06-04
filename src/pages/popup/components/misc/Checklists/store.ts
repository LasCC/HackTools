import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Substep = {
  description: string;
};

export type Test = {
  id: string;
  description: string;
  isvulnerable: boolean;
  reference: string;
  objectives: string[];
  observations: string;
  substeps: Substep[];
  wasTested: boolean;
  wasVulnerable: boolean;
  note: string;
};

export type Category = {
  id: string;
  title: string;
  atomic_tests: Test[];
};

export type State = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  toggleTested: (categoryId: string, testId: string) => void;
  setVulnerable: (categoryId: string, testId: string, vulnerability: boolean) => void;
  setNote: (categoryId: string, testId: string, note: string) => void;
  downloadCSV: (exportOption: string) => void;
  reset: () => void;
};



type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const createOWSTGStore = (id:string | TargetKey) => create<State>( 

  // @ts-ignore
  persist(
    (set, get) => ({
      categories: [],
      setCategories: (categories: Category[]) => set({ categories }),
      toggleTested: (categoryId: string, testId: string) => {
        const categories = [...get().categories];
        const category = categories.find(cat => cat.id === categoryId);
        const test = category?.atomic_tests.find(test => test.id === testId);
        if (test) test.wasTested = !test.wasTested;
        set({ categories });
      },
      setVulnerable: (categoryId: string, testId: string, vulnerability: boolean) => {
        const categories = [...get().categories];
        const category = categories.find(cat => cat.id === categoryId);
        const test = category?.atomic_tests.find(test => test.id === testId);
        if (test) test.wasVulnerable = vulnerability;
        set({ categories });
      },
      setNote: (categoryId: string, testId: string, note: string) => {
        const categories = [...get().categories];
        const category = categories.find(cat => cat.id === categoryId);
        const test = category?.atomic_tests.find(test => test.id === testId);
        if (test) test.note = note;
        set({ categories });
      },
      

      downloadCSV: (exportOption) => {
        const categories = [...get().categories];
        let csvData = [];
      
        categories.forEach((category) => {
          category.atomic_tests.forEach((test) => {
            if (exportOption === 'all' || 
                (exportOption === 'vulnerable' && test.wasVulnerable) || 
                (exportOption === 'not_vulnerable' && test.wasTested && !test.wasVulnerable)) {
              csvData.push({
                category: category.title,
                id: test.id,
                name: test.description,
                reference: test.reference,
                tested: test.wasTested ? 'Yes' : 'No',
                vuln: test.wasVulnerable ? 'Yes' : 'No',
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


    }),
    {
      name: `owstg-${id}-store`, // unique name
      getStorage: () => window.localStorage, // Use local storage
    }
  )
);


export default createOWSTGStore;
