   import resolve from '@rollup/plugin-node-resolve';
   import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'viewer.js',
  output: [
    {
      format: 'esm',
      file: 'bundleviewer.js'
    },
  ],
  plugins: [
    resolve(),
    commonjs()
  ]
};