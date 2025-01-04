const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 550,
        minWidth: 660,
        minHeight: 450,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        titleBarStyle: 'hidden',
        // titleBarOverlay: {
        //     color: 'green',
        //     symbolColor: 'black',
        // },

        backgroundColor: '#FAF8F7',
        // transparent: true,
        show: false,
    })
    win.setMenu(null)
    win.loadFile('./front-end/index.html')
    win.webContents.openDevTools({mode: 'undocked'})
    win.on('ready-to-show', () => {
        win.show()
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('minimizeWindow', () => {
    BrowserWindow.getFocusedWindow().minimize()
})
ipcMain.on('closeWindow', () => {
    BrowserWindow.getFocusedWindow().close()
})
ipcMain.on('maximizeWindow', () => {
    if (BrowserWindow.getFocusedWindow().isMaximized()) {
        BrowserWindow.getFocusedWindow().unmaximize()
    } else {
        BrowserWindow.getFocusedWindow().maximize()
    }
})