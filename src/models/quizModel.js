var database = require("../database/config")

console.log("Passou no desempenho");

    function questoes(idUsuarios, fkQuiz, respostaCerta){
        console.log("Passou no desempenho");
        
         var instrucao = `
                        insert into desempenho(fkUsuarios, fkQuiz, respostaCerta) 
                        values (${idUsuarios}, ${fkQuiz}, ${respostaCerta})`   ;

                        return database.executar(instrucao)                         
    }

    function certas(){
        var instrucao = `
        select  u.nome as nome , COUNT(*) as quantidade from desempenho dp
		inner join usuarios as u on u.idUsuarios = dp.fkUsuarios
			where respostaCerta = 1
				group by nome
					order by quantidade desc
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

    function preferenciasMusicais(){
        var instrucao = `
            select generoPreferido as "GeneroPreferido", count(*) as "Quantidade"
            from usuarios
            where generoPreferido is not null
            group by generoPreferido;
        `
        return database.executar(instrucao)
    }

    function contarAcertosPorUsuario(idUsuarios){
        var instrucao = `
            select count(*) as "Acertos" 
            from desempenho
            where respostaCerta = 1
            and fkUsuarios = ?
            ;
        ` ;
        return database.executar(instrucao, [idUsuarios])
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