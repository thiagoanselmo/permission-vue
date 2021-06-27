import cleanup from 'rollup-plugin-cleanup';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: './lib/index.js',
  output: [
    {
      file: 'dist/bundle.cjs',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.mjs',
      format: 'esm'
    }
  ],
  plugins: [
    cleanup(),
    uglify()
  ]
}