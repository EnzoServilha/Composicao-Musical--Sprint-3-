const fs = require('fs')
const path = require('path');

function obterDados(req, res){
    const caminho = path.join(_dirname, './data/dados.json')
    fs.readFile(caminho, 'utf8', (err, data) => {
        if(err) return res.status(500).send('Erro ao ler dados');
        res.json(JSON.parse(data))
    })
}
module.exports = obterDados