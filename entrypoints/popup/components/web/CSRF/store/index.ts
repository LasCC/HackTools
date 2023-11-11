import create from "zustand";

type Store = {
  request: string;
  parsedPostBody: any;
  error: string;
  setRequest: (req: string) => void;
  setParsedPostBody: (body: any) => void;
  setError: (error: string) => void;
};

export const useStore = create<Store>((set) => ({
  request: "",
  parsedPostBody: {},
  error: "",
  setRequest: (req: string) => set(() => ({ request: req })),
  setParsedPostBody: (body: any) => set(() => ({ parsedPostBody: body })),
  setError: (error: string) => set(() => ({ error })),
}));
