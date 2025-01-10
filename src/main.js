const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')
const NeteaseMusic = require('simple-netease-cloud-music')
const nm = new NeteaseMusic()


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


ipcMain.handle('searchSongs', async (event, name) => {
    const page = 1;
    const limit = 10;
    const contents = await nm.search(name,page,limit)
    const jsResult = JSON.stringify(contents)
    await dialog.showMessageBox({
        title: 'search返回值',
        message: name,
        type: 'info',
        detail: contents.code.toString(),
        buttons: ['确定']
    })
    if (contents.code == -460) {
        // alert('网络拥挤，请稍后再试')
        return contents
    }
    await dialog.showMessageBox({
        title: '搜索结果',
        message: `共搜索到${contents.result.songCount}首歌曲`,
        detail: `第${page}页，每页${limit}首`,
        buttons: ['确定'], type: 'info'
    })

    // await dialog.showMessageBox({title: 'test',message: name, type: 'info',detail: JSON.stringify(contents),buttons: ['确定']})

    // let text = ''
    // for (var i = 0; i < contents.result.songs.length; i++) {
    //     text += `title:${contents.result.songs[i].name}\n`
    //     text += `   artist:${contents.result.songs[i].ar[0].name}`
    //     for (var j = 1; j < contents.result.songs[i].ar.length; j++) {
    //         text += `,${contents.result.songs[i].ar[j].name}`
    //     }
    //     text += '\n'
    // }
    // await dialog.showMessageBox({
    //     title: 'test',
    //     message: name,
    //     type: 'info',
    //     detail: text,
    //     buttons: ['确定']
    // })
    return contents
})
