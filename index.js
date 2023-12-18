const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("node:path")

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })

  win.loadFile("index.html")

  //   tried to log these in different place to see how its work
  //   const contents = win.webContents
  //   console.log(contents)
}

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong")
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
