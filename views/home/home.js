async function getDogList() {
  const response = await fetch("/api/dog")
  const dogs = await response.json()

  console.log("dogs", dogs)

  const dogListElement = document.getElementById("dog-list")

  while (dogListElement.firstChild) {
    dogListElement.removeChild(dogListElement.firstChild)
  }

  const lines = [
    { startIndex: 0, endIndex: 1 },
    { startIndex: 2, endIndex: 4 },
    { startIndex: 5, endIndex: 8 },
  ]

  lines.forEach((line, index) => {
    const dogContainer = document.createElement("div")
    dogContainer.setAttribute("id", `line-${index}`)
    dogContainer.setAttribute("class", "container")
    dogContainer.setAttribute("data-key", index)
    dogListElement.appendChild(dogContainer)

    for (let i = line.startIndex; i <= line.endIndex; i++) {
      const dog = dogs[i]
      const dogCard = document.createElement("div")
      dogCard.setAttribute("class", "card mb-4 shadow-sm")
      dogCard.innerHTML = `
        <img src="${dog.url_imagem}" class="card-img-top" alt="${dog.nome}" />
        <div class="card-body">
          <h5 class="card-title">${dog.nome}</h5>
          <p class="card-text">${dog.descricao}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary favorite-btn favorito">Favoritar</button>
              <button type="button" class="btn btn-sm btn-outline-secondary like-btn curtir"></button>
              <button type="button" class="btn btn-outline-danger">
                <i class="bi bi-hand-thumbs-down"></i>
              </button>
            </div>
          </div>
        </div>
      `

      const currentLine = document.getElementById(`line-${index}`)
      currentLine.appendChild(dogCard)
    }
  })
}

getDogList()

const loginButton = document.querySelector("#loginButton")
const loginModal = new bootstrap.Modal(document.querySelector("#loginModal"))

loginButton.addEventListener("click", (event) => {
  event.preventDefault()
  loginModal.show()
})
