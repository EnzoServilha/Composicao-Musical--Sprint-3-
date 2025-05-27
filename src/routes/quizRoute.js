const express = require ("express")
const router = express.Router()
const quizController = require ("../controllers/quizController")
//const path = require('path')

router.post('/questoes', function(req, res){
    quizController.questoes(req, res) })


router.get('/certas', function(req, res){
    quizController.certas(req, res) })


    
router.get('/erradas', function(req, res){
    quizController.erradas(req, res) })

/*router.get('/dashboard', function(req, res){
//    res.sendFile(path.resolve(__dirname, '../../public/dashboard.html'))    
})*/

    
    module.exports = router 