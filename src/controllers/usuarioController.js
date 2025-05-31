var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        
                                    res.json({
                                        idUsuarios: resultadoAutenticar[0].idUsuarios,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha
                                    });
                                
                            
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
function verificarEmail(req, res){
    var email = req.body.emailServer
    usuarioModel.verificarEmail(email)
    .then((resultado) => {
        if(resultado.length > 0){
            res.status(409).send("Email já cadastrado")
        } else{
            console.log("email normal");
            res.sendStatus(200)
            
        }
    })
    .catch((erro) => {
        console.log("Erro verificacao email", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage)
        
    })


}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log("Dados RECEBIDOS:", req.body);

    
    
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var generoPreferido = req.body.generoServer

        if (!nome ) {
        res.status(400).send("Seu nome está undefined!");
    } else if (!email) {
        res.status(400).send("Seu email está undefined!");
    } else if (!senha) {
        res.status(400).send("Sua senha está undefined!");
    } else if(!generoPreferido){
        res.status(400).send("Seu Genero Preferido está undefined!");
        }
     else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, generoPreferido)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log("CODIGO DE ERRO:", erro.code);
                    
                    if(erro.code === "ER_DUP_ENTRY"){
                        
                       return res.status(409).send("Email já existente")
                    } else{
                        
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    return res.status(500).json(erro.sqlMessage);
                    }
                }
            );
    }
}

        function buscarGeneroPorId(req, res){

            var idUsuarios = req.params.id
            usuarioModel.buscarGeneroPorId(idUsuarios)
            .then(resultado => res.json(resultado[0]))
            .catch(erro => res.status(500).json(erro))

        }

module.exports = {
    autenticar,
    cadastrar,
    buscarGeneroPorId,
    verificarEmail
}