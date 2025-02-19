const DIR = ""
let buttonInstall
// let pageContentWrapper
window.addEventListener("DOMContentLoaded", () => {
  // SERVICE WORLER
  let deferredPrompt
  buttonInstall = document.querySelector("#install-button")
  console.log(`DOMContentLoaded button none`)
  buttonInstall.classList.add("none")

  window.addEventListener("beforeinstallprompt", (e) => {
    // CAUTION! this eventListener will be fired some times
    console.log("beforeinstallprompt")
    buttonInstall.classList.remove("none")
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    deferredPrompt = e
    // showInstallPromotion()
  })

  buttonInstall.addEventListener("click", (e) => {
    // hideMyInstallPromotion()
    e.preventDefault()
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt")
        console.log(`buttonlick and accepted -> button none`)
        buttonInstall.classList.add("none").classList.add("none")
      } else {
      }
      deferredPrompt = null
    })
  })

  // Toggle button
  const toggleButton = document.querySelector("#my-toggle")
  const topRightButton = document.querySelector("#top-right-button")
  const wrapperContainer = document.querySelector("#wrapper")
  const pageContentWrapper = document.querySelector("#page-content-wrapper")
  if (window.innerWidth > 767) toggleButton
  const isOpened = () => {
    return wrapperContainer.classList.value.includes("toggled")
    // return document.querySelector("#wrapper").classList.value.includes("toggled")
  }
  const reverseToggle = () => {
    const foo = isOpened() ? "remove" : "add"
    wrapperContainer.classList[foo]("toggled")
  }
  const isDripped = () => {
    return topRightButton.getAttribute("aria-expanded") === "true"
  }
  toggleButton.addEventListener("click", () => {
    console.log("toggle button")
    reverseToggle()
  })

  // PAGE MANIPULATION
  const navBar = document.querySelector("#nav-bar")
  const navHomeButton = document.querySelector("#nav-home")
  const sidebarWrapper = document.querySelector("#sidebar-wrapper")
  const sideHomeButton = document.querySelector("#side-home")
  const sideAboutButton = document.querySelector("#side-about")
  let boardPageContainer = document.querySelector("#board")
  const aboutPageContainer = document.querySelector("#about")
  let appearingContainerEle = boardPageContainer

  // const homeButtonArr = [sideHomeButton, navHomeButton]
  // homeButtonArr.forEach((buttonEle) => {
  //   buttonEle.addEventListener("click", (e) => {
  //     e.preventDefault()
  //     appearingContainerEle.classList.add("none")
  //     boardPageContainer.classList.remove("none")
  //     appearingContainerEle = boardPageContainer
  //     boardPageContainer.innerHTML = `
  //     <h1 class="mt-4">My Static Projects</h1>

  //     <ul style="list-style-type: square">
  //       <li>
  //         <a id="fun-string-a" href="./projects/fun-string/fun-string.html"
  //           >fun-string</a
  //         >
  //       </li>
  //       <li>
  //         <a
  //           id="tws-vanilla-a"
  //           href="./projects/tws-vanilla/tws-vanilla.html"
  //           >tws-vanilla</a
  //         >
  //       </li>
  //       <li>...</li>
  //     </ul>
  //     `
  //     projectLinksAddEventLis()
  //     isOpened() ? reverseToggle() : null
  //     isDripped() ? topRightButton.click() : null
  //   })
  // })
  sideHomeButton.addEventListener("click", () => {
    appearingContainerEle.classList.add("none")
    boardPageContainer.classList.remove("none")
    appearingContainerEle = boardPageContainer
    boardPageContainer.innerHTML = `
    <h1 class="mt-4">My Static Projects</h1>

    <ul style="list-style-type: square">
      <li>
        <a id="fun-string-a" href="./projects/fun-string/fun-string.html"
          >fun-string</a
        >
      </li>
      <li>
              <a id="fun-string-b" href="./projects/fun-string-binary/fun-string-binary.html"
                >fun-string-binary</a
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
    aEleArr.push(document.querySelector("#fun-string-b"))
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
  console.log(`INSTALL: Success -> button none`)
  buttonInstall.classList.add("none")
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
