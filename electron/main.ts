import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'RSAGen_v1.0',
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.on('page-title-updated', function(e) {
        e.preventDefault()
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL(`http://localhost:4000`);
    } else {
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, '../index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;