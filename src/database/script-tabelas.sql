-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

create database composicao;
use composicao;

create table usuarios(
idUsuarios 	int primary key auto_increment,
nome	varchar(45),
email	varchar(45),
senha	varchar(45)
);

create table quiz(
idQuiz  int primary key auto_increment,
fkUsuarios 	int,
qtdRespostas	varchar(45),
foreign key (fkUsuarios) references usuarios(idUsuarios)
);
