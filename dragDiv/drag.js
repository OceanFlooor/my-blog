let ele = document.querySelector(".drag")
let position = null
let drag = false
let currentPosition = [100, 100]

ele.addEventListener("mousedown", (e) => {
  drag = true
  position = [e.clientX, e.clientY]
})

document.addEventListener("mousemove", (e) => {
  if (!drag) return

  let delta = [e.clientX - position[0], e.clientY - position[1]]

  ele.style.left = currentPosition[0] + delta[0] + "px"
  ele.style.top = currentPosition[1] + delta[1] + "px"
})

document.addEventListener("mouseup", () => {
  drag = false
  position = null
  currentPosition = [parseInt(ele.style.left), parseInt(ele.style.top)]
})
