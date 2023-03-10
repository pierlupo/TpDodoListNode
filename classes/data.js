import { Dodo } from "./dodo.js"
//import LineByLine from "n-readlines"
import { writeFileSync, readFileSync } from 'fs'

export class Data {
    constructor(){
        this.dodos = []
        this.counter = 0
       // this.file = "data.csv"
        this.file = "data.json"

    }

    addDodo(title , content) {
        const dodo = new Dodo(++this.counter, title , content)
        this.dodos.push(dodo)
        //appendFileSync(this.file, `${dodo.id};${dodo.title};${dodo.content}\n` )
        

    }

    // read() {
    //     this.dodos = []
    //     const reader = new LineByLine(this.file)
    //     let line
    //     while(line = reader.next()){
    //         const datas = line.toString().split(';')
    //         const dodo = new Contact(datas[0],datas[1],datas[2],datas[3],datas[4])
    //         this.dodos.push(dodo)
    //     }
    //     if(this.dodos.length != 0) {
    //      this.counter = this.dodos[this.dodos.length-1].id
    //     }
    // }

    write() {
        
        writeFileSync(this.file, JSON.stringify(this.dodos))
    }

    // write() {
    //     let content = ""
    //     this.dodos.forEach(dodo => {
    //         content += `${dodo.id};${dodo.title};${dodo.content}\n`
    //     })
    //     writeFileSync(this.file, content)
    // }

    read() {
        //try mettre ce qu'il ya dessous dans le try
        const content = readFileSync(this.file).toString()
        this.dodos = JSON.parse(content)
        this.counter = (this.todos[this.dodos.length-1] != undefined) ? this.todos[this.dodos.length-1].id : 0
        console.log(this.dodos[0].title);
        //catch mettre this.write dans le catch

    }

    getDodo(id){
        return this.dodos.find(d => d.id == id)
    }

    updateDodo(id, title, content){
        const dodo = this.getDodo(id)
        if(dodo != undefined){
            dodo.title = title
            dodo.content = content
            this.write()
            return true
        }

        return false
    }

    upDateDodoStatus(id, title, content){
        const dodo = this.getDodo(id)
        if(dodo != undefined){
            dodo.title = title
            dodo.content = content
            dodo.isDone = !dodo.isDone
            //ou bien dodo.isDone = true

            this.write()
            return true
        }

        return false

    }

    //M??thode de recherche de dodo par titre
    searchToDoByTitle(search) {
        return this.dodos.filter(d => d.title.includes(search))
    }

    deleteDodo(id){
        const dodo = this.updateDodo(id)
        if(dodo != undefined){
            this.dodos = this.dodos.filter(d => d.id != id)
            this.write()
            return true
        }
        return false
    }
}