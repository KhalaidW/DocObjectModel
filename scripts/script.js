const grid1 = document.getElementById("fireField")
const grid2 = document.getElementById("hitField")
const ships = document.getElementById("ships")
const rows = 10
// const cols = 10;
let draggedShip = null

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

  // const shipParts = Array.from(ship.children)

  // for (let i = 0; i < shipLength; i++) {
  //   const targetCell = grid2.children[startIndex + i]
  //   if (!targetCell) return
  //   targetCell.appendChild(shipParts[i])
  // }

  // ship.remove()
  const cellRect = startCell.getBoundingClientRect()
  const gridRect = grid2.getBoundingClientRect()

  ship.style.position = "absolute"
  ship.style.top = `${cellRect.top - gridRect.top}px`
  ship.style.left = `${cellRect.left - gridRect.left}px`

  grid2.appendChild(ship)
}


createGrid(grid1)
createGrid(grid2)
createShips()

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
