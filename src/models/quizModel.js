var database = require("../database/config")

console.log("Passou no desempenho");
    // Tabela Desempenho
    function questoes(idUsuarios, fkQuiz, respostaCerta, idTentativa ){
        console.log("Passou no desempenho");
        
         var instrucao = `
                        insert into desempenho( idTentativa, fkUsuarios, fkQuiz, respostaCerta ) 
                        values ( ${idTentativa}, ${idUsuarios}, ${fkQuiz}, ${respostaCerta} );`   ;

                        return database.executar(instrucao)                         
    }

    function certas(){
        var instrucao = `
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
        `
                        return database.executar(instrucao)
    }


    function erradas(){
        var instrucao = `
        select  u.nome as nome , COUNT(*) as quantidade from desempenho dp
		inner join usuarios as u on u.idUsuarios = dp.fkUsuarios
			where respostaCerta = 0
				group by nome
					order by quantidade desc
						limit 10;
                        `
                        return database.executar(instrucao)
    }

    // Grafico Pizza
    function preferenciasMusicais(){
        var instrucao = `
            select generoPreferido as "GeneroPreferido", count(*) as "Quantidade"
            from usuarios
            where generoPreferido is not null
            group by generoPreferido;
        `
        return database.executar(instrucao)
    }

    // Conta acertos
    function contarAcertosPorUsuario(idUsuarios){
        var instrucao = 

    `select truncate(sum(respostaCerta) / count(*) * 100, 2) as "Acertos"
        from desempenho
           where fkUsuarios = ${idUsuarios} and idTentativa = (
            select max(idTentativa)
                from desempenho
                  where fkUsuarios = ${idUsuarios})

        `;

        return database.executar(instrucao)
    }

        function totalParticipantes(){
            var instrucao = `
            select count(distinct idUsuarios) as "Total Usuarios"
            from usuarios;
            ` 
            return database.executar(instrucao)
        }



    module.exports = { //Exportar pro fetch
    questoes,
    certas,
    erradas,
    preferenciasMusicais,
    contarAcertosPorUsuario,
    totalParticipantes
}