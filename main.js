const express = require('express')
const Container = require('./CrudContainer')

const app = express();
const port = 8080
const listaProductos = new Container('productos.json')

app.get('/productos', async (req, res) => {
    const productos = await listaProductos.getAll()
    res.send({Productos: productos})
})

app.get('/productoRandom', async (req, res) => {
    const productos = await listaProductos.getAll()
    const productoRandom = parseInt(Math.random() * productos.length)
    res.send({Productos: productos[productoRandom]})
})


app.listen(port, () => console.log(`Servidor activo en ${port}`));