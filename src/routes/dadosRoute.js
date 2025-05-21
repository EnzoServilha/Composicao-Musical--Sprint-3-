var express = require("express");
var router = express.Router();
var dadosController = require("../controllers/dadosController");


router.get("/acertos_por_topico", dadosController.obterDados);
router.get("/preferencias_musicais", dadosController.obterDados);
router.get("/progresso_aprendizado", dadosController.obterDados);



module.exports = router;