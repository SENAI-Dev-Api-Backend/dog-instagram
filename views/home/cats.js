let catsJson = JSON.parse(localStorage.getItem("cats")) || [
  {
    id: 1,
    name: "Bolinha",
    img: "/assets/1.jpg",
    gender: "M",
    description:
      "Descrição da pizza em mais de uma linha muito legal bem interessante",
  },
  {
    id: 2,
    name: "Tufinha",
    img: "/assets/2.jpg",
    gender: "F",
    description:
      "Descrição da pizza em mais de uma linha muito legal bem interessante",
  },
  {
    id: 3,
    name: "Tuti",
    img: "/assets/3.jpg",
    gender: "F",
    description:
      "Descrição da pizza em mais de uma linha muito legal bem interessante",
  },
  {
    id: 4,
    name: "Linda",
    img: "/assets/4.jpg",
    gender: "F",
    description:
      "Descrição da pizza em mais de uma linha muito legal bem interessante",
  },
  {
    id: 5,
    name: "Bibi",
    img: "/assets/5.jpg",
    gender: "F",
    description:
      "Descrição da pizza em mais de uma linha muito legal bem interessante",
  },
  {
    id: 6,
    name: "Samy",
    img: "/assets/6.jpeg",
    gender: "F",
    description:
      "Descrição da pizza em mais de uma linha muito legal bem interessante",
  },
  {
    id: 7,
    name: "Nany",
    img: "/assets/7.jpg",
    gender: "M",
    description:
      "Descrição da pizza em mais de uma linha muito legal bem interessante",
  },
  {
    id: 8,
    name: "Squishy",
    img: "/assets/8.jpeg",
    gender: "M",
    description:
      "Descrição da pizza em mais de uma linha muito legal bem interessante",
  },
  {
    id: 9,
    name: "Bunny",
    img: "/assets/9.jpg",
    gender: "M",
    description:
      "Descrição da pizza em mais de uma linha muito legal bem interessante",
  },
]

function addCat() {
  const catName = document.getElementById("catName").value
  const catDescription = document.getElementById("catDesc").value
  const catSex = document.querySelector('input[name="catSex"]:checked').value
  console.log(catSex)
  const catImage = document.getElementById("catImage").files[0]

  let userInfo = {
    name: catName,
    img: catImage,
    gender: catSex,
    description: catDescription,
  }

  fetch("http://localhost:3000/product", {
    method: "POST",
    body: JSON.stringify(userInfo),
  })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  // Limpar campos do formulário
  document.getElementById("catName").value = ""
  document.getElementById("catDesc").value = ""
  document.querySelector('input[name="catSex"]:checked').checked = false
  document.getElementById("catImage").value = ""

  // Fechar modal
  const newCatModal = document.getElementById("addCatModal")
  const modal = bootstrap.Modal.getInstance(newCatModal)
  modal.hide()
}

function previewImage(event) {
  const reader = new FileReader()
  reader.onload = function () {
    const output = document.getElementById("previewImage")
    output.src = reader.result
  }
  reader.readAsDataURL(event.target.files[0])
}

const addCatForm = document.getElementById("addCatForm")
addCatForm.addEventListener("click", () => {
  addCat()
})

const catImageInput = document.getElementById("catImage")
catImageInput.addEventListener("change", (event) => {
  previewImage(event)
})
