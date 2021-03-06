#! /usr/bin/env node

import 'source-map-support/register';

import path from 'path';
import program from 'commander';
import buildApp from './buildApp';
const packageJson = require(path.join('..', 'package'));

if (require.main === module) {
    program
        .version(packageJson.version)
        .arguments('<targetUrl> [dest]')
        .action(function(targetUrl, appDir) {
            program.targetUrl = targetUrl;
            program.outDir = appDir;
        })
        .option('-n, --app-name <value>', 'app name')
        .option('-p, --platform <value>', '\'linux\', \'win32\', or \'darwin\'')
        .option('-a, --arch <value>', '\'ia32\' or \'x64\'')
        .option('-e, --electron-version <value>', 'electron version to package, without the \'v\', see https://github.com/atom/electron/releases')
        .option('-o, --overwrite', 'if output directory for a platform already exists, replaces it rather than skipping it, defaults to false')
        .option('-c, --conceal', 'packages the source code within your app into an archive, defaults to false, see http://electron.atom.io/docs/v0.36.0/tutorial/application-packaging/')
        .option('--counter', 'if the target app should use a persistant counter badge in the dock (OSX only), defaults to false')
        .option('-i, --icon <value>', 'the icon file to use as the icon for the app (should be a .icns file on OSX)')
        .option('--width <value>', 'set window width, defaults to 1280px', parseInt)
        .option('--height <value>', 'set window height, defaults to 800px', parseInt)
        .option('-m, --show-menu-bar', 'set menu bar visible, defaults to false')
        .option('-u, --user-agent <value>', 'set the user agent string for the app')
        .option('--honest', 'prevent the nativefied app from changing the user agent string to masquerade as a regular chrome browser')
        .parse(process.argv);

    if (!process.argv.slice(2).length) {
        program.help();
    }

    buildApp(program, (error, appPath) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(`App built to ${appPath}`);
    });
}
