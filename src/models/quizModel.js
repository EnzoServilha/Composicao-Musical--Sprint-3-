var database = require("../database/config")



    function questoes(idUsuarios, fkQuiz, respostaCerta){
         var instrucao = `
                        insert into desempenho(fkUsuarios, fkQuiz, respostaCerta) 
                        values (${idUsuarios}, ${fkQuiz}, ${respostaCerta})`
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


    module.exports = { //Exportar pro fetch
    questoes,
    certas,
    erradas
}