const express = require("express")
const { User, Dog } = require("./models")

const app = express()
app.use(express.json())
app.use("/assets", express.static("./public/assets"))
app.use("/", express.static("./views/home"))
app.use("/favoritos", express.static("./views/favorites"))
app.use("/usuarios", express.static("./views/users"))

app.get("/api/dog", async (request, response) => {
  const dogs = await Dog.findAll()

  response.json(dogs)
})
app.get("/api/user", async (request, response) => {
  const users = await User.findAll()

  response.json(users)
})
app.post("/api/user", async (request, response) => {
  const newUser = {
    name: request.body.name,
    birthDate: request.body.birthDate,
    email: request.body.email,
    cpf: request.body.cpf,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const user = await User.create(newUser)

  response.json(user)
})
app.delete("/api/user/:id", function (request, response) {
  if (!request.params.id) {
    request
      .status(400)
      .send({ message: "É necessário um id para deletar um usuário" })
    return
  }

  User.destroy({ where: { id: request.params.id } })
    .then((data) => {
      response.send({ deleteUsersCount: data })
    })
    .catch((erro) => {
      response.status(500).send({
        message:
          erro.message || "Ocorreu erro ao tentar criar uma novo usuário.",
      })
    })
})

app.listen(3000, () => {
  console.log(`Servidor está rodando em http://localhost:3000`)
})
