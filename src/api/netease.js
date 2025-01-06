const NeteaseMusic = require('simple-netease-cloud-music')
const nm = new NeteaseMusic()

ipcMain.on('searchSongs', async (name, page, limit) => {
    const t = name;
    const contents = await nm.search(name)
})
