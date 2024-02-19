const remote = require('@electron/remote')

const quitButton = document.getElementById("quit_button")
quitButton.onclick = function () {
    remote.getCurrentWindow().close()
}
