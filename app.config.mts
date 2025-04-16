import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import checker from 'vite-plugin-checker';

export default defineConfig({
    vite: {
        plugins: [
            tsConfigPaths({
                projects: ["./tsconfig.json"],
            }),
            tailwindcss(),
            checker({
                typescript: true,
                terminal: true,
            }),
        ],
    },

    react: {
        babel: {
            plugins: [
                [
                    "babel-plugin-react-compiler",
                    {
                        target: "19",
                    },
                ],
            ],
        },
    },

    tsr: {
        appDirectory: "./src",
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/gen/routeTree.gen.ts",
        routeFileIgnorePrefix: "-",
        quoteStyle: "single",
    },
});
