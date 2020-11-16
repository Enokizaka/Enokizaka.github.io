let deferredPrompt
let buttonInstall

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("before install prompt")
  buttonInstall.style.display = "block"
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault()
  // Stash the event so it can be triggered later.
  deferredPrompt = e
  // Update UI notify the user they can install the PWA
  //   buttonInstall.style.display = "block"
  //   showInstallPromotion()
})

window.addEventListener("DOMContentLoaded", () => {
  console.log("dom content loaded")
  buttonInstall = document.querySelector(".install-button")
  buttonInstall.style.display = "none"

  buttonInstall.addEventListener("click", (e) => {
    // Hide the app provided install promotion
    // hideMyInstallPromotion()
    // Show the install prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt")
      } else {
        console.log("User dismissed the install prompt")
      }
    })
  })
})

window.addEventListener("appinstalled", (evt) => {
  // Log install to analytics
  console.log("INSTALL: Success")
})

async function isInstalled() {
  // For iOS
  if (window.navigator.standalone) return true

  // For Android
  if (window.matchMedia("(display-mode: standalone)").matches) return true

  const relatedApps = await navigator.getInstalledRelatedApps()
  relatedApps.forEach((app) => {
    console.log(app.id, app.platform, app.url)
  })

  // If neither is true, it's not installed
  return false
}

isInstalled()
