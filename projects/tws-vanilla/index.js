document.addEventListener("DOMContentLoaded", () => {
  const pi = document.querySelector(".pi")
  const pu = document.querySelector(".pu")
  const poon = document.querySelector(".poon")
  const welMessage = document.querySelector(".welcome-message")
  const timeMessage = document.querySelector(".timer-message")

  class Timer {
    constructor() {
      this.isStoping = true
      this.ccc = null
      this.time = new Date().toLocaleTimeString()
      timeMessage.innerHTML = this.time
      this.ctime = null
    }

    set setTime(time) {
      this.ctime = time
    }

    set setIntervalId(intervalId) {
      this.ccc = intervalId
    }

    makeSound = (mp3) => {
      if (timer.isStoping) return
      mp3.play()
    }

    updateTime = () => {
      const date = new Date()
      this.time = date.toLocaleTimeString()
      timeMessage.innerHTML = this.time
      let second = date.getSeconds()
      this.setCtime = this.time

      second = second % 10
      switch (second) {
        case 1:
          this.makeSound(pi)
          break
        case 2:
          this.makeSound(pi)
          break
        case 3:
          this.makeSound(pi)
          break
        case 4:
          this.makeSound(pi)
          break
        case 5:
          this.makeSound(pi)
          break
        case 6:
          this.makeSound(pi)
          break
        case 7:
          this.makeSound(pi)
          this.makeSound(pu)
          break
        case 8:
          this.makeSound(pi)
          this.makeSound(pu)
          break
        case 9:
          this.makeSound(pi)
          this.makeSound(pu)
          break
        case 0:
          this.makeSound(pi)
          this.makeSound(poon)
          break
      }
    }

    start = () => {
      const res = setInterval(this.updateTime, 1000)
      this.setIntervalId = res
    }
  }

  const timer = new Timer()
  timer.start()

  document.addEventListener("click", () => {
    timer.isStoping = !timer.isStoping
    if (timer.isStoping) {
      welMessage.classList.remove("none")
      timeMessage.classList.add("none")
    } else {
      welMessage.classList.add("none")
      timeMessage.classList.remove("none")
    }
  })
})
