import { createRoot } from "react-dom/client";
import "@pages/popup/index.css";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import AppRender from "./App";

refreshOnUpdate( "pages/popup" );

declare global {
    interface Window {
        global: any;
    }
}

if ( typeof window !== "undefined" ) {
    window.global = window;
}


function init () {
    const appContainer = document.querySelector( "#app-container" );
    if ( !appContainer ) {
        throw new Error( "Can not find #app-container" );
    }
    const root = createRoot( appContainer );
    root.render( AppRender );
}

init();
