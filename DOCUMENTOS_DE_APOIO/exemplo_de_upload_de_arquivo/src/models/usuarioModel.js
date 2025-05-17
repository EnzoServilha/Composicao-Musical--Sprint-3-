const database = require("../database/config");

function salvar(usuario) {
  const instrucao = `insert into usuarios (nome, email, imagem_perfil) values ('${usuario.nome}', '${usuario.email}', '${usuario.imagem}')`;

  return database.executar(instrucao);
}

function buscarUsuarioPeloId(id) {
  const instrucao = `select * from usuarios where id = ${id}`;

  return database.executar(instrucao);
}

module.exports = { salvar, buscarUsuarioPeloId }