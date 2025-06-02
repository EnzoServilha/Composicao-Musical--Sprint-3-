-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/
create database composicao;
use composicao;

-- drop database composicao;

create table usuarios(
idUsuarios 	int primary key auto_increment,
nome	varchar(45),
email	varchar(45) unique,
senha	varchar(45),
generoPreferido 	varchar(50)
);

create table quiz(
idQuiz		int primary key auto_increment,
perguntas 	varchar(300)
);

create table desempenho (
idTentativa bigint,
fkUsuarios 	int,
fkQuiz		int,
respostaCerta 	int,
dia datetime default current_timestamp(),
foreign key (fkUsuarios) references usuarios(idUsuarios),
foreign key (fkQuiz) references quiz(idQuiz) 
  );
  



insert into quiz (perguntas) values 
("O que é uma composição musical?"),
("Qual elemento musical é responsável pela ´linha melodica´ de uma música ?"),
("Qual foi o primeiro instrumento musical inventado?"),
("Quem compos as quatro estações?"),
("Qual elemento NÃO é essencial em uma composição musical?"),
("O que é progressão harmõnica?"),
("Qual é o genero musical mais ouvido atualmente?"),
("Qual foi a banda a verder mais discos da história?");


-- Select respostas certas
 select u.nome as "Nome",
           sum(d.respostaCerta) as "Quantidade"
        from desempenho d
        inner join usuarios u on u.idUsuarios = d.fkUsuarios
        where d.idTentativa = ( select max(idTentativa)
        from desempenho
        where fkUsuarios = d.fkUsuarios)
        group by u.nome
        order by "Quantidade" desc
        limit 10;



-- Select erradas

select  u.nome as nome , COUNT(*) as quantidade from desempenho dp
		inner join usuarios as u on u.idUsuarios = dp.fkUsuarios
			where respostaCerta = 0
				group by nome
					order by quantidade desc
						limit 10;
                        
                        
                        
-- select grafico de pizza
select generoPreferido as "GeneroPreferido", count(*) as "Quantidade"
            from usuarios
            where generoPreferido is not null
            group by generoPreferido;
            


-- Contar acertos por usuarios
select truncate(sum(respostaCerta) / count(*) * 100, 2) as "Acertos"
        from desempenho
           where fkUsuarios = 1 and idTentativa = (
            select max(idTentativa)
                from desempenho
                  where fkUsuarios = 1);
    

-- Select Total participantes
select count(distinct idUsuarios) as "Total Usuarios"
from usuarios;



-- Select Grafico historico Desempenho 
select idTentativa, truncate(sum(respostaCerta) / count(*) * 100, 2) as "TaxaAcerto",
            max(dia) as "Dia"
            from desempenho 
            where fkUsuarios = 5
            group by idTentativa
            order by Dia;
                        
                        
            select * from desempenho;
			select * from usuarios;
            select * from quiz;

            
		    
-- Porcentagem Taxa de Acertos 
select truncate((select count(*) as "Acertos" 
from desempenho
where respostaCerta = 1
and fkUsuarios = 4) / (select count(*) as "Perguntas" 
from desempenho
where fkUsuarios = 4) * 100, 2) as "Taxa de Acertos";

         
        
