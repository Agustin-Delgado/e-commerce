const productos = [{ id: 1, producto: "MONITOR", precio: 19999, stock: 10 },
{ id: 2, producto: "MOUSE", precio: 7899, stock: 10 },
{ id: 3, producto: "SILLA", precio: 29999, stock: 10 },
{ id: 4, producto: "MOCHILA", precio: 3298, stock: 10 },]

const carrito = []

let productoIngresado
let cantidadIngresada
let productoSeleccionado
let agregarProducto
let stock
let item

class itemAgregado {
    constructor(nombre, cantidad) {
        this.nombre = nombre.producto
        this.cantidad = cantidad
        this.precio = nombre.precio
        this.id = nombre.id
        this.subtotal = nombre.precio * cantidad
    }
}


function ingresarProductos() {

    do {

        productoIngresado = prompt("Ingresar un producto (monitor / mouse / silla / mochila / finalizar)").toUpperCase()

        if (productoIngresado === "FINALIZAR") {

            verCarrito()

        } else {

            cantidadIngresada = parseInt(prompt("Ingresar cantidad"))
            revisarStock()
        }

    } while (agregarProducto == "" || agregarProducto == null || !isNaN(agregarProducto))
}

function revisarStock() {

    productoSeleccionado = productos.find(p => p.producto === productoIngresado)

    if (cantidadIngresada >= productoSeleccionado.stock) {

        alert("No hay stock disponible de " + productoIngresado + ", por favor elegir menos cantidad u otro producto")
        return

    } else {

        agregarItem()
    }
}

function agregarItem() {

    confirmar = prompt("Desea agregar " + productoIngresado + " al carrito? SI/NO").toUpperCase()

    if (confirmar === "SI") {

        item = carrito.push(new itemAgregado(productoSeleccionado, cantidadIngresada))

        agregarProducto = prompt("Desea agregar otro producto?").toUpperCase()

        if (agregarProducto === "SI") { ingresarProductos() } else { verCarrito() }

    } else {

        alert("El producto no fue ingresado")
        ingresarProductos()
    }
}

function verCarrito() {

    let terminarCompra = prompt("Desea finalizar la compra? SI/NO").toUpperCase()

    if (terminarCompra === "SI") {

        carrito.forEach(item => alert(item.nombre + " cantidad: " + item.cantidad + " subtotal: $" + item.subtotal))

        let totalCarrito = carrito.reduce((currentTotal, item) => item.subtotal + currentTotal, 0)
        alert("El valor total de la compra es de $" + totalCarrito)

    } else { ingresarProductos() }

}

ingresarProductos()




