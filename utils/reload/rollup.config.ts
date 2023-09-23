import typescript from "@rollup/plugin-typescript";


import alias from '@rollup/plugin-alias';
import path from 'path';


// TODO: Fix aliasing during build
const aliases = {
    entries: [
        {
            find: "@src/",
            replacement: path.resolve( './src/' ),
        },
        {
            find: "@assets/",
            replacement: path.resolve( './src/assets/' ),
        },
        {
            find: "@pages/",
            replacement: path.resolve( './src/pages/' ),
        },
        {
            find: "@data/",
            replacement: path.resolve( './src/pages/popup/assets/data/' ),
        },
        {
            find: "@types/",
            replacement: path.resolve( './src/pages/popup/components/types/' ),
        },
        {
            find: "virtual:reload-on-update-in-background-script",
            replacement: path.resolve( './src/global.d.ts' ),
        },
        {
            find: "virtual:reload-on-update-in-view",
            replacement: path.resolve( './src/global.d.ts' ),
        },
    ],
};

const plugins = [ typescript(), alias( aliases ) ];

export default [
    {
        plugins,
        input: "utils/reload/initReloadServer.ts",
        output: {
            file: "utils/reload/initReloadServer.js",
        },
        external: [ "ws", "chokidar", "timers" ],
    },
    {
        plugins,
        input: "utils/reload/injections/script.ts",
        output: {
            file: "utils/reload/injections/script.js",
        },
    },
    {
        plugins,
        input: "utils/reload/injections/view.ts",
        output: {
            file: "utils/reload/injections/view.js",
        },
    },
];
