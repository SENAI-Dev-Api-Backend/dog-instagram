module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "usuario",
    {
      nome: {
        type: Sequelize.STRING,
      },
      cpf: {
        type: Sequelize.STRING,
      },
      senha: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  )

  return user
}
