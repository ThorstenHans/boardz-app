import {app, BrowserWindow, globalShortcut, Menu, MenuItem, shell, Tray} from 'electron';
import * as path from 'path';

let mainWindow = null;
let trayApp = null;

app.on('window-all-closed', () => {
    app.quit();
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
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

    globalShortcut.register('CmdOrCtrl+Shift+d', function () {
        mainWindow.webContents.toggleDevTools();
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.setTitle(app.getName());

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    if (process.platform === 'darwin') {
        buildNativeAppMenu();
    }
});

const buildNativeAppMenu = () => {
    const template = [{
        label: 'Application',
        submenu: [
            {
                label: 'About Application', role: 'orderFrontStandardAboutPanel:'
            },
            {
                label: 'Browse Repository', accelerator: 'CmdOrCtrl+G',
                click: () => {
                    shell.openExternal('https://github.com/thinktecture/boardz-cross-platform-sample/');
                }
            },
            {
                label: 'Reload', accelerator: 'CmdOrCtrl+R',
                click: () => {
                    mainWindow.loadURL('file://' + __dirname + '/index.html');
                }
            },
            {
                label: 'Quit', accelerator: 'Command+Q',
                click: () => {
                    app.quit();
                }
            }
        ]
    }
        , {
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

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
const buildTrayIcon = () => {
    const trayIconPath = path.join(__dirname, 'icon.png');
    const contextMenu = Menu.buildFromTemplate([
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

    trayApp = new Tray(trayIconPath);
    trayApp.setToolTip('BoardZ2');
    trayApp.setContextMenu(contextMenu);
};
