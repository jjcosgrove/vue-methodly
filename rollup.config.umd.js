import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

const config = {
  input: 'src/vue-methodly.js',
  output: {
    name: 'VueMethodly',
    file: 'dist/umd/vue-methodly.umd.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()
  ]
}

export default config
