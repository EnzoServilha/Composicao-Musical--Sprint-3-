var quizModel = require("../models/quizModel");

    function questoes(req, res){
       
         var idUsuarios = req.body.idUsuarios
        var fkQuiz = req.body.fkQuiz
        var respostaCerta = req.body.respostaCerta

        quizModel.questoes(idUsuarios, fkQuiz, respostaCerta)
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
    
    function erradas(req, res){
        quizModel.erradas()

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




module.exports = {
    questoes,
    certas,
    erradas
}