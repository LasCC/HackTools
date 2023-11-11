import { create } from "zustand";
import { persist } from "zustand/middleware";

interface File {
  name: string;
  content: string;
}

interface Directory {
  name: string;
  files: File[];
  directories: Directory[];
}

interface Archive {
  name: string;
  content: (File | Directory)[];
}

interface State {
  archiveName: string;
}

const tabStateStore = create<State>(
  // @ts-ignore
  persist((set, get) => ({}))
);

export default tabStateStore;
