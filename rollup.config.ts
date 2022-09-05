import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
// import analyze from 'rollup-plugin-analyzer'
// import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import type { RollupOptions } from 'rollup'
// const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

const sharedConfig: RollupOptions = {
  plugins: [
    json(),
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.build.json', sourceMap: isDev, declaration: false })
    // analyze()
  ],
  external: [...(pkg.dependencies ? Object.keys(pkg.dependencies) : []), 'webpack', 'loader-utils']
}
// 没有必要压缩徒增调试成本
// if (isProd) {
//   sharedConfig.plugins.push(terser())
// }

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: isDev,
        exports: 'auto'
      }
      // { format: 'esm', file: pkg.module, sourcemap: isDev }
    ]
  },
  {
    input: 'src/replace.ts',
    output: [
      {
        file: 'dist/replace.js',
        format: 'esm',
        sourcemap: isDev
      }
    ]
  },
  {
    input: 'src/loader/jsx-rename-loader.ts',
    output: [
      {
        file: 'dist/jsx-rename-loader.js',
        format: 'cjs',
        sourcemap: isDev,
        exports: 'auto'
      }
    ]
  },
  {
    input: 'src/framework/vite/index.ts',
    output: [
      {
        file: 'dist/vite.js',
        format: 'cjs',
        sourcemap: isDev,
        exports: 'auto'
      }
    ]
  },
  {
    input: 'src/postcss/plugin.ts',
    output: [
      {
        file: 'dist/postcss.js',
        format: 'cjs',
        sourcemap: isDev,
        exports: 'auto'
      }
    ]
  },
  {
    input: 'src/mangle/index.ts',
    output: [
      {
        file: 'dist/mangle.js',
        format: 'cjs',
        sourcemap: isDev,
        exports: 'auto'
      }
    ]
  }
  // {
  //   input: 'src/v4.ts',
  //   output: [
  //     {
  //       file: 'dist/v4.js',
  //       format: 'cjs',
  //       sourcemap: isDev,
  //       exports: 'auto'
  //     }
  //   ]
  // },
  // {
  //   input: 'src/v5.ts',
  //   output: [
  //     {
  //       file: 'dist/v5.js',
  //       format: 'cjs',
  //       sourcemap: isDev,
  //       exports: 'auto'
  //     }
  //   ]
  // }
].map((x) => {
  return {
    ...x,
    ...sharedConfig
  }
}) as RollupOptions[]

export default config
