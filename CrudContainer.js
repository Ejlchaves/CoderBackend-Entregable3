const fs = require('fs').promises

class Container {
    constructor(obj) {
        this.obj = obj
    }

    async save(objeto) {
        try {
            const objObtenidos = await fs.readFile(this.obj, "utf-8" )
            const objetosParse = JSON.parse(objObtenidos)
            let id; 
            objetosParse.length === 0 ? (id = 1) : (id = objetosParse.length + 1);
            const newObj = {...objeto, id};
            objetosParse.push(newObj)
            await fs.writeFile(this.obj, JSON.stringify(objetosParse, null, 2), "utf-8")
            return newObj.id;
        } catch(resp) {console.log(resp)}
        
    }

    async getById(id) {
        try {const objObtenidos = await fs.readFile(this.obj, "utf-8" )
        const objetosParse = JSON.parse(objObtenidos)
        const objEncontrado = objetosParse.find(objeto => objeto.id === id)
        return objEncontrado
    } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        const objObtenidos = await fs.readFile(this.obj)
        return JSON.parse(objObtenidos)
    }

    async deleteById(id) {
        try {const objObtenidos = await fs.readFile(this.obj, "utf-8" )
        const objetosParse = JSON.parse(objObtenidos)
        const arrNew = objetosParse.filter(objeto => objeto.id !== id)
        console.log(arrNew)
    } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try{
            await fs.writeFile(this.obj, JSON.stringify([], null, 2), "utf-8")
        } catch(resp) {
            console.log(resp)
        }
    }
}

module.exports=Container