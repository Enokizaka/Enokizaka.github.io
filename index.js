const DIR = ""
let buttonInstall
// let pageContentWrapper
window.addEventListener("DOMContentLoaded", () => {
  // SERVICE WORLER
  let deferredPrompt
  buttonInstall = document.querySelector(".install-button")
  buttonInstall.style.display = "none"

  window.addEventListener("beforeinstallprompt", (e) => {
    // CAUTION! this eventListener will be fired some times
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
      }
      deferredPrompt = null
    })
  })

  // Toggle button
  const toggleButton = document.querySelector("#my-toggle")
  const wrapperContainer = document.querySelector("#wrapper")
  const isOpened = () => {
    return !wrapperContainer.classList.value.includes("toggled")
  }
  const reverseToggle = () => {
    const foo = isOpened() ? "add" : "remove"
    wrapperContainer.classList[foo]("toggled")
  }
  toggleButton.addEventListener("click", () => {
    reverseToggle()
  })

  const containerFluid = document.querySelector(".container-fluid")
  containerFluid.addEventListener("click", () => {
    if (!isOpened()) return
    reverseToggle()
  })

  // PAGE MANIPULATION
  const sideBoardButton = document.querySelector("#side-board")
  const sideAboutButton = document.querySelector("#side-about")
  const boardPageContainer = document.querySelector("#board")
  const aboutPageContainer = document.querySelector("#about")
  let appearingContainerEle = boardPageContainer

  sideBoardButton.addEventListener("click", () => {
    appearingContainerEle.classList.add("none")
    boardPageContainer.classList.remove("none")
    appearingContainerEle = boardPageContainer
  })

  sideAboutButton.addEventListener("click", () => {
    appearingContainerEle.classList.add("none")
    aboutPageContainer.classList.remove("none")
    appearingContainerEle = aboutPageContainer
  })

  // Project links in board
  const aEleArr = []
  aEleArr.push(document.querySelector("#fun-string-a"))
  aEleArr.push(document.querySelector("#tws-vanilla-a"))

  aEleArr.forEach((aEle) => {
    aEle.addEventListener("click", (e) => {
      e.preventDefault()
      const url = DIR + aEle.href
      console.log(url)
      createHTMLObjAndSet(url)
    })
  })

  function createHTMLObjAndSet(url) {
    const obj = document.createElement("object")
    obj.type = "text/html"
    obj.data = url
    obj.width = "800px"
    obj.height = "800px"
    boardPageContainer.innerHTML = obj.outerHTML
    return
  }
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
