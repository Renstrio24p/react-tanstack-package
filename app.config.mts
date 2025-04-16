import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";

function removeConsoleInfo() {
    return {
        name: "remove-console-info",
        renderChunk(code: string) {
            return {
                code: code.replace(/console\.info\(.*?\);?/g, ""),
                map: null,
            };
        },
    };
}

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
            ...(process.env.NODE_ENV === "production" ? [removeConsoleInfo()] : []), // ✅ Apply only in prod
        ],
        define: {
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        },
        // Optional: drop all console.* in production (stronger)
        esbuild: {
            drop: process.env.NODE_ENV === "production" ? ["console"] : [],
        },
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
        autoCodeSplitting: true,
        enableRouteTreeFormatting: true,
        disableLogging: true,
    },
});
