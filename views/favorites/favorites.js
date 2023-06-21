const loginButton = document.querySelector("#loginButton")
const loginModal = new bootstrap.Modal(document.querySelector("#loginModal"))

loginButton.addEventListener("click", (event) => {
  event.preventDefault()
  loginModal.show()
})
