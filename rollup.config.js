import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/app.js',
    format: 'iife',
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/env',
          {
            modules: 'false',
            targets: {
              browsers: '> 10%',
              node: 8,
            },
            useBuiltIns: 'usage',
          },
        ],
      ],
    }),
    uglify({
      output: { comments: false },
      mangle: {
        toplevel: true,
        properties: { regex: /^_/ },
      },
    }),
    postcss({
      plugins: [require('postcss-nested'), require('autoprefixer')],
    }),
    serve({
      open: true,
      verbose: true,
      contentBase: ['', 'public'],
      host: 'localhost',
      port: 3000,
    }),
    livereload({ watch: 'dist' }),
  ],
  treeshake: true,
};
