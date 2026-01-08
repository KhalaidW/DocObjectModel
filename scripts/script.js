const grid1 = document.getElementById("fireField")
const grid2 = document.getElementById("hitField")
const ships = document.getElementById("ships")
const rows = 10
// const cols = 10;
let draggedShip = null
let enemyFleet = []
let playerFleet = []


const shipArray = [
  { name: "destroyer", length: 2 },
  { name: "submarine", length: 3 },
  { name: "cruiser", length: 3 },
  { name: "battleship", length: 4 },
  { name: "carrier", length: 5 }
]

const duck = document.getElementById("Duck")

duck.addEventListener("click", () => {
  duck.classList.toggle("duckMoved")
})

const resetBtn = document.getElementById("resetGame")

resetBtn.addEventListener("click", resetGame)

// for (let i = 0; i < rows * cols; i++) {
//   const cell = document.createElement("div");
//   cell.classList.add("cell");

//   // optional: click interaction
//   cell.addEventListener("click", () => {
//     cell.style.backgroundColor = "orange";
//   });

//   grid.appendChild(cell);
//   grid2.appendChild(cell);
// }

function createGrid(gridElement) {
  for (let i = 0; i < rows * rows; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.dataset.index = i
    gridElement.appendChild(cell)
  }
}

function createShips() {
  shipArray.forEach(ship => {
    const shipElement = document.createElement("div")
    shipElement.classList.add("ship")
    shipElement.id = ship.name
    shipElement.draggable = true
    shipElement.dataset.length = ship.length

    for (let i = 0; i < ship.length; i++) {
      const shipCell = document.createElement("div")
      shipCell.classList.add("cell")
      shipElement.appendChild(shipCell)
    }

    ships.appendChild(shipElement)
  })
}

document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("ship")) {
    draggedShip = e.target
    e.target.classList.add("dragging")
  }
})

document.addEventListener("dragend", e => {
  if (draggedShip) {
    draggedShip.classList.remove("dragging")
    draggedShip = null
  }
})

function placeShip(startCell, ship) {
  const shipLength = Number(ship.dataset.length)
  const startIndex = [...grid2.children].indexOf(startCell)
  const rowStart = Math.floor(startIndex / rows) * rows
  const rowEnd = rowStart + rows

  if (startIndex + shipLength > rowEnd) return

  const positions = []

  for (let i = 0; i < shipLength; i++) {
    positions.push(startIndex + i)
  }

  playerFleet.push({
    name: ship.id,
    positions,
    hits: 0
  })

  updatePlayerTracker()

  const cellRect = startCell.getBoundingClientRect()
  const gridRect = grid2.getBoundingClientRect()

  ship.style.position = "absolute"
  ship.style.top = `${cellRect.top - gridRect.top}px`
  ship.style.left = `${cellRect.left - gridRect.left}px`

  grid2.appendChild(ship)
}

function updatePlayerTracker() {
  const tracker = document.getElementById("playerTracker")
  tracker.textContent = `Your ships remaining: ${playerFleet.length}`
}

function placeEnemyShips() {
  const cells = Array.from(grid1.children)
  const occupied = new Set()
  enemyFleet = []

  shipArray.forEach(ship => {
    let placed = false

    while (!placed) {
      const startIndex = Math.floor(Math.random() * cells.length)
      const rowStart = Math.floor(startIndex / rows) * rows
      const rowEnd = rowStart + rows

      if (startIndex + ship.length > rowEnd) continue

      let positions = []
      let canPlace = true

      for (let i = 0; i < ship.length; i++) {
        if (occupied.has(startIndex + i)) {
          canPlace = false
          break
        }
        positions.push(startIndex + i)
      }

      if (!canPlace) continue

      positions.forEach(index => {
        cells[index].classList.add("enemyShip")
        occupied.add(index)
      })

      enemyFleet.push({
        name: ship.name,
        positions,
        hits: 0
      })

      placed = true
    }
  })

  updateEnemyTracker()
}


const revealBtn = document.getElementById("revealEnemy")
let revealed = false

revealBtn.addEventListener("click", () => {
  const enemyCells = grid1.querySelectorAll(".enemyShip")

  enemyCells.forEach(cell => {
    cell.classList.toggle("revealed")
  })

  revealed = !revealed
  revealBtn.textContent = revealed
    ? "Uncheat"
    : "Cheat"
})

function resetGame() {
  grid1.innerHTML = ""
  grid2.innerHTML = ""

  ships.innerHTML = ""

  createGrid(grid1)
  createGrid(grid2)
  createShips()
  placeEnemyShips()
  enableFiring()
  playerFleet = []
  updatePlayerTracker()


  const playerCells = grid2.querySelectorAll(".cell")

  playerCells.forEach(cell => {
    cell.addEventListener("dragover", e => {
      e.preventDefault()
      cell.classList.add("dropHover")
    })

    cell.addEventListener("dragleave", () => {
      cell.classList.remove("dropHover")
    })

    cell.addEventListener("drop", e => {
      e.preventDefault()
      cell.classList.remove("dropHover")

      if (!draggedShip) return
      placeShip(cell, draggedShip)
    })
  })
}

function enableFiring() {
  const enemyCells = grid1.querySelectorAll(".cell")

  enemyCells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (cell.classList.contains("hit") || cell.classList.contains("miss")) return

      const index = Number(cell.dataset.index)

      if (cell.classList.contains("enemyShip")) {
        cell.classList.add("hit")

        enemyFleet.forEach((ship, shipIndex) => {
          if (ship.positions.includes(index)) {
            ship.hits++

            if (ship.hits === ship.positions.length) {
              enemyFleet.splice(shipIndex, 1)
              updateEnemyTracker()
            }
          }
        })
      } else {
        cell.classList.add("miss")
      }
    })
  })
}

function updateEnemyTracker() {
  const tracker = document.getElementById("enemyTracker")
  tracker.textContent = `Enemy ships remaining: ${enemyFleet.length}`
}



createGrid(grid1)
createGrid(grid2)
createShips()
placeEnemyShips()
enableFiring()
updatePlayerTracker()

const playerCells = grid2.querySelectorAll(".cell")

playerCells.forEach(cell => {
  cell.addEventListener("dragover", e => {
    e.preventDefault()
    cell.classList.add("dropHover")
  })

  cell.addEventListener("dragleave", () => {
    cell.classList.remove("dropHover")
  })

  cell.addEventListener("drop", e => {
    e.preventDefault()
    cell.classList.remove("dropHover")

    if (!draggedShip) return

    placeShip(cell, draggedShip)
  })
})
