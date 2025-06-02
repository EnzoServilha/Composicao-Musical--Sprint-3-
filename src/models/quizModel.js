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

    `select u.nome as "nome", truncate(sum(respostaCerta) / count(*) * 100, 2) as "Acertos"
        from desempenho
        inner join usuarios u on u.idUsuarios = desempenho.fkUsuarios
           where fkUsuarios = ${idUsuarios} and idTentativa = (
            select max(idTentativa)
                from desempenho
                  where fkUsuarios = ${idUsuarios})
                     group by u.nome, u.idUsuarios
        `;

        return database.executar(instrucao)
    }


        // KPI
        function totalParticipantes(){
            var instrucao = `
            select count(distinct idUsuarios) as "TotalUsuarios"
            from usuarios;
            ` 
            return database.executar(instrucao)
        }


        // 3 grafico
        function historicoDesempenhoDoUsuario(idUsuario){

            var instrucao = `

            select idTentativa, truncate(sum(respostaCerta) / count(*) * 100, 2) as "TaxaAcerto",
            max(dia) as "Dia"
            from desempenho 
            where fkUsuarios = ${idUsuario}
            group by idTentativa
            order by Dia;
            `


            return database.executar(instrucao)
        }



    module.exports = { //Exportar pro fetch
    questoes,
    certas,
    preferenciasMusicais,
    contarAcertosPorUsuario,
    totalParticipantes,
    historicoDesempenhoDoUsuario
}