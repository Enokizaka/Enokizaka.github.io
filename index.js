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
  const pageContentWrapper = document.querySelector("#page-content-wrapper")
  const isOpened = () => {
    return wrapperContainer.classList.value.includes("toggled")
  }
  const reverseToggle = () => {
    const foo = isOpened() ? "remove" : "add"
    wrapperContainer.classList[foo]("toggled")
  }
  toggleButton.addEventListener("click", () => {
    console.log("toggle button")
    reverseToggle()
  })

  // PAGE MANIPULATION
  const navBar = document.querySelector("#nav-bar")
  const sidebarWrapper = document.querySelector("#sidebar-wrapper")
  const sideHomeButton = document.querySelector("#side-home")
  const sideAboutButton = document.querySelector("#side-about")
  let boardPageContainer = document.querySelector("#board")
  const aboutPageContainer = document.querySelector("#about")
  let appearingContainerEle = boardPageContainer

  sideHomeButton.addEventListener("click", () => {
    appearingContainerEle.classList.add("none")
    boardPageContainer.classList.remove("none")
    appearingContainerEle = boardPageContainer
    boardPageContainer.innerHTML = `
    <h1 class="mt-4">My Projects</h1>

    <ul style="list-style-type: square">
      <li>
        <a id="fun-string-a" href="./projects/fun-string/fun-string.html"
          >fun-string</a
        >
      </li>
      <li>
        <a
          id="tws-vanilla-a"
          href="./projects/tws-vanilla/tws-vanilla.html"
          >tws-vanilla</a
        >
      </li>
      <li>...</li>
    </ul>
    `
    projectLinksAddEventLis()
    reverseToggle()
  })

  sideAboutButton.addEventListener("click", () => {
    appearingContainerEle.classList.add("none")
    aboutPageContainer.classList.remove("none")
    appearingContainerEle = aboutPageContainer
    reverseToggle()
  })

  // Project links in board
  function projectLinksAddEventLis() {
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
  }
  projectLinksAddEventLis()

  function createHTMLObjAndSet(url) {
    const obj = document.createElement("object")
    obj.type = "text/html"
    obj.data = url
    obj.width = window.innerWidth
    obj.width = pageContentWrapper.clientWidth
    obj.height = window.innerHeight - 51
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
