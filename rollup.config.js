<<<<<<< HEAD
   import resolve from '@rollup/plugin-node-resolve';
   import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'index.js',
  output: [
    {
      format: 'esm',
      file: 'bundle.js'
    },
  ],
  plugins: [
    resolve(),
    commonjs()
  ]
=======
   import resolve from '@rollup/plugin-node-resolve';
   import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'index.js',
  output: [
    {
      format: 'esm',
      file: 'bundle.js'
    },
  ],
  plugins: [
    resolve(),
    commonjs()
  ]
>>>>>>> d612ec9654c39a63099b794dc1f9b82cf723eba0
};