window.addEventListener("DOMContentLoaded", () => {
  const buttonInstall = document.querySelector(".install-button")
  buttonInstall.style.display = "none"
  let deferredPrompt

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt = e
    // Update UI notify the user they can install the PWA
    buttonInstall.style.display = "block"
    showInstallPromotion()
  })

  buttonInstall.addEventListener("click", (e) => {
    // Hide the app provided install promotion
    hideMyInstallPromotion()
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
