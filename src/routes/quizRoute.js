const express = require ("express")
const router = express.Router()
const quizController = require ("../controllers/quizController")
//const path = require('path')

//Middleware parsear json 
router.use(express.json())

router.post('/questoes', function(req, res){
    console.log(req.body)   
    quizController.questoes(req, res) })


router.get('/certas', function(req, res){
    quizController.certas(req, res) })


    
router.get('/erradas', function(req, res){
    quizController.erradas(req, res) })


router.get('/preferenciasMusicais', function(req, res){
        quizController.preferenciasMusicais(req, res)})


router.get('/contarAcertosPorUsuario/:id', function(req, res){
                quizController.contarAcertosPorUsuario(req,res)})

                
router.get('/totalParticipantes', function(req, res){
        quizController.totalParticipantes(req,res)})


    
    module.exports = router 