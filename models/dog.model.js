module.exports = (sequelize, Sequelize) => {
  const dog = sequelize.define(
    "dog",
    {
      nome: {
        type: Sequelize.STRING,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      url_imagem: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  )

  return dog
}
