import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export type Substep = {
  id: string;
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
  downloadCSV: () => void;
};

const useStore = create<State>(
  
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
      downloadCSV: () => {
        const categories = [...get().categories];
        const csvData = [];
        categories.forEach((category) => {
          category.atomic_tests.forEach((test) => {
            csvData.push({
              category: category.title,
              id: test.id,
              name: test.description,
              reference: test.reference,
              tested: test.wasTested ? 'Yes' : 'No',
              vuln: test.wasVulnerable ? 'Yes' : 'No',
              vulnDescription: test.note || '',
            });
          });
        });
        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `checklist-${new Date().toISOString()}.csv`);
      },
    }),
    {
      name: 'owstg-checklist', // Unique key
      getStorage: () => window.localStorage, // Use local storage
    }
  )
);

export default useStore;
