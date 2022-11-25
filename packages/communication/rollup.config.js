import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
    {
        input: "./src/index.ts",
        output: {
            file: './dist/index.js',
            // dir: "./dist",
            // format: "esm",
            // sourcemaps: true
            format: 'esm',
            name: 'index.js',
        },
        plugins: [
            typescript({
                tsconfig: "./tsconfig.json"
            })
        ]
    },
    {
        input: './dist/dts/index.d.ts',
        output: [{
            file: './dist/index.d.ts',
            format: 'es'
        }],
        plugins: [
            dts()
        ],
    }
]