import express from "express"
import fs from "fs"
import LineByline from "n-readlines"
import { Data } from "./classes/data.js"


const data = new Data()

const app = express()

app.use(express.json())

app.get('/dodos',(req,res) => {
    res.json(data.dodos)
})

app.get('/dodos/:id',(req,res) => {
    const dodo = data.getDodo(req.params.id)
    if(dodo != undefined) {
        res.json(dodo)
    }else {
        res.json({message : "aucune dodo avec cet id"})
    }
})

app.get('dodos/search/:search', (req, res) => {
    res.json(data.searchToDoByTitle(req.params.search))
})

app.put('/dodos/:id',(req,res) => {
    const {title, content} = req.body
    if(data.updateDodo(req.params.id, title, content)) {
        res.json({message : "dodo modifiée"})
    }else {
        res.json({message : "erreur lors de la modification de la dodo"})
    }

})

app.put('/dodos/:id/:isDone',(req,res) => {
    const {title, content} = req.body
    if(data.upDateDodoStatus(req.params.id, title, content, req.params.isDone )) {
        res.json({message : "Status dodo modifiée"})
    }else {
        res.json({message : "erreur lors de la modification du status de la dodo"})
    }

})

app.post('/dodos',(req,res) => {
    const {title, content} = req.body
    data.addDodo(title, content)
    res.json({message : "dodo ajoutée"})
})

app.delete('/dodos/:id',(req,res) => {
    if(data.deleteDodo(req.params.id)) {
        res.json({message : "dodo supprimée"})
    }else {
        res.json({message : "erreur lors de la suppression de la dodo"})
    }
})

app.listen(5001, () => {
    //data.read()
    console.log("port 5001 écouté")   
})