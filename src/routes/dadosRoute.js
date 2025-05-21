var express = require("express");
var router = express.Router();

var obterDados = require("../controllers/dadosController");

router.get('/', obterDados)

module.exports = router;