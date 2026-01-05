const grid = document.getElementById("fireField");
const grid2 = document.getElementById("hitField")
const rows = 10;
const cols = 10;

for (let i = 0; i < rows * cols; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  // optional: click interaction
  cell.addEventListener("click", () => {
    cell.style.backgroundColor = "orange";
  });

  grid.appendChild(cell);
  grid2.appendChild(cell);
}
