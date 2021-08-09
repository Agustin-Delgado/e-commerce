const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let itemSeleccionado
let cantidadSeleccionada
$("#cartCounter").html(JSON.parse(localStorage.getItem('cartCounter')))
localStorage.setItem('carrito', JSON.stringify(carrito))


class producto {
    constructor(identificador, nombre, precio, categoria, descripcion, destacado, stock, cantidad, img) {
        this.identificador = identificador;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.destacado = destacado;
        this.stock = stock;
        this.cantidad = cantidad;
        this.img = img;
    }
}

$(document).ready(function () {

    $.each(productos, function (i) {

        let listaDeProductos = $(`
        <div class="productos__row-card">

            <h2 class="productos__row-card-title">${productos[i].nombre}</h2>
            <img class="productos__row-card-img" src="${productos[i].img}" alt="">
            <span class="productos__row-card-price">$${productos[i].precio}</span>
            <p class="productos__row-card-description">${productos[i].descripcion}
            </p>

            <div class="productos__row-card-buy">

                <a id="buyButton" class="productos__row-card-buy-link">Comprar</a>

                <svg id="${productos[i].identificador}" class="bi bi-cart3" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div id="${productos[i].nombre}" class="productos__row-card-buy-quantity"></div>

            </div>


        </div>`)

        $('.productos__row').append(listaDeProductos)
        
    })

    $(document).on("click", ".bi-cart3", function (event) {

        let itemId = event.target.id

        itemSeleccionado = productos.find(p => p.identificador === itemId)

        $(".productos__row-card-buy-quantity").empty()

        seleccionarCantidad(itemSeleccionado)

    })

    function seleccionarCantidad(itemSeleccionado) {

        let quantityCounter =

            `<h3 class="productos__row-card-buy-quantity-title">Cantidad</h3>
    
        <div class="productos__row-card-buy-quantity-selector">
    
            <svg id="restar" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
    
            <input id="cantidad" type="number" value="0" min="0" disabled>
    
            <svg id="sumar" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
    
        </div>
    
        <a id="aplicar" class="productos__row-card-buy-quantity-apply">Aplicar</a>

        <div class="productos__row-card-buy-quantity-error">

            <svg class="productos__row-card-buy-quantity-error-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
            <path d="M6.002 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm.195-12.01a1.81 1.81 0 1 1 3.602 0l-.701 7.015a1.105 1.105 0 0 1-2.2 0l-.7-7.015z"/>
            </svg>
            <span class="productos__row-card-buy-quantity-error-text">Stock insuficiente</span>

        </div>
    `
        $(document.getElementById(itemSeleccionado.nombre)).append(quantityCounter)
        console.log(document.getElementById(itemSeleccionado.nombre))
        verificarCantidad()
    }

    function verificarCantidad() {

        let value = 1
        $("#cantidad").val(1)

        $("#sumar").click(function () {
            ++value
            $("#cantidad").val(value)
        })

        $("#restar").click(function () {

            if ($("#cantidad").val() > 1) {
                --value
                $("#cantidad").val(value)
            } else { $("#cantidad").val(1) }
        })

        $("#aplicar").click(function () {
            revisarStock(value)
        })
    }

    function revisarStock(value) {

        cantidadSeleccionada = value
        itemSeleccionado.stock = itemSeleccionado.stock - cantidadSeleccionada

        if (itemSeleccionado.stock < 0) {

            $(".productos__row-card-buy-quantity-error").fadeIn().delay(1500)
            itemSeleccionado.stock = itemSeleccionado.stock + cantidadSeleccionada

        } else {

            console.log(itemSeleccionado.stock)
            agregarItem()
        }
    }


    function agregarItem() {

        carrito.push(new producto(itemSeleccionado.identificador, itemSeleccionado.nombre, itemSeleccionado.precio, itemSeleccionado.categoria, itemSeleccionado.descripcion, itemSeleccionado.destacado, itemSeleccionado.stock, cantidadSeleccionada, itemSeleccionado.img))
        localStorage.setItem('cartCounter', carrito.length)
        toastItemAgregado()
    }

    function toastItemAgregado() {

        $("#productoAñadido").fadeIn().delay(1500).fadeOut()
        $(".productos__row-card-buy-quantity").empty()
        saveStorage()
    }

    function saveStorage(){

        localStorage.setItem('carrito', JSON.stringify(carrito))
        $("#cartCounter").html(JSON.parse(localStorage.getItem('cartCounter')))
    }
})