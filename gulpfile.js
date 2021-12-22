const gulp = require('gulp')
const del = require('del')
const less = require('gulp-less')
const {rollup} = require('rollup')
const typescript = require('@rollup/plugin-typescript')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const {terser} = require('rollup-plugin-terser')

gulp.task('clean', () => del(['dist/**']))

gulp.task('build:js', async () => {
    const bundle = await rollup({
        input: 'src/main.ts',
        external: ['obsidian'],
        plugins: [
            typescript(),
            nodeResolve({browser: true}),
            commonjs(),
            terser()
        ]
    })
    await bundle.write({file: 'dist/main.js', format: 'cjs'})
})

gulp.task('build:styles', () => gulp.src('src/styles.less').pipe(less()).pipe(gulp.dest('dist')))

gulp.task('build:manifest', () => {
    const {Readable} = require('stream')
    const Vinyl = require('vinyl')
    const pkg = require('./package.json')
    const manifest = {
        id: pkg.name,
        name: pkg.name.toLowerCase().split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' '),
        version: pkg.version,
        minAppVersion: '0.12.0',
        description: pkg.description,
        author: pkg.author.name,
        authorUrl: pkg.author.url,
        isDesktopOnly: false
    }
    const src = new Readable({objectMode: true})
    src._read = function () {
        this.push(new Vinyl({
            path: 'manifest.json',
            contents: Buffer.from(JSON.stringify(manifest, null, 2))
        }))
        this.push(null)
    }
    return src.pipe(gulp.dest('dist'))
})

gulp.task('build', gulp.parallel('build:js', 'build:styles', 'build:manifest'))

gulp.task('default', gulp.series('clean', 'build'))
