let btn = document.querySelector("button")
let num = document.querySelector("span")
let delay = 500

const debounce = (fn, delay) => {
  let timer
  return function () {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.call(this, ...arguments)
    }, delay)
  }
}

btn.addEventListener(
  "click",
  debounce((e) => {
    e.stopPropagation

    num.textContent = parseInt(num.textContent) + 1
  }, delay)
)
