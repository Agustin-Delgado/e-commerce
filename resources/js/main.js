
/* Variables globales */

let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let checkoutProducts = []
let itemSeleccionado
let cantidadSeleccionada = 1
let monedaSeleccionada
let total
let twoClickDetect = 0

/* Declaraciones iniciales de la app */

$("#cartCounter").html(JSON.parse(localStorage.getItem('cartCounter')))
localStorage.setItem('carrito', JSON.stringify(carrito))
localStorage.setItem('favoritos', JSON.stringify(favoritos))

class producto {
    constructor(identificador, nombre, precio, categoria, descripcion, favoritos, stock, cantidad, img) {
        this.identificador = identificador
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
        this.descripcion = descripcion
        this.favoritos = favoritos
        this.stock = stock
        this.cantidad = cantidad
        this.img = img
    }
}

/* Secciones de HTML */

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
                                style="enable-background:new 0 0 47.834 47.834">
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
                                style="enable-background:new 0 0 47.834 47.834">
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
                        <input id="dni-number" type="num" class="input-dni-number" maxlength="10"/>
                        </fieldset>
                        <fieldset>
                        <label for="">Numero de telefono</label>
                        <input id="tel-number" type="text" name="">
                        </fieldset>
                    </div>
                    <fieldset>
                        <label for="">Correo electronico</label>
                        <input id="email-text" type="text" name="">
                    </fieldset>
                </form>
                <div class="checkout__contain-content-button">
                    <a id="nextButton" class="checkout__contain-content-button-next">Siguiente</a>

                    <div id="formError">

                        <svg class="productos__row-card-buy-quantity-container-error-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
                            <path d="M6.002 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm.195-12.01a1.81 1.81 0 1 1 3.602 0l-.701 7.015a1.105 1.105 0 0 1-2.2 0l-.7-7.015z"/>
                        </svg>
                        <span class="productos__row-card-buy-quantity-container-error-text">Verificar datos</span>

                    </div>

                    <a id="backButton" class="checkout__contain-content-button-back">
                        <svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z">
                        </path>
                        </svg>
                        Volver
                    </a>
                </div>
            </div>
            <div class="checkout__contain-details">
                <h2 class="checkout__contain-details-title">Detalle de la compra</h2>
                <div class="checkout__contain-details-total">
                    <span class="checkout__contain-details-total-currency">
                        Moneda
                        <div class="button r" id="dolarButton">
                        <input type="checkbox" class="checkbox">
                        <div class="knobs"></div>
                        <div class="layer"></div>
                        </div>
                    </span>
                </div>
            </div>
        </div>

    `)

let carritoEstructura = $(`

        <h1 class="carrito-title">Carrito</h1>
        <div class="carrito__contain">
            <div class="carrito__contain-buy">
                <a href="#/checkout" class="carrito__contain-buy-button">Continuar con la compra</a>
                <h3 id="total" class="carrito__contain-buy-title">Total: $</h3>
            </div>
        </div>
`)

let productosEstructura = $(`

<div class="productos__filter">

<h1 class="productos__filter-title">Productos</h1>

<div class="productos__filter-title-contain">

    <h2 class="productos__filter-title-contain-title">Categorias:</h2>

    <select id="category" class="productos__filter-title-contain-select" name="">

        <option class="productos__filter-title-contain-select-option" value=""></option>
        <option class="productos__filter-title-contain-select-option" value="Tecnologia">Tecnologia</option>
        <option class="productos__filter-title-contain-select-option" value="Accesorios">Accesorios</option>
        <option class="productos__filter-title-contain-select-option" value="Muebles">Muebles</option>
        <option class="productos__filter-title-contain-select-option" value="Herramientas">Herramientas</option>

    </select>

    <h2 class="productos__filter-title-contain-title">Ordenar por:</h2>

    <select id="price" class="productos__filter-title-contain-select">

        <option class="productos__filter-title-contain-select-option" value=""></option>
        <option class="productos__filter-title-contain-select-option" value="Menor precio">Menor precio</option>
        <option class="productos__filter-title-contain-select-option" value="Mayor precio">Mayor precio</option>

    </select>

