const grid1 = document.getElementById("fireField")
const grid2 = document.getElementById("hitField")
const ships = document.getElementById("ships")
const rows = 10
// const cols = 10;

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

    for (let i = 0; i < ship.length; i++) {
      const shipCell = document.createElement("div")
      shipCell.classList.add("cell")
      shipElement.appendChild(shipCell)
    }

    ships.appendChild(shipElement)
  })
}

createGrid(grid1)
createGrid(grid2)
createShips()