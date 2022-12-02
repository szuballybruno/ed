import typescript from "@rollup/plugin-typescript";
import sourcemaps from "rollup-plugin-sourcemaps";
import dts from "rollup-plugin-dts";

export default [
    {
        input: "./src/index.ts",
        output: {
            sourcemap: "inline",
            file: './dist/index.js',
            format: 'esm',
            name: 'index.js',
            sourcemaps: true,
        },
        plugins: [
            typescript({
                tsconfig: "./tsconfig.json",
                sourceMap: true,
                inlineSources: false,
            }),
            sourcemaps(),
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