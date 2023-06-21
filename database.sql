CREATE DATABASE dog_instagram;

CREATE TABLE dogs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  descricao TEXT,
  url_imagem VARCHAR(255)
);

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  cpf VARCHAR(14),
  senha VARCHAR(255)
);

CREATE TABLE favoritos (
  id INT PRIMARY KEY AUTO_INCREMENT,
);

CREATE TABLE "like" (
  id INT PRIMARY KEY AUTO_INCREMENT,
);

CREATE TABLE dislike (
  id INT PRIMARY KEY AUTO_INCREMENT,
);

INSERT INTO dogs (nome, descricao, url_imagem)
VALUES ('Rex', 'Um cão brincalhão e amigável', '/assets/1.jpg');

INSERT INTO dogs (nome, descricao, url_imagem)
VALUES ('Bella', 'Uma cadela inteligente e leal', '/assets/2.jpg');

INSERT INTO dogs (nome, descricao, url_imagem)
VALUES ('Max', 'Um cão enérgico e brincalhão', '/assets/3.jpg');

INSERT INTO dogs (nome, descricao, url_imagem)
VALUES ('Luna', 'Uma cadela dócil e amigável', '/assets/4.jpg');

INSERT INTO dogs (nome, descricao, url_imagem)
VALUES ('Charlie', 'Um cão de porte médio e leal', '/assets/5.jpg');

INSERT INTO dogs (nome, descricao, url_imagem)
VALUES ('Lucy', 'Uma cadela carinhosa e sociável', '/assets/6.jpg');

INSERT INTO dogs (nome, descricao, url_imagem)
VALUES ('Rocky', 'Um cão corajoso e protetor', '/assets/7.jpg');

INSERT INTO dogs (nome, descricao, url_imagem)
VALUES ('Daisy', 'Uma cadela alegre e brincalhona', '/assets/8.jpg');

INSERT INTO dogs (nome, descricao, url_imagem)
VALUES ('Buddy', 'Um cão amigável e obediente', '/assets/9.jpg');