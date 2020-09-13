import serve from 'rollup-plugin-serve';
import typescript from '@rollup/plugin-typescript';

const DEV_SERVER = process.env.DEV_SERVER;

console.log('DEV_SERVER:', DEV_SERVER);

export default {
  input: 'src/index.ts',
  external: ['ecsy', 'three', 'three/examples/jsm/controls/OrbitControls'],
  output: {
    dir: 'dist',
    format: 'iife',
    globals: {
      three: 'THREE',
      'three/examples/jsm/controls/OrbitControls': 'THREE_EXAMPLES',
      ecsy: 'ECSY',
    },
    sourcemap: true,
  },
  plugins: [
    typescript(),
    DEV_SERVER &&
      serve({
        port: 1234,
        contentBase: ['dist', 'src/page'],
      }),
  ],
  watch: {
    exclude: 'node_modules/**',
  },
};
