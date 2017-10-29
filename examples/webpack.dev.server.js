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

const fs = require( 'fs' );
const Express = require( 'express' );
const webpack = require( 'webpack' );
const devMiddleware = require( 'webpack-dev-middleware' );
const hotMiddleware = require( 'webpack-hot-middleware' );
const portFinder = require( 'portfinder' );

const getConfig = require( './webpack.config' );
const HOST = process.env.HOST || 'localhost';
const PORT = +process.env.DEV_PORT || 3000;

const examples = fs
    .readdirSync( __dirname )
    .filter( file => fs.statSync( `${__dirname}/${file}` ).isDirectory() );

const compiler = webpack( examples.map( example => getConfig( example ) ) );

portFinder.basePort = PORT;
portFinder.getPortPromise().then( ( port ) => {

    const uri = `http://${HOST}:${port}`;
    const serverOptions = {
        contentBase: uri,
        publicPath: examples.length === 1 ? `/${examples[ 0 ]}` : '/',
        hot: true,
        inline: true,
        lazy: false,
        headers: { 'Access-Control-Allow-Origin': '*' },
        stats: { colors: true }
    };

    new Express()
        .set( 'view engine', 'ejs' )
        .set( 'views', __dirname )
        .get( '/', ( req, res ) => res.render( 'index', { examples } ) )
        .use( devMiddleware( compiler, serverOptions ) )
        .use( hotMiddleware( compiler ) )
        .listen( port, HOST, err => {
            if( err ) return console.error( err );
            console.log( `> Listening at ${uri}\n` );
        } );
} ).catch( ( err ) => {
    console.log( `> Unable to get free port.\n> Error message:\n${err}\n` );
} );



