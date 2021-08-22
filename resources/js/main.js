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

    $('form').submit((e) => {

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

    function saveStorage() {

        localStorage.setItem('carrito', JSON.stringify(carrito))
        $("#cartCounter").html(JSON.parse(localStorage.getItem('cartCounter')))
    }

    $(document).on("click", ".productos__row-card-buy-link", function() {

        let checkout = $(`
        
        <h1 class="checkout-title">Checkout</h1>

        <div class="checkout__contain">

            <div class="checkout__contain-content">

            <div class="checkout__contain-content-card">

                <div class="checkout__contain-content-card-flip">

                    <div class="checkout__contain-content-card-flip-front">

                        <div class="checkout__contain-content-card-flip-front-chip"></div>

                        <div class="checkout__contain-content-card-flip-front-logo">

                            <svg version="1.1" id="visa" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="47.834px"
                                height="47.834px" viewBox="0 0 47.834 47.834"
                                style="enable-background:new 0 0 47.834 47.834;">
                                <g>
                                    <g>
                                        <path d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                                c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                                c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,3.406,0.901,4.119H39.893z
                                M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                                c1.277,0.532,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                                c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                                l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                                C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                                C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                                c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                                h-3.888L19.153,16.8z" />
                                    </g>
                                </g>
                            </svg>

                        </div>

                        <div class="checkout__contain-content-card-flip-front-number"></div>

                        <div class="checkout__contain-content-card-flip-front-holder">

                            <label>Nombre y apellido</label>

                            <div></div>

                        </div>

                        <div class="checkout__contain-content-card-flip-front-expiration">

                            <label>Fecha de expiración</label>

                            <div></div>

                        </div>

                    </div>

                    <div class="checkout__contain-content-card-flip-back">

                        <div class="checkout__contain-content-card-flip-back-strip"></div>

                        <div class="checkout__contain-content-card-flip-back-logo">

                            <svg version="1.1" id="visa" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="47.834px"
                                height="47.834px" viewBox="0 0 47.834 47.834"
                                style="enable-background:new 0 0 47.834 47.834;">
                                <g>
                                    <g>
                                        <path d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                                c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                                c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,3.406,0.901,4.119H39.893z
                                M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                                c1.277,0.532,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                                c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                                l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                                C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                                C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                                c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                                h-3.888L19.153,16.8z" />
                                    </g>
                                </g>
                            </svg>

                        </div>

                        <div class="checkout__contain-content-card-flip-back-ccv">

                            <label>Código de seguridad</label>

                            <div></div>

                        </div>

                    </div>

                </div>

            </div>

            <div class="checkout__contain-content-dni">

                <div class="checkout__contain-content-dni-flip">

                    <div class="checkout__contain-content-dni-flip-front">

                        <div class="checkout__contain-content-dni-flip-front-chip"></div>

                        <div class="checkout__contain-content-dni-flip-front-holder">

                            <label>Nombre y apellido</label>

                            <div></div>

                        </div>

                        <div class="checkout__contain-content-dni-flip-front-expiration">

                            <label>Numero de documento</label>

                            <div></div>

                        </div>

                    </div>

                </div>

            </div>

            <form class="checkout__contain-content-form">

                <fieldset>

                    <label for="card-number">Número de tarjeta</label>
                    <input type="num" id="card-number" class="input-cart-number" maxlength="4" />
                    <input type="num" id="card-number-1" class="input-cart-number" maxlength="4" />
                    <input type="num" id="card-number-2" class="input-cart-number" maxlength="4" />
                    <input type="num" id="card-number-3" class="input-cart-number" maxlength="4" />

                </fieldset>

                <fieldset>

                    <label for="card-holder">Nombre y apellido del titular</label>
                    <input type="text" id="card-holder" />

                </fieldset>

                <fieldset class="fieldset-expiration">

                    <label for="card-expiration-month">Fecha de expiración</label>

                    <div class="select">

                        <select id="card-expiration-month">

                            <option></option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>

                        </select>

                    </div>

                    <div class="select">

                        <select id="card-expiration-year">

                            <option></option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                            <option>2029</option>
                            <option>2030</option>
                            <option>2031</option>

                        </select>

                    </div>

                </fieldset>

                <fieldset class="fieldset-ccv">

                    <label for="card-ccv">CVV</label>
                    <input type="text" id="card-ccv" maxlength="3" />

                </fieldset>

            </form>

            <form class="checkout__contain-content-form-two">

                <div class="double-fieldset">

                    <fieldset>

                        <label>Número de documento</label>
                        <input type="num" class="input-dni-number" maxlength="10"/>

                    </fieldset>

                    <fieldset>

                        <label for="">Numero de telefono</label>
                        <input type="text" name="">

                    </fieldset>

                </div>

                <fieldset>

                    <label for="">Correo electronico</label>
                    <input type="text" name="">

                </fieldset>

            </form>

            <div class="checkout__contain-content-button">

                <a id="nextButton" class="checkout__contain-content-button-next">Siguiente</a>
                <a id="backButton" class="checkout__contain-content-button-back"><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z">
                        </path>
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

        $(".checkout__contain-content-dni").hide()
        $(".checkout__contain-content-form-two").hide()

        $("#nextButton").click(function () {

            pagination = 1

            $(".checkout__contain-content-card").slideUp(300).fadeOut(400)
            $(".checkout__contain-content-dni").slideDown(300).fadeIn(400)

            $(".checkout__contain-content-form-two").slideDown(300).fadeIn(400)

            pagNum(pagination)

        })

        $("#backButton").click(function () {

            pagination = 0

            $(".checkout__contain-content-dni").slideUp(300).fadeOut(400)
            $(".checkout__contain-content-card").slideDown(300).fadeIn(400)

            $(".checkout__contain-content-form-two").slideUp(300).fadeOut(400)

            pagNum(pagination)
        })

        function pagNum(pagination) {

            if (pagination == 1) {

                $(".checkout__contain-content-button-next").text("Terminar compra")
                $(".checkout__contain-content-button-next").css("background-position", "right center")
            } else {
                $(".checkout__contain-content-button-next").text("Siguiente")
                $(".checkout__contain-content-button-next").css("background-position", "left center")
            }
        }

        $('body').on('input', ".input-cart-number", function () {

            let cardNumber = ''

            $('.input-cart-number').each(function () {

                cardNumber += $(this).val() + ' '

                if ($(this).val().length === 4) {

                    $(this).next().focus()

                    $(".checkout__contain-content-card-flip-front-number").html(cardNumber)

                } else {

                    $(".checkout__contain-content-card-flip-front-number").html(cardNumber)
                }
            })
        })

        $('body').on('input', ".input-dni-number", function () {

            let dniNumber = ''

            $('.input-dni-number').each(function () {

                dniNumber += $(this).val()

                if ($(this).val().length == 2) {

                    dniNumber = dniNumber + "."
                    $(".checkout__contain-content-dni-flip-front-expiration div").html(dniNumber)
                    $('.input-dni-number').val($(".checkout__contain-content-dni-flip-front-expiration div").html())

                } else if ($(this).val().length == 6) {

                    dniNumber = dniNumber + "."
                    $(".checkout__contain-content-dni-flip-front-expiration div").html(dniNumber)
                    $('.input-dni-number').val($(".checkout__contain-content-dni-flip-front-expiration div").html())

                } else {
                    $(".checkout__contain-content-dni-flip-front-expiration div").html(dniNumber)
                }
            })
        })

        $('body').on('input', "#card-holder", function () {

            if ($(this).val().length >= 34) {

                $('.checkout__contain-content-card .checkout__contain-content-card-flip-front-holder div').html()

            } else {

                $('.checkout__contain-content-card .checkout__contain-content-card-flip-front-holder div').html($(this).val())
                $('.checkout__contain-content-dni-flip-front-holder div').html($(this).val())
            }
        })

        $('body').on('change', "#card-expiration-month, #card-expiration-year", function () {

            m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'))
            m = (m < 10) ? '0' + m : m
            y = $('#card-expiration-year').val()

            $('.checkout__contain-content-card-flip-front-expiration div').html(m + '/' + y)

        })

        $('#card-ccv').on('focus', function () {

            $('.checkout__contain-content-card').addClass('hover')
        }).on('blur', function () {

            $('.checkout__contain-content-card').removeClass('hover')
        }).on('keyup change', function () {

            $('.checkout__contain-content-card-flip-back-ccv div').html($(this).val())
        })

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