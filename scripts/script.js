const grid1 = document.getElementById("fireField")
const grid2 = document.getElementById("hitField")
const ships = document.getElementById("ships")
const rows = 10
// const cols = 10;
let draggedShip = null
const playerCells = grid1.querySelectorAll(".cell")

const shipArray = [
  { name: "destroyer", length: 2 },
  { name: "submarine", length: 3 },
  { name: "cruiser", length: 3 },
  { name: "battleship", length: 4 },
  { name: "carrier", length: 5 }
]

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

document.addEventListener("dragStart", e => {
  if (e.target.classList.contains("ship")) {
    draggedShip = e.target
    e.target.classList.add("dragging")
  }
})

document.addEventListener("dragEnd", e => {
  if (draggedShip) {
    draggedShip.classList.remove("dragging")
    draggedShip = null
  }
})

playerCells.forEach((cell, index) => {
  cell.addEventListener("dragOver", e => {
    e.preventDefault()
    cell.classList.add("dropHover")
  })

  cell.addEventListener("dragLeave", () => {
    cell.classList.remove("dropHover")
  })

  cell.addEventListener("drop", e => {
    e.preventDefault()
    cell.classList.remove("dropHover")

    if (!draggedShip) return

    placeShip(cell, draggedShip)
  })
})


createGrid(grid1)
createGrid(grid2)
createShips()