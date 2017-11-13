const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
     .then(createWindowsInstaller)
     .catch((error) => {
     console.error(error.message || error)
     process.exit(1)
 })

function getInstallerConfig () {
    console.log('creating windows installer')
    const rootPath = path.join('./', 'dist')
    const outPath = path.join(rootPath, 'release-builds')

    return Promise.resolve({
       appDirectory: path.join(outPath, 'Otomeyt-win32-ia32'),
       authors: 'John Paul Onte',
       noMsi: true,
       outputDirectory: path.join(outPath, 'installers', 'win'),
       exe: 'otomeyt.exe',
       setupExe: 'otomeytInstaller.exe',
       description: 'otomeyt desktop app',
       setupIcon: path.join(rootPath, 'config', 'electron', 'icons', '64x64.png')
   })
}