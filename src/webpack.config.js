/*
 *
 *        ______      __  ______          __
 *       / ____/___ _/ /_/ ____/___  ____/ /__
 *      / /_  / __ `/ __/ /   / __ \/ __  / _ \
 *     / __/ / /_/ / /_/ /___/ /_/ / /_/ /  __/
 *    /_/    \__,_/\__/\____/\____/\__,_/\___/
 *
 *  Copyright (c) 2017 FatCode Grzegorz Michlicki
 *
 */

const path = require( 'path' );
const webpack = require( 'webpack' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

const ROOT = path.resolve( __dirname, '..' );
const DIST = path.resolve( ROOT, 'dist' );

module.exports = {

    entry: {
        ash: [ path.resolve( __dirname, 'ash' ) ]
    },

    output: {
        library: 'ash',

        libraryTarget: 'umd',

        // filesystem path for static files
        path: DIST,

        // file name pattern for entry scripts
        filename: '[name].js'
    },

    devtool: 'none',

    resolve: {
        extensions: [ '.ts' ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin( DIST, { root: ROOT } ),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin( {
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false
            },
        } ),
        new DtsBundlePlugin( {
            name: 'ash',
            main: 'dist/src/ash',
            baseDir: 'dist/src/ash',
            out: '../../ash.d.ts',
            removeSource: true,
            removeSourceDir: 'dist/src',
            outputAsModuleFolder: false // to use npm in-package typings
        } )
    ]
};


// https://medium.com/@vladimirtolstikov/how-to-merge-d-ts-typings-with-dts-bundle-and-webpack-e8903d699576#.bzfvru3ex
function DtsBundlePlugin( opts ) {
    this.opts = opts;
}

DtsBundlePlugin.prototype.apply = function( compiler ) {
    compiler.plugin( 'done', () => {
        let { opts } = this;
        require( 'dts-bundle' ).bundle( opts );
        if( opts.removeSource && opts.removeSourceDir ) require( 'rimraf' )( opts.removeSourceDir, () => {} );
    } );
};
