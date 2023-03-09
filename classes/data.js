import { Dodo } from "./dodo.js"
import LineByLine from "n-readlines"
import { appendFileSync, writeFileSync} from "fs"

export class Data {
    constructor(){
        this.dodos = []
        this.counter = 0
        //this.file = "data.csv"
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

    // write() {
    //     let content = ""
    //     this.dodos.forEach(dodo => {
    //         content += `${dodo.id};${dodo.title};${dodo.content}\n`
    //     })
    //     writeFileSync(this.file, content)
    // }

    getDodo(id){
        return this.dodos.find(d => d.id == id)
    }

    updateDodo(id, title, content){
        const dodo = this.getDodo(id)
        if(dodo != undefined){
            dodo.title = title
            dodo.content = content
            //this.write()
            return true
        }

        return false
    }

    deleteDodo(id){
        const dodo = this.updateDodo(id)
        if(dodo != undefined){
            this.dodos = this.dodos.filter(d => d.id != id)
            //this.write()
            return true
        }
        return false
    }
}