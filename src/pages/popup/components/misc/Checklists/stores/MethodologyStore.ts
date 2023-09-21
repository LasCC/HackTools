import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { message } from 'antd';
import { AtomicTest, Substep, Pentest, TestCaseStatus as ImportedTestCaseStatus } from './../ChecklistInterfaces';
import checklists from "../../../../assets/data/Methodology/OWSTG.json"
import { Record, String, Array, Union, Literal } from 'runtypes';

const TestCaseStatus = Union(
  Literal('NOT_TESTED'),
  Literal('IN_PROGRESS'),
  Literal('PASSED'),
  Literal('FAILED')
);

const AtomicTest = (Record({
  id: String,
  description: String,
  objectives: Array(String),
  testCaseStatus: TestCaseStatus,
  observations: String,
  reference: String,
  substeps: Array(
    Record({
      step: String,
      description: String
    })
  )
}));

const Methodology = Array(AtomicTest);

export type State = {
  stateFlattenedChecklists: AtomicTest[];
  handleStatusChange: (id: string, newStatus: ImportedTestCaseStatus) => void;
  handleObservationsChange: (id: string, newObservations: string) => void;
  handleFileUpload: () => void;
};

export const initializeChecklist = (checklists: any) => {
  return checklists.map(test => ({
    ...test,
    testCaseStatus: Object.values(TestCaseStatus).includes(test.testCaseStatus as ImportedTestCaseStatus)
      ? test.testCaseStatus as ImportedTestCaseStatus
      : 'NOT_TESTED'
  }));
};

const createOWSTGStore = (id: string) =>
  create<any>(
    persist(
      (set, get) => ({
        stateFlattenedChecklists: initializeChecklist(checklists),
        handleStatusChange: (id: string, newStatus: ImportedTestCaseStatus) => {
          const updatedChecklists = get().stateFlattenedChecklists.map(test =>
            test.id === id ? { ...test, testCaseStatus: newStatus } : test
          );
          set({ stateFlattenedChecklists: updatedChecklists });
        },
        handleObservationsChange: (id: string, newObservations: string) => {
          const updatedChecklists = get().stateFlattenedChecklists.map(test =>
            test.id === id ? { ...test, observations: newObservations } : test
          );
          set({ stateFlattenedChecklists: updatedChecklists });
        },
        handleFileUpload: () => {
          let input = document.createElement('input');
          input.type = 'file';
          input.accept = '.json';
          input.onchange = (event) => {
            let file = (event.target as HTMLInputElement).files[0];
            if (file) {
              let reader = new FileReader();
              reader.onload = (event) => {
                try {
                  let methodology = JSON.parse(event.target.result as string);
                  const validatedMethodology = Methodology.check(methodology);
                  const newState = initializeChecklist(validatedMethodology);
                  set({ stateFlattenedChecklists: newState });
                  message.success('File uploaded and parsed successfully');
                } catch (error) {
                  message.error('Error parsing file: ' + "\n" + error.message);
                  console.error(error);
                }
              };
              reader.onerror = (error) => {
                message.error('Error reading file: ' + "\n" + error);
                console.error(error);
              };
              reader.readAsText(file);
            }
            input.remove();
          };
          input.click();
        },
      }),
      {
        name: `methodology-tab-state-${id}`, // unique name
        getStorage: () => window.localStorage, // Use local storage
      }
    )
  );

export default createOWSTGStore;