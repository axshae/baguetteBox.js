import scss from 'rollup-plugin-scss';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
export default [
    // JS build
    {
        input: 'src/baguetteBox.js',
        output: [
            {
                file: 'dist/baguetteBox.min.js',
                format: 'iife',
                name: 'baguetteBox',
                plugins: [terser(
                    {
                        compress: true,
                    }
                )]
            },
            {
                file: "demo/js/baguetteBox.min.js",
                format: 'iife',
                name: 'baguetteBox',
                plugins: [terser()],
            }
        ],
        plugins: [
            replace({
                preventAssignment: true,
                values: {
                    '__VERSION__': pkg.version,
                }
            })
        ]
    },
    // SCSS build
    {
        input: 'src/baguetteBox.scss',
        output: [
            {
                file: 'dist/baguetteBox.min.css',
            },
            {
                file: 'demo/css/baguetteBox.min.css',
            }
        ],
        plugins: [
            replace({
                preventAssignment: true,
                values: {
                    '__VERSION__': pkg.version,
                }
            }),
            scss({
                fileName: 'baguetteBox.min.css',
                outputStyle: 'compressed',
            })
            
        ]
    }
];