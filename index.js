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

app.put('/dodos/:id',(req,res) => {
    const {title, content} = req.body
    if(data.updateDodo(req.params.id, title, content)) {
        res.json({message : "dodo modifié"})
    }else {
        res.json({message : "erreur lors de la modification de la dodo"})
    }

})

app.post('/dodos',(req,res) => {
    const {title, content} = req.body
    data.addDodo(title, content)
    res.json({message : "dodo ajouté"})
})

app.delete('/dodos/:id',(req,res) => {
    if(data.deleteDodo(req.params.id)) {
        res.json({message : "dodo supprimé"})
    }else {
        res.json({message : "erreur lors de la suppression de la dodo"})
    }
})

app.listen(5001, () => {
    //data.read()
    console.log("port 5001 écouté")   
})