const { contextBridge, ipcRenderer } = require("electron");


window.addEventListener('DOMContentLoaded', () => {
    
})

contextBridge.exposeInMainWorld("operator", {
    maximizeWindow: () => ipcRenderer.send("maximizeWindow"),
    minimizeWindow: () => ipcRenderer.send("minimizeWindow"),
    closeWindow: () => ipcRenderer.send("closeWindow"),
});