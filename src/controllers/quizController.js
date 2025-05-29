var quizModel = require("../models/quizModel");

    function questoes(req, res){
       
         var idUsuarios = parseInt(req.body.idUsuarios)
        var fkQuiz = parseInt(req.body.fkQuiz)
        var respostaCerta = parseInt(req.body.respostaCerta)

        console.log("DADOS RECEBIDOS:", req.body);

        if(isNaN(idUsuarios) || isNaN(fkQuiz) || isNaN(respostaCerta)){
            return res.status(400).json({
                erro: "Campo invalido ou faltando idUsuarios, fkQUiz, respostaCerta"
            })
        }

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

        const idUsuarios = req.params.id || req.query.id

        if(!idUsuarios){
            return res.status(400).json({erro: "ID do usuarionão fornecido"})
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





module.exports = {
    questoes,
    certas,
    erradas,
    preferenciasMusicais,
    contarAcertosPorUsuario,
    totalParticipantes
}