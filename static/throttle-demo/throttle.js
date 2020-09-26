let btn = document.querySelector("button")
let num = document.querySelector("span")
let delay = 500

const throttle = (fn, delay) => {
  let canRun = true
  return function () {
    if (canRun) {
      canRun = false
      fn.call(this, ...arguments)
      setTimeout(() => {
        canRun = true
      }, delay)
    }
  }
}

btn.addEventListener(
  "click",
  throttle((e) => {
    e.stopPropagation

    num.textContent = parseInt(num.textContent) + 1
  }, delay)
)
