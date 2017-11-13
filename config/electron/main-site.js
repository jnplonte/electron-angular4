const electron = require('electron'), path = require('path'), fs = require('fs-extra');

const SetupEvents = require('./setup-events'), pjson = require('./../package.json');

if (SetupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

// Module to control application life.
const app = electron.app, menu = electron.Menu, dialog = electron.dialog;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
      titleBarStyle: 'hidden',
      width: 1200,
      height: 650,
      icon: path.join(__dirname, 'config', 'electron', 'icons', '64x64.png'),
      title: pjson.productName
  });

  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
  });

  const template = [
    {
        label: 'File',
        submenu: [
          {
                label: 'Upload Config',
                accelerator: 'CommandOrControl+U',
                click: (function() {
                    return dialog.showOpenDialog({
                        filters: [{
                            name: 'otomeyt-config',
                            extensions: ['otmyt']
                        }]
                    }, (fileNames) => {
                        if (typeof(fileNames) === 'undefined') {
                            dialog.showMessageBox({
                                title: pjson.productName,
                                message: "No Config Selected",
                                detail: "No Config Selected",
                                buttons: ["OK"]
                            });
                            return;
                        }

                        fs.copy(fileNames[0], path.join(__dirname, 'config', 'site', 'client', 'config.txt'), err => {
                            if (err) {
                                dialog.showMessageBox({
                                    title: pjson.productName,
                                    message: "An error ocurred reading the Config :" + err.message,
                                    detail: "An error ocurred reading the Config :" + err.message,
                                    buttons: ["OK"]
                                });
                                return;
                            }

                            fs.chmod(path.join(__dirname, 'config', 'site', 'client', 'config.txt'), 0775);

                            dialog.showMessageBox({
                                title: pjson.productName,
                                message: "Upload Config Successful You can Now Use " + pjson.productName,
                                detail: "Upload Config Successful You can Now Use " + pjson.productName,
                                buttons: ["OK"]
                            });
                            return;
                        });
                    });
                })
            },
            {
                type: 'separator'
            },
            {
                label: 'Reload',
                accelerator: 'CommandOrControl+R',
                click: (function() {
                    return mainWindow.loadURL(`file://${__dirname}/index.html`);
                })
            },
            {
                role: 'close'
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                role: 'togglefullscreen'
            },
            {
                role: 'minimize'
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click: (function() {
                    return dialog.showMessageBox(mainWindow, {
                        title: pjson.productName,
                        buttons: ["Ok"],
                        message: pjson.productName,
                        detail: "Version: " + pjson.version + "\nDevelop by: " + pjson.productTeam
                    });
                })
            },
            {
                type: 'separator'
            },
            {
                label: 'Submit Bugs',
                click() {
                    require('electron').shell.openExternal('http://bugs.otomeyt.com');
                }
            },
            {
                label: 'Admin Pannel',
                click() {
                    require('electron').shell.openExternal('http://admin.otomeyt.com');
                }
            },
            {
                label: 'About Otomeyt',
                click() {
                    require('electron').shell.openExternal('http://www.otomeyt.com');
                }
            }
        ]
    }
  ]
  menu.setApplicationMenu(menu.buildFromTemplate(template));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
          createWindow()
    }
});