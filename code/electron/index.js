"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var mainWindow = null;
var trayApp = null;
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
electron_1.app.on('will-quit', function () {
    electron_1.globalShortcut.unregisterAll();
});
electron_1.app.on('ready', function () {
    mainWindow = new electron_1.BrowserWindow({
        title: 'BoardZ2',
        width: 1024,
        minWidth: 768,
        height: 700,
        darkTheme: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });
    buildTrayIcon();
    electron_1.globalShortcut.register('CmdOrCtrl+Shift+d', function () {
        mainWindow.webContents.toggleDevTools();
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.setTitle(electron_1.app.getName());
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    if (process.platform === 'darwin') {
        buildNativeAppMenu();
    }
});
var buildNativeAppMenu = function () {
    var template = [{
            label: 'Application',
            submenu: [
                {
                    label: 'About Application', role: 'orderFrontStandardAboutPanel:'
                },
                {
                    label: 'Browse Repository', accelerator: 'CmdOrCtrl+G',
                    click: function () {
                        electron_1.shell.openExternal('https://github.com/thinktecture/boardz-cross-platform-sample/');
                    }
                },
                {
                    label: 'Reload', accelerator: 'CmdOrCtrl+R',
                    click: function () {
                        mainWindow.loadURL('file://' + __dirname + '/index.html');
                    }
                },
                {
                    label: 'Quit', accelerator: 'Command+Q',
                    click: function () {
                        electron_1.app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo'
                },
                {
                    label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo'
                },
                {
                    label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut'
                },
                {
                    label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy'
                },
                {
                    label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste'
                },
                {
                    label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall'
                }
            ]
        }
    ];
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
};
var buildTrayIcon = function () {
    var trayIconPath = path.join(__dirname, 'icon.png');
    var contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Radius Search...',
            type: 'normal',
            click: function () {
                mainWindow.webContents.send('navigateTo', '/radiussearch');
            }
        },
        {
            label: 'Quit',
            accelerator: 'Command+Q',
            role: 'quit'
        }
    ]);
    trayApp = new electron_1.Tray(trayIconPath);
    trayApp.setToolTip('BoardZ2');
    trayApp.setContextMenu(contextMenu);
};
