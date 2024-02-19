const { app, BrowserWindow, nativeImage, Tray, Menu, Notification, ipcMain } = require("electron")
const remote = require("@electron/remote/main")

const CreateWindow = () => {
    remote.initialize()

    const win = new BrowserWindow({
        width: 1366,
        height: 836,
        icon: __dirname + "/assets/icon.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        autoHideMenuBar: true,
        darkTheme: true,
        frame: false,
        resizable: false,
    })

    remote.enable(win.webContents)

    win.loadFile('./template/index.html')

    ipcMain.on('re-render', () => {
        win.loadFile('./template/index.html')
    })

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit()
        }
    })

    var isAppQuitting = false
    app.on('before-quit', function (evt) {
        isAppQuitting = true
    });

    win.on('close', function (evt) {
        if (!isAppQuitting) {
            evt.preventDefault()
            win.close()
            // win.hide()
            // new Notification({
            //     title: "You can find me here!",
            //     body: "App is not closed, but hidden in the tray."
            // }).show()
        }
    });

    // const icon = nativeImage.createFromPath("./assets/icon.png")
    // tray = new Tray(icon.resize({ width: 16, height: 16 }))
    // tray.setIgnoreDoubleClickEvents(true)

    // var trayMenu = Menu.buildFromTemplate([
    //     {
    //         label: 'Quit',
    //         click: _ => {
    //             app.quit()
    //         }
    //     }
    // ]);

    // tray.setContextMenu(trayMenu)


    // tray.on('click', event => {
    //     event.preventDefault
    //     win.show()
    // })

}

app.whenReady().then(() => {
    CreateWindow()
})

