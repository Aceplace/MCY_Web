// demo/vite.config.js
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import path from "path";

export default defineConfig({
    root: path.resolve(__dirname, "."), // demo folder is the root
    server: {
        port: 5173,
        open: true,
    },
    plugins: [
        checker({
            typescript: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
    },
});
