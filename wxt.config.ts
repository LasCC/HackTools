import { defineConfig } from 'wxt';
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react';



// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    define: {
      global: "window",
    },
    plugins: [react(), tsconfigPaths()],
  }),
  manifest: {
    manifest_version: 3, 
    name: "Hacktools",
    version: "1.0.0",
    // content_security_policy: "script-src 'self' 'unsafe-eval'; script-src-elem 'self' blob:",
    commands: {
      panel: {
        // @ts-ignore
        global: true,
        description: "Open popup window",
        suggested_key: {
          default: "Ctrl+Shift+2",
          mac: "MacCtrl+Shift+2"
        },
      }
    },
  },
});
