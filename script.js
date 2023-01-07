const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.rect(50, 20, 40, 40)
ctx.fillStyle = '#FF0000'
ctx.fill()
ctx.closePath()

ctx.beginPath()
ctx.arc(220, 120, 8, 0, Math.PI * 2, false)
ctx.fillStyle = 'green'
ctx.fill()
ctx.closePath()

ctx.beginPath()
ctx.rect(160, 10, 75, 20)
ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)'
ctx.stroke()
ctx.closePath()

const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false

let x = canvas.width / 2
let y = canvas.height - 30
let dx = 2
let dy = -2

const ballRadius = 10

function keyDownHandler (e) {
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
    rightPressed = true
  } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
    leftPressed = true
  }
}

function keyUpHandler (e) {
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
    rightPressed = false
  } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
    leftPressed = false
  }
}

function drawBall () {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function drawPaddle () {
  ctx.beginPath()
  ctx.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  )
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPaddle()
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    // alert('GAME OVER')
    document.location.reload()
    clearInterval(interval) // Needed for Chrome to end game
  }
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx
  }
  x += dx
  y += dy
  if (rightPressed) {
    paddleX += 7
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth
    }
  } else if (leftPressed) {
    paddleX -= 7
    if (paddleX < 0) {
      paddleX = 0
    }
  }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

const interval = setInterval(draw, 10)
