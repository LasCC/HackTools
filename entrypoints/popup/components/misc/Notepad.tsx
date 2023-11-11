import React from "react";
import MDEditor from "@uiw/react-md-editor";
import PersistedState from "use-persisted-state";
import { useStore } from "../GlobalStore";

const NOTEPAD = () => {
  const { darkMode } = useStore();
  const [value, setValue] = PersistedState<string | string>("notepad")("");
  return (
    <div className="container">
      <MDEditor
        textareaProps={{
          placeholder:
            "This is an offline markdown editor to help you take some small notes (data is kept in your browser localstorage)",
        }}
        value={value || ""}
        onChange={setValue}
        height={500}
        data-color-mode={darkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default NOTEPAD;
