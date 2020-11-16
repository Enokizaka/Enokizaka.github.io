window.addEventListener("DOMContentLoaded", () => {
//   console.log("dom content loaded")
  let deferredPrompt
  let buttonInstall = document.querySelector(".install-button")
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
  })
})

window.addEventListener("appinstalled", (e) => {
  // Log install to analytics
  console.log("INSTALL: Success")
})

// function isInstalled() {
//   // For iOS
//   if (window.navigator.standalone) return true

//   // For Android
//   if (window.matchMedia("(display-mode: standalone)").matches) return true

//   // If neither is true, it's not installed
//   return false
// }