</div>

</div>

<div id="items" class="productos__row"></div>
`)

$(document).ready(function () {

    /* Inicio de la app */

    $(document).on("click", ".bi-cart3", function (event) {

        let itemId = event.target.id

        itemSeleccionado = productos.find(p => p.identificador === itemId)

        $(".productos__row-card-buy-quantity").empty()

        agregarItem()

    })

    $(document).on("click", ".productos__row-card-buy-link", function () {

        itemSeleccionado = productos.find(p => p.identificador === $(this).closest(".productos__row-card-buy").find('.bi-cart3').attr('id'))

        $(".productos").html("")
        $(".productos").append(checkout)
        $(".checkout__contain-details-content").remove()
        $(".checkout__contain-details-total-title").remove()
        $('.checkbox').prop('checked', false)

        let checkoutItems = $(`
          
          <div class="checkout__contain-details-content">
              <img class="checkout__contain-details-content-img" src="${itemSeleccionado.img}"
              alt="">
              <h3 class="checkout__contain-details-content-title">${itemSeleccionado.nombre}</h3>
              <span class="checkout__contain-details-content-subtotal">Subtotal: $${itemSeleccionado.precio}</span>
          </div >
          `)

        $(checkoutItems).insertAfter(".checkout__contain-details-title")

        total = itemSeleccionado.precio
        checkoutProducts.length = 0
        checkoutProducts.push(itemSeleccionado)

        checkoutInit()

    })

    $(document).on("click", ".bi-heart", function () {

        let favId = $(this).get(0).id
        favId = favId.replace("-fav", "")

        itemSeleccionado = productos.find(p => p.identificador === favId)

        if ($($(this).get(0)).hasClass("fillHeart")) {

            let notFillHeart = $(`
          
            <svg id="${itemSeleccionado.identificador}-fav" class="bi-heart notFillHeart" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path id="${itemSeleccionado.identificador}-fav" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            `)

            $($(this).get(0)).replaceWith(notFillHeart)
            itemSeleccionado.favoritos = false
            const index = favoritos.findIndex(p => p.identificador === favId)
            favoritos.splice(index, 1)
            localStorage.setItem('favoritos', JSON.stringify(favoritos))

        } else {

            let fillHeart = $(`
          
            <svg id="${itemSeleccionado.identificador}-fav" class="bi-heart fillHeart" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path id="${itemSeleccionado.identificador}-fav" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
            `)

            $($(this).get(0)).replaceWith(fillHeart)
            itemSeleccionado.favoritos = true
            favoritos.push(new producto(itemSeleccionado.identificador, itemSeleccionado.nombre, itemSeleccionado.precio, itemSeleccionado.categoria, itemSeleccionado.descripcion, itemSeleccionado.favoritos, itemSeleccionado.stock, cantidadSeleccionada, itemSeleccionado.img))
            localStorage.setItem('favoritos', JSON.stringify(favoritos))
        }
    })

    /* Inicio seccion carrito */

    $(document).on("click", "#cart", function () {

        cartInit()

    })

    /* Buscador de productos */

    $('form').submit((e) => {

        let inputDeUsuario = e.target[0].value

        if(inputDeUsuario == ""){

            location.reload()

        } else {

            let iputEnMayuscula = inputDeUsuario.toUpperCase()
            $(".carrito").empty()
            $(".productos").empty()
            $(".carrito").toggleClass("carrito productos");
            $(".productos").append(productosEstructura)
            $('.productos__row-card').remove()

            for (const iterator of productos) {
                let productoEnMayuscula = iterator.nombre.toUpperCase()
                if (productoEnMayuscula.indexOf(iputEnMayuscula) > -1) {

                    estructuraProductos(iterator)

                    $.each(JSON.parse(localStorage.getItem("favoritos")), function (i) {

                        productos[i].favoritos = true
                        
                        let fillHeart = $(`
                    
                        <svg id="${favoritos[i].identificador}-fav" class="bi-heart fillHeart" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path id="${favoritos[i].identificador}-fav" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                        `)
        
                        $(document.getElementById(favoritos[i].identificador + '-fav')).replaceWith(fillHeart)
                    })
                }
            }
        }
    })

    /* Filtro por categoria */

    $('#category').change(function () {

        let categoriaSeleccionada = $(this).find("option:selected").attr('value')
        $('.productos__row-card').remove()

        for (const iterator of productos) {

            let productoEnMayuscula = iterator.categoria
            if (productoEnMayuscula.indexOf(categoriaSeleccionada.toUpperCase()) > -1) {

                estructuraProductos(iterator)
            }
        }
    })

    /* Filtro por precio */

    $('#price').change(function () {

        let ordenSeleccionado = $(this).find("option:selected").attr('value')
        $('.productos__row-card').remove()

        if (ordenSeleccionado == "Menor precio") {

            productos.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio))

            for (const iterator of productos) {

                estructuraProductos(iterator)
            }

        } else if (ordenSeleccionado == "Mayor precio") {

            productos.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio))

            for (const iterator of productos) {

                estructuraProductos(iterator)
            }

        } else {

            productos.sort((a, b) => parseFloat(a.identificador) - parseFloat(b.identificador))

            for (const iterator of productos) {

                estructuraProductos(iterator)
            }
        }
    })

    /* Favoritos header */

    $("#favs").on('mouseenter', function () {

        $(".header__nav-list-link-favoritos").fadeIn(50)

        let storage = JSON.parse(localStorage.getItem("favoritos"))

        if (storage.length === 0) {

            let favoritosVacio = $(`

                <div class="header__nav-list-link-favoritos-empty">

                    <h2 class="header__nav-list-link-favoritos-empty-title">Aún no hay productos en guardados
                        en favoritos</h2>
                    <p class="header__nav-list-link-favoritos-empty-text">Sigue explorando para encontrar tu
                        proxima compra!</p>

                </div>

            `)

            $('.header__nav-list-link-favoritos').append(favoritosVacio)

        }
        else {

            $.each(storage, function (i) {

                let favoritosEstructura = $(`

                <div class="header__nav-list-link-favoritos-contains">

                    <img class="header__nav-list-link-favoritos-contains-img" src="${storage[i].img}" alt="">

                        <div class="header__nav-list-link-favoritos-contains-text">

                            <h3 class="header__nav-list-link-favoritos-contains-text-title">${storage[i].nombre}</h3>
                            <span class="header__nav-list-link-favoritos-contains-text-price">$${storage[i].precio}</span>

                        </div>

                    <div class="header__nav-list-link-favoritos-contains-options">

                        <a id="${storage[i].identificador}-delfav" class="header__nav-list-link-favoritos-contains-options-delete">Eliminar</a>
                        <a id="${storage[i].identificador}-buyfav" class="header__nav-list-link-favoritos-contains-options-buy">Comprar</a>
                        <svg id="${storage[i].identificador}-cartfav" class="header__nav-list-link-favoritos-contains-options-addcart" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path id="${storage[i].identificador}-cartfav"
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>

                    </div>

                </div>

                `)

                $('.header__nav-list-link-favoritos').append(favoritosEstructura)
            })
        }

        $(".header__nav-list-link-favoritos-contains-options-delete").on('click', function (event) {

            let favId = event.target.id
            favId = favId.replace("-delfav", "")
            const index = favoritos.findIndex(p => p.identificador === favId)
            favoritos.splice(index, 1)
            localStorage.setItem('favoritos', JSON.stringify(favoritos))
            location.reload()
        })

        $(".header__nav-list-link-favoritos-contains-options-buy").on('click', function (event) {

            let favId = event.target.id
            favId = favId.replace("-buyfav", "")
            itemSeleccionado = storage.find(p => p.identificador === favId)

            $(".productos").empty()
            $(".productos").append(checkout)
            $(".carrito").empty()
            $(".carrito").append(checkout)
            $(".checkout__contain-details-content").remove()
            $(".checkout__contain-details-total-title").remove()
            $('.checkbox').prop('checked', false)

            let checkoutItems = $(`
              
              <div class="checkout__contain-details-content">
                  <img class="checkout__contain-details-content-img" src="${itemSeleccionado.img}"
                  alt="">
                  <h3 class="checkout__contain-details-content-title">${itemSeleccionado.nombre}</h3>
                  <span class="checkout__contain-details-content-subtotal">Subtotal: $${itemSeleccionado.precio}</span>
              </div >
              `)

            $(checkoutItems).insertAfter(".checkout__contain-details-title")

            total = itemSeleccionado.precio
            checkoutProducts.length = 0
            checkoutProducts.push(itemSeleccionado)

            checkoutInit()
        })

        $(".header__nav-list-link-favoritos-contains-options-addcart").on('click', function (event) {

            let favId = event.target.id
            favId = favId.replace("-cartfav", "")
            itemSeleccionado = storage.find(p => p.identificador === favId)

            $(".productos__row-card-buy-quantity").empty()

            agregarItem()

        })
    })


    $("#favs").on('mouseleave', function () {

        $(".header__nav-list-link-favoritos").fadeOut(50)
        $(".header__nav-list-link-favoritos").empty()

    })

    /* Funciones */

    function cambiarCantidad(itemSeleccionado) {

        if (isNaN(itemSeleccionado.stock)) { itemSeleccionado.stock = 10 }

        itemSeleccionado.stock = itemSeleccionado.stock - itemSeleccionado.cantidad

        if (itemSeleccionado.stock < 0 || isNaN(itemSeleccionado.stock)) {

            let cartId = event.target.id
            cartId = cartId.replace("-apply", "")

            $(document.getElementById(cartId + "-error")).fadeIn().delay(1500)

            itemSeleccionado.stock = itemSeleccionado.stock + itemSeleccionado.cantidad
        }
        else {

            cartInit()
        }
    }

    function agregarItem() {

        if (carrito.find(p => p.identificador === itemSeleccionado.identificador)) {
            const i = carrito.findIndex(p => p.identificador === itemSeleccionado.identificador)
            carrito[i].cantidad = carrito[i].cantidad + 1
            JSON.parse(localStorage.getItem('carrito'))
            toastItemAgregado()
        }
        else {
            console.log(false)
            carrito.push(new producto(itemSeleccionado.identificador, itemSeleccionado.nombre, itemSeleccionado.precio, itemSeleccionado.categoria, itemSeleccionado.descripcion, itemSeleccionado.favoritos, itemSeleccionado.stock, cantidadSeleccionada, itemSeleccionado.img))
            localStorage.setItem('cartCounter', carrito.length)
            toastItemAgregado()
        }
    }

    function estructuraProductos(iterator){

        let listaDeProductosBasica = $(`

                <div class="productos__row-card">
            
                <h2 class="productos__row-card-title">${iterator.nombre}</h2>
                <img class="productos__row-card-img" src="${iterator.img}" alt="">
                <span class="productos__row-card-price">$${iterator.precio}</span>
                <p class="productos__row-card-description">${iterator.descripcion}
                </p>
        
                <div class="productos__row-card-buy">

                    <svg id="${iterator.identificador}-fav" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-heart notFillHeart" viewBox="0 0 16 16">
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
        
                    <a class="productos__row-card-buy-link" href="#/checkout">Comprar</a>
        
                    <svg id="${iterator.identificador}" class="bi bi-cart3" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path
                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <div id="${iterator.nombre}" class="productos__row-card-buy-quantity"></div>
        
                </div>
        
            </div>`)

                $('.productos__row').append(listaDeProductosBasica)

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

    function cartInit() {

        $(".carrito__contain-table").remove()
        $(".productos").toggleClass("productos carrito");
        $(".carrito").empty()
        $(".carrito").append(carritoEstructura)

        if (carrito.length == 0) {

            let emptyCart = $(`
                        
            <div class="carrito__contain-table">
        
              <h2 class="carrito__contain-table-title">Tu carrito está vacío</h2>
              <p class="carrito__contain-table-subtitle">¿No sabés qué comprar? ¡Miles de productos te esperan!</p>
        
            </div>`)

            $(".carrito__contain-buy").css("display", "none")
            $(".carrito__contain").append(emptyCart)
            $(".carrito__contain-table").css("flex-direction", "column")
            $(".carrito__contain-table").css("padding", "50px 0")
            $(".carrito__contain-table-title").css("font-size", "2rem")
            $(".carrito__contain-table-title").css("max-width", "100%")
            $(".carrito__contain-table-title").css("margin-bottom", "30px")


        } else {

            $(".carrito__contain-table").remove()
            $(".carrito__contain-buy").css("display", "flex")
            let storage = JSON.parse(localStorage.getItem('carrito'))

            $.each(storage, function (i) {

                let addToCart = $(`
                        
                <div id="${storage[i].nombre}" class="carrito__contain-table">
        
                    <img class="carrito__contain-table-img" src="${storage[i].img}" alt="">
                    <h2 class="carrito__contain-table-title">${storage[i].nombre}</h2>

                    <div class="productos__row-card-buy-quantity-container">

                        <div class="productos__row-card-buy-quantity-container-selector">

                            <svg id="${storage[i].identificador}-sub" class="productos__row-card-buy-quantity-container-selector-substract" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                <path id="${storage[i].identificador}-sub" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path id="${storage[i].identificador}-sub" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                            </svg>
                            <input id="${storage[i].identificador}-quantity" type="number" value="${storage[i].cantidad}" min="1" disabled>
                            <svg id="${storage[i].identificador}-add" class="productos__row-card-buy-quantity-container-selector-add" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path id="${storage[i].identificador}-add" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path id="${storage[i].identificador}-add"
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>

                        </div>

                            <a id="${storage[i].identificador}-apply" class="productos__row-card-buy-quantity-container-apply">Aplicar</a>

                        </div>

                    <div id="${storage[i].identificador}-error" class="productos__row-card-buy-quantity-container-error">

                        <svg class="productos__row-card-buy-quantity-container-error-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
                            <path d="M6.002 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm.195-12.01a1.81 1.81 0 1 1 3.602 0l-.701 7.015a1.105 1.105 0 0 1-2.2 0l-.7-7.015z"/>
                        </svg>
                        <span class="productos__row-card-buy-quantity-container-error-text">Stock insuficiente</span>

                    </div>

                    <span class="carrito__contain-table-price">$${storage[i].precio * storage[i].cantidad}</span>
                    <svg id="${storage[i].identificador}" class="carrito__contain-table-x" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path id="${storage[i].nombre}"  class="carrito__contain-table-x" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>

                    <div class="carrito__contain-table-loader"></div>
        
                </div>`)

                $(".carrito__contain").append(addToCart)
            })

            $(".productos__row-card-buy-quantity-container-selector-add").click(function (event) {

                let cartId = event.target.id
                cartId = cartId.replace("-add", "")
                itemSeleccionado = storage.find(p => p.identificador === cartId)
                $(document.getElementById(itemSeleccionado.identificador + "-quantity")).val(++itemSeleccionado.cantidad)
                JSON.parse(localStorage.getItem('carrito'))
            })

            $(".productos__row-card-buy-quantity-container-selector-substract").click(function (event) {

                let cartId = event.target.id
                cartId = cartId.replace("-sub", "")
                itemSeleccionado = storage.find(p => p.identificador === cartId)

                if ($(document.getElementById(itemSeleccionado.identificador + "-quantity")).val() > 1) {

                    $(document.getElementById(itemSeleccionado.identificador + "-quantity")).val(--itemSeleccionado.cantidad)
                    JSON.parse(localStorage.getItem('carrito'))
                } else {
                    $(document.getElementById(itemSeleccionado.identificador + "-quantity")).val(1)
                }
            })

            $(".productos__row-card-buy-quantity-container-apply").click(function (event) {

                let cartId = event.target.id
                cartId = cartId.replace("-apply", "")
                const i = carrito.findIndex(p => p.identificador === cartId)
                carrito[i].cantidad = itemSeleccionado.cantidad
                localStorage.setItem('carrito', JSON.stringify(carrito))
                cambiarCantidad(itemSeleccionado)
            })

            calcularTotal()

            $(document).on("click", ".carrito__contain-table-x", function (event) {

                let itemId = event.target.id
                itemSeleccionado = storage.find(p => p.identificador === itemId)

                Swal.fire({
                    title: 'Un minuto!',
                    text: "Se eliminara " + itemSeleccionado.nombre + " del carrito",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#4aabff',
                    cancelButtonColor: '#dc3545',
                    confirmButtonText: 'Si, eliminar!',
                    cancelButtonText: 'Cancelar'

                }).then((result) => {

                    if (result.isConfirmed) {
                        const index = storage.findIndex(carrito => carrito === itemSeleccionado)
                        storage.splice(index, 1)
                        carrito.splice(index, 1)
                        localStorage.setItem('carrito', JSON.stringify(storage))
                        $(document.getElementById(itemSeleccionado.nombre)).remove()

                        let cartCounter = $("#cartCounter").text() - 1

                        if ($("#cartCounter").text() - 1 === 0) {

                            carrito.length = 0
                            localStorage.setItem('carrito', JSON.stringify(storage))
                            localStorage.setItem('cartCounter', cartCounter)
                            location.reload()

                        } else {

                            localStorage.setItem('cartCounter', cartCounter)
                            $("#cartCounter").html(JSON.parse(localStorage.getItem('cartCounter')))

                        }
                        Swal.fire({
                            title: 'Eliminado!',
                            text: "El producto fue eliminado del carrito",
                            icon: 'success',
                            confirmButtonColor: '#4aabff',
                            confirmButtonText: 'Elegir otro producto',
                        })

                        calcularTotal()
                    }
                })
            })

            function calcularTotal() {

                total = storage.reduce((sum, value) => (sum + (value.precio * value.cantidad)), 0)
                $("#total").text("Total: $" + total)
            }

            $(".carrito__contain-buy-button").click(function () {

                $(".carrito").html("")
                $(".carrito").append(checkout)
                $(".checkout__contain-details-content").remove()
                $(".checkout__contain-details-total-title").remove()
                storage = JSON.parse(localStorage.getItem('carrito'))
                $('.checkbox').prop('checked', false)

                $.each(storage, function (i) {

                    let checkoutItems = $(`
                      
                      <div class="checkout__contain-details-content">
                          <img class="checkout__contain-details-content-img" src="${storage[i].img}"
                          alt="">
                          <h3 class="checkout__contain-details-content-title">${storage[i].nombre}</h3>
                          <span class="checkout__contain-details-content-quantity">Cantidad: ${storage[i].cantidad}</span>
                          <span class="checkout__contain-details-content-subtotal">Subtotal: $${storage[i].precio * storage[i].cantidad}</span>
                      </div >
                      `)

                    $(checkoutItems).insertAfter(".checkout__contain-details-title")

                })

                total = storage.reduce((sum, value) => (sum + (value.precio * value.cantidad)), 0)
                checkoutProducts.length = 0
                checkoutProducts = JSON.parse(localStorage.getItem("carrito"))
                checkoutInit()
            })
        }
    }

    function checkoutInit() {

        let checkoutTotal = $(`<h3 class="checkout__contain-details-total-title">Total: $${total}</h3>`)
        let pagination = 0

        pagNum(pagination)

        $(".checkout__contain-content-dni").slideUp(300).fadeOut(400)
        $(".checkout__contain-content-card").slideDown(300).fadeIn(400)
        $(".checkout__contain-content-form-two").slideUp(300).fadeOut(400)

        $(checkoutTotal).insertAfter(".checkout__contain-details-total-currency")

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

                if ($(".checkout__contain-content-button-next").hasClass("finalizarCompra")) {

                    emptyInputCheck()
                }

                $(".checkout__contain-content-button-next").text("Terminar compra")
                $(".checkout__contain-content-button-next").css("background-position", "right center")
                $(".checkout__contain-content-button-next").addClass("finalizarCompra")

            } else {

                $(".checkout__contain-content-button-next").text("Siguiente")
                $(".checkout__contain-content-button-next").css("background-position", "left center")
                $(".checkout__contain-content-button-next").removeClass("finalizarCompra")
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

        monedaSeleccionada = dolar.find(p => p.casa.nombre === "Dolar Oficial")
        let dolarHoy = monedaSeleccionada.casa.venta

        $("#dolarButton").click(function () {

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
    }

    function emptyInputCheck() {

        let a = $("#card-number").val()
        let b = $("#card-number-1").val()
        let c = $("#card-number-2").val()
        let d = $("#card-number-3").val()
        let e = $("#card-holder").val()
        let f = $("#card-expiration-month").val()
        let g = $("#card-expiration-year").val()
        let h = $("#card-ccv").val()
        let i = $("#dni-number").val()
        let j = $("#tel-number").val()
        let k = $("#email-text").val()

        if (a == null || a == "", b == null || b == "", c == null || c == "", d == null || d == "", e == null || e == "", f == null || f == "", g == null || g == "", h == null || h == "", i == null || i == "", j == null || j == "", k == null || k == "") {

            $("#formError").fadeIn().delay(1500)

        }
        else {
            $("#formError").fadeOut().delay(1500)
            finishBuy()
        }
    }

    function finishBuy() {

        let nombre = $("#card-holder").val()
        let email = $("#email-text").val()
        let tel = $("#tel-number").val()
        let creditCardNumber = $("#card-number").val() + $("#card-number-1").val() + $("#card-number-2").val() + $("#card-number-3").val()
        let creditCardCCV = $("#card-ccv").val()
        let creditCardMonth = $("#card-expiration-month").val()
        let credictCardYear = $("#card-expiration-year").val()
        let url = "https://jsonplaceholder.typicode.com/posts"

        // SIMULACIÓN DE AJAX POST

        $.ajax({
            url: url,
            type: 'POST',
            data: {
                nombre: nombre,
                email: email,
                tel: tel,
                creditCardNumber: creditCardNumber,
                creditCardCCV: creditCardCCV,
                creditCardMonth: creditCardMonth,
                credictCardYear: credictCardYear,
                dataProductosComprados: checkoutProducts,
                dataPrecioTotal: total,
            },
            beforeSend: function () {

                $(".carrito").html("")
                $(".productos").html("")
                $('#loader').show()

            },
            success: function (data) {


                let purchased = $(`

                <h1 class="purchased-title">Compra finalizada con éxito!</h1>
            
                <div class="purchased__contain">
            
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-check2"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                    <h2 class="purchased__contain-text">¡Gracias ${data.nombre} por elegirnos!</h2>
            
                    <span class="purchased__contain-email">Corroborá las instrucciones de retiro en tu correo: ${data.email}</span>
            
                    <div class="checkout__contain-details">
            
                        <h2 class="checkout__contain-details-title">Detalle de la compra</h2>

                        <div class="checkout__contain-details-total">
                            </span>
                            <h3 class="checkout__contain-details-total-title">Total: $${data.dataPrecioTotal}</h3>
                        </div>

                    </div>
            
            `)

                $(".carrito").append(purchased)
                $(".productos").append(purchased)

                $.each(checkoutProducts, function (i) {

                    let checkoutItems = $(`
                      
                      <div class="checkout__contain-details-content">
                          <img class="checkout__contain-details-content-img" src="${checkoutProducts[i].img}"
                          alt="">
                          <h3 class="checkout__contain-details-content-title">${checkoutProducts[i].nombre}</h3>
                          <span class="checkout__contain-details-content-quantity">Cantidad: ${checkoutProducts[i].cantidad}</span>
                          <span class="checkout__contain-details-content-subtotal">Subtotal: $${checkoutProducts[i].precio * checkoutProducts[i].cantidad}</span>
                      </div >
                      `)

                    $(checkoutItems).insertAfter(".checkout__contain-details-title")

                })
            },
            complete: function () {

                $('#loader').hide()
            }
        })
    }
})