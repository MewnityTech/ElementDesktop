const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const server = express();

console.log('АЛО');

let mainWindow;

server.use(express.static(path.join(__dirname, 'element')));

const PORT = 1488;
server.listen(PORT);


app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        vibrancy: 'fullscreen-ui',
        //backgroundMaterial: 'acrylic',
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL('http://localhost:1488');

    globalShortcut.register('F11', () => {
        const isFullScreen = mainWindow.isFullScreen();
        mainWindow.setFullScreen(!isFullScreen);
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});