import { rollup } from 'rollup';
import jsx from 'rollup-plugin-jsx';
import buble from 'rollup-plugin-buble'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import npm from 'rollup-plugin-npm'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'


export default {
  entry: 'src/main.jsx',
  format: 'iife',
  moduleName:'sup_react',
  plugins: [
    buble(),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/react-faux-dom/**',
        'node_modules/react-d3-library/**'
      ]
    }),
    globals(),
    jsx( {factory: 'React.createElement'}),
    npm({ main: true }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    resolve({ browser: true })
  ],
  dest: 'src/bundle.js',
  sourceMap: true // equivalent to --output
}
