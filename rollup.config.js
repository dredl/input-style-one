import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json'
import svg from 'rollup-plugin-svg'
import resolve from 'rollup-plugin-node-resolve';
export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve({
      dedupe: [ 'react', 'react-dom' ],
      modulesOnly: true,
    }),
    typescript({
      typescript: require('typescript')
    }),
    postcss({
      plugins: [],
      minimize: true,
      sourceMap: 'inline',
    }),
    svg({base64: true})
  ]
}