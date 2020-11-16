let buttonInstall
window.addEventListener("DOMContentLoaded", () => {
  //   console.log("dom content loaded")
  let deferredPrompt
  buttonInstall = document.querySelector(".install-button")
  buttonInstall.style.display = "none"

  window.addEventListener("beforeinstallprompt", (e) => {
    // CAUTION! this eventListener will be fired some times
    // console.log("before install prompt")
    buttonInstall.style.display = "block"
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    deferredPrompt = e
    // showInstallPromotion()
  })

  buttonInstall.addEventListener("click", (e) => {
    // hideMyInstallPromotion()
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt")
        buttonInstall.style.display = "none"
      } else {
        // console.log("User dismissed the A2HS prompt")
      }
      deferredPrompt = null
    })
  })
})

window.addEventListener("appinstalled", (e) => {
  // Log install to analytics
  console.log("INSTALL: Success")
  buttonInstall.style.display = "none"
})

function isInstalled() {
  console.log(`window.navigator.standalone--> ${window.navigator.standalone}`)
  console.log(
    `window.matchMedia("(display-mode: standalone)").matches--> ${
      window.matchMedia("(display-mode: standalone)").matches
    }`
  )
  // For iOS
  if (window.navigator.standalone) return true

  // For Android
  if (window.matchMedia("(display-mode: standalone)").matches) return true

  // If neither is true, it's not installed
  return false
}

console.log(`is installed? ${isInstalled()}`)
