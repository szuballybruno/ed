import typescript from "@rollup/plugin-typescript";

export default [
    {
        input: "./src/server.ts",
        output: {
            file: './dist/server.js',
            format: 'esm',
            name: 'server.js'
        },
        plugins: [
            typescript({
                tsconfig: "./tsconfig.json"
            })
        ]
    }
]