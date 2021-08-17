const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let itemSeleccionado
let cantidadSeleccionada
let monedaSeleccionada
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

                <a class="productos__row-card-buy-link">Comprar</a>

                <svg id="${productos[i].identificador}" class="bi bi-cart3" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div id="${productos[i].nombre}" class="productos__row-card-buy-quantity"></div>

            </div>


        </div>`)

        $('.productos__row').append(listaDeProductos)
        
    })

    $('form').submit( (e) => { 
        

        let inputDeUsuario = e.target[0].value
        let iputEnMayuscula = inputDeUsuario.toUpperCase()

        $('.productos__row-card').remove();

        for (const iterator of productos) {
            let productoEnMayuscula = iterator.nombre.toUpperCase()
            if (productoEnMayuscula.indexOf(iputEnMayuscula) > -1) {

                let listaDeProductosBasica = $(`
                <div class="productos__row-card">
        
                    <h2 class="productos__row-card-title">${iterator.nombre}</h2>
                    <img class="productos__row-card-img" src="${iterator.img}" alt="">
                    <span class="productos__row-card-price">$${iterator.precio}</span>
                    <p class="productos__row-card-description">${iterator.descripcion}
                    </p>
        
                    <div class="productos__row-card-buy">
        
                        <a class="productos__row-card-buy-link">Comprar</a>
        
                        <svg id="${iterator.identificador}" class="bi bi-cart3" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div id="${iterator.nombre}" class="productos__row-card-buy-quantity"></div>
        
                    </div>
        
                </div>`)
        
                $('.productos__row').append(listaDeProductosBasica)
            } 
        }
        
    });

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

    $('.productos__row-card-buy-link').on('click', function(){

        let checkout = $(`
        
        <h1 class="checkout-title">Checkout</h1>

        <div class="checkout__contain">

            <div class="checkout__contain-payment">

                <h2 class="checkout__contain-payment-title">Ingresá tus datos</h2>

                <form class="checkout__contain-payment-form" action="">

                    <div class="checkout__contain-payment-form-contain">

                        <input class="checkout__contain-payment-form-contain-input" type="text" placeholder="Nombre"
                            name="">

                    </div>

                    <div class="checkout__contain-payment-form-contain">

                        <input class="checkout__contain-payment-form-contain-input" type="text" placeholder="Apellido"
                            name="">

                    </div>

                    <div class="checkout__contain-payment-form-contain">

                        <input class="checkout__contain-payment-form-contain-input" type="tel" placeholder="Telefono"
                            name="">

                    </div>

                    <div class="checkout__contain-payment-form-contain">

                        <input class="checkout__contain-payment-form-contain-input" type="email"
                            placeholder="Correo electrónico" name="">

                    </div>


                    <div class="checkout__contain-payment-form-contain">

                        <input class="checkout__contain-payment-form-contain-input" type="tel" placeholder="DNI" name=""
                        >

                    </div>

                </form>

                <form class="checkout__contain-payment-form-two" action="">

                    <div class="checkout__contain-payment-form-two-contain">

                        <input class="checkout__contain-payment-form-two-contain-input" type="text"
                            placeholder="Numero de tarjeta" name="">

                    </div>

                    <div class="checkout__contain-payment-form-two-contain">

                        <input class="checkout__contain-payment-form-two-contain-input" type="text"
                            placeholder="Nombre y apellido" name="">

                    </div>

                    <div class="checkout__contain-payment-form-two-contain">

                    <input placeholder="Fecha de vencimiento" class="checkout__contain-payment-form-two-contain-input" type="text" onfocus="(this.type='date')" onblur="(this.type='text')"/>

                    </div>

                    <div class="checkout__contain-payment-form-two-contain">

                        <input class="checkout__contain-payment-form-two-contain-input" type="text"
                            placeholder="Codigo de seguridad" name="">

                    </div>


                    <div class="checkout__contain-payment-form-two-contain">

                        <input class="checkout__contain-payment-form-two-contain-input" type="tel"
                            placeholder="DNI del titular de la tarjeta" name="">

                    </div>

                </form>

                <div class="checkout__contain-payment-button">

                    <a id="nextButton" class="checkout__contain-payment-button-next">Siguiente</a>
                    <a id="backButton" class="checkout__contain-payment-button-back"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>Volver</a>

                </div>

            </div>

            <div class="checkout__contain-details">

          <h2 class="checkout__contain-details-title">Detalle de la compra</h2>
          
          <div class="checkout__contain-details-total">

            <span class="checkout__contain-details-total-currency">Moneda
            
            <div class="button r" id="button-3">
            <input type="checkbox" class="checkbox">
            <div class="knobs"></div>
            <div class="layer"></div>
          </div>
            
            </span>

          </div>

      </div>

        </div>
        `)

        itemSeleccionado = productos.find(p => p.identificador === $(this).closest(".productos__row-card-buy").find('svg').attr('id'))

        $(".productos").html("")
        $(".productos").append(checkout)
        $(".productos").toggleClass("carrito checkout")

        let checkoutItems = $(`
          
          <div class="checkout__contain-details-content">
              <img class="checkout__contain-details-content-img" src="${itemSeleccionado.img}"
              alt="">
              <h3 class="checkout__contain-details-content-title">${itemSeleccionado.nombre}</h3>
              <span class="checkout__contain-details-content-subtotal">Subtotal: $${itemSeleccionado.precio}</span>
          </div >
          `)

        $(checkoutItems).insertAfter(".checkout__contain-details-title")

        let total = itemSeleccionado.precio

        let checkoutTotal = $(`<h3 class="checkout__contain-details-total-title">Total: $${total}</h3>`)

        $(checkoutTotal).insertAfter(".checkout__contain-details-total-currency")
        let pagination

        $("#nextButton").click(function(){

            pagination = 1

            $(".checkout__contain-payment-form").slideUp(300).fadeOut(400)
            $(".checkout__contain-payment-form-two").slideDown(300).fadeIn(400)

            pagNum(pagination)

        })

        $("#backButton").click(function(){

            pagination = 0

            $(".checkout__contain-payment-form-two").slideUp(300).fadeOut(400)
            $(".checkout__contain-payment-form").slideDown(300).fadeIn(400)

            pagNum(pagination)
        })

        function pagNum(pagination){

            if(pagination == 1){
                    
                $(".checkout__contain-payment-button-next").text("Terminar compra")
                $(".checkout__contain-payment-title").text("Ingresá los datos de la tarjeta")
                $(".checkout__contain-payment-button-next").css("background-position","right center")
            }else{
                $(".checkout__contain-payment-button-next").text("Siguiente")
                $(".checkout__contain-payment-title").text("Ingresá tus datos")
                $(".checkout__contain-payment-button-next").css("background-position","left center")
            }
        }

        let moneda = "Dolar Oficial"
        monedaSeleccionada = dolar.find(p => p.casa.nombre === moneda)
        let dolarHoy = monedaSeleccionada.casa.venta
  
        $("#button-3").click(function () {
  
          if ($('.checkbox').prop('checked')) {
  
            total = total / parseInt(dolarHoy)
  
            $(".checkout__contain-details-total-title").html("")
            checkoutTotal = $(`<h3 class="checkout__contain-details-total-title">Total: $${parseInt(total)}</h3>`)
            $(checkoutTotal).insertAfter(".checkout__contain-details-total-currency")
  
          } else {
  
            total = total * parseInt(dolarHoy)
            $(".checkout__contain-details-total-title").html("")
            checkoutTotal = $(`<h3 class="checkout__contain-details-total-title">Total: $${parseInt(total)}</h3>`)
            $(checkoutTotal).insertAfter(".checkout__contain-details-total-currency")
          }
  
        })

    })
})