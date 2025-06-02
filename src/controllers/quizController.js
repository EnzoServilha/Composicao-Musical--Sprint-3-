var quizModel = require("../models/quizModel");

    function questoes(req, res){
       
         var idUsuarios = parseInt(req.body.idUsuarios)
        var fkQuiz = parseInt(req.body.fkQuiz)
        var respostaCerta = parseInt(req.body.respostaCerta)
        var idTentativa = parseInt(req.body.idTentativa)
        

        console.log("DADOS RECEBIDOS:", req.body);

        if(isNaN(idUsuarios) || isNaN(fkQuiz) || isNaN(respostaCerta)){
            return res.status(400).json({
                erro: "Campo invalido ou faltando idUsuarios, fkQUiz, respostaCerta"
            })
        }

        quizModel.questoes(idUsuarios, fkQuiz, respostaCerta, idTentativa)
        .then(() => {
            res.status(200).json({
                mensagem: "Resposta registrada com sucesso!"
            })
        })
        .catch(erro => {
            console.error("Erro ao registrar resposta:", erro);
            res.status(500).json(erro.sqlMessage || erro);
        })
        
    } 


    function certas(req, res){
        

        quizModel.certas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log("ERRO ao buscar pontuação: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
    

    function preferenciasMusicais(req, res){
        quizModel.preferenciasMusicais()

        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log("ERRO ao buscar pontuação: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }



    function contarAcertosPorUsuario(req, res){

        const idUsuarios = req.params.id 

        if(!idUsuarios){
            return res.status(400).json({erro: "ID do usuario não encontrado"})
        }

        quizModel.contarAcertosPorUsuario(idUsuarios)

        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log("ERRO ao buscar pontuação: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
        
    }


    
    function totalParticipantes(req, res){
        quizModel.totalParticipantes()

        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log("ERRO ao buscar pontuação: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }



    function historicoDesempenhoDoUsuario(req, res){
        var idUsuario = req.params.id
        quizModel.historicoDesempenhoDoUsuario(idUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro))

}





module.exports = {
    questoes,
    certas,
    preferenciasMusicais,
    contarAcertosPorUsuario,
    totalParticipantes,
    historicoDesempenhoDoUsuario
}