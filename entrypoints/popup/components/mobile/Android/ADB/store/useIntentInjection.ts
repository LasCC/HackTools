import create from "zustand";
import { persist } from "zustand/middleware";

interface Extra {
  key: string;
  value: string;
  type: "string" | "boolean" | "integer"; // TODO: add more types
}

interface IntentInjectionState {
  className: string;
  extras: Extra[];
  adbCommand: string;
  javaPOC: string;
  setClassName: (className: string) => void;
  setExtras: (extras: Extra[]) => void;
  setAdbCommand: (adbCommand: string) => void;
  setJavaPOC: (javaPOC: string) => void;
  generatePOC: () => void;
  addExtra: () => void;
  clearAllExtra: () => void;
  deleteExtra: (index: number) => void;
}

export const useIntentInjectionStore = create<IntentInjectionState>(
  // @ts-ignore
  persist(
    (set, get) => ({
      className: "",
      extras: [{ key: "", value: "", type: "string" }],
      adbCommand: "",
      javaPOC: "",
      setClassName: (className) => set({ className }),
      setExtras: (extras) => set({ extras }),
      setAdbCommand: (adbCommand) => set({ adbCommand }),
      setJavaPOC: (javaPOC) => set({ javaPOC }),
      generatePOC: () => {
        let trimmedClassName = get().className.trim();
        let packageName = "" || "com.example";
        let activityName = "" || "MainActivity";

        if (trimmedClassName.startsWith("<")) {
          const match = trimmedClassName.match(
            /<activity[^>]*android:name="([^"]+)"/is
          );
          if (match) {
            const fullClassName = match[1];
            const splitName = fullClassName.split(".");
            packageName = splitName.slice(0, -1).join(".");
            activityName = splitName[splitName.length - 1];
          }
        } else {
          const splitName = trimmedClassName.split(".");
          packageName = splitName.slice(0, -1).join(".");
          activityName = splitName[splitName.length - 1];
        }

        if (!packageName && !activityName) {
          packageName = "<com.pkgname missing>";
          activityName = "<Activity name missing>";
        } else if (!packageName) packageName = "<com.pkgname missing>";
        else if (!activityName) activityName = "<Activity name missing>";

        const extrasString = get()
          .extras.map((extra) => {
            switch (extra.type) {
              case "string":
                return `--es "${extra.key}" "${extra.value}"`;
              case "boolean":
                return `--ez "${extra.key}" ${extra.value}`;
              case "integer":
                return `--ei "${extra.key}" ${extra.value}`;
              // TODO: Add more cases here for other types
              default:
                return "";
            }
          })
          .join(" ");
        const command = `adb shell am start -n ${packageName}/.${activityName} ${extrasString}`;
        set({ adbCommand: command });

        const extrasJavaString = get()
          .extras.map((extra) => {
            switch (extra.type) {
              case "string":
                return `intent.putExtra("${extra.key}", "${extra.value}");`;
              case "boolean":
                return `intent.putExtra("${extra.key}", ${extra.value});`;
              case "integer":
                return `intent.putExtra("${extra.key}", ${extra.value});`;
              // TODO: Add more cases here for other types
              default:
                return "";
            }
          })
          .join("\n");
        const javaPOCCode = `
        // Java POC
        Intent intent = new Intent();
        intent.setClassName("${packageName}", "${packageName}.${activityName}");
        ${extrasJavaString}
        startActivity(intent);
        `
          .split("\n")
          .map((line) => line.trim())
          .join("\n");

        set({ javaPOC: javaPOCCode });
      },
      addExtra: () => {
        set({
          extras: [...get().extras, { key: "", value: "", type: "string" }],
        });
      },

      clearAllExtra: () => {
        set({ extras: [] });
      },

      deleteExtra: (index: number) => {
        const newExtras = [...get().extras];
        newExtras.splice(index, 1);
        set({ extras: newExtras });
      },
    }),
    {
      name: "intent-injection-storage", // unique name
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
