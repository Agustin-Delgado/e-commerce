let total

$(document).ready(function () {

  let checkout = $(`
        
  <h1 class="checkout-title">Checkout</h1>

  <div class="checkout__contain">

      <div class="checkout__contain-payment">

          <h2 class="checkout__contain-payment-title">Ingresá tus datos</h2>

          <form class="checkout__contain-payment-form" action="">

              <div class="checkout__contain-payment-form-contain">

                  <input class="checkout__contain-payment-form-contain-input" type="text" placeholder="Nombre"
                      name="" id="">

              </div>

              <div class="checkout__contain-payment-form-contain">

                  <input class="checkout__contain-payment-form-contain-input" type="text" placeholder="Apellido"
                      name="" id="">

              </div>

              <div class="checkout__contain-payment-form-contain">

                  <input class="checkout__contain-payment-form-contain-input" type="tel" placeholder="Telefono"
                      name="" id="">

              </div>

              <div class="checkout__contain-payment-form-contain">

                  <input class="checkout__contain-payment-form-contain-input" type="email"
                      placeholder="Correo electrónico" name="" id="">

              </div>


              <div class="checkout__contain-payment-form-contain">

                  <input class="checkout__contain-payment-form-contain-input" type="tel" placeholder="DNI" name=""
                      id="">

              </div>

          </form>

          <form class="checkout__contain-payment-form-two" action="">

              <div class="checkout__contain-payment-form-two-contain">

                  <input class="checkout__contain-payment-form-two-contain-input" type="text"
                      placeholder="Numero de tarjeta" name="" id="">

              </div>

              <div class="checkout__contain-payment-form-two-contain">

                  <input class="checkout__contain-payment-form-two-contain-input" type="text"
                      placeholder="Nombre y apellido" name="" id="">

              </div>

              <div class="checkout__contain-payment-form-two-contain">

                  <input class="checkout__contain-payment-form-two-contain-input" type="date"
                      placeholder="Fecha de expiracion" name="" id="">

              </div>

              <div class="checkout__contain-payment-form-two-contain">

                  <input class="checkout__contain-payment-form-two-contain-input" type="text"
                      placeholder="Codigo de seguridad" name="" id="">

              </div>


              <div class="checkout__contain-payment-form-two-contain">

                  <input class="checkout__contain-payment-form-two-contain-input" type="tel"
                      placeholder="DNI del titular de la tarjeta" name="" id="">

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

              <h3 class="checkout__contain-details-total-title">Total:</h3>

          </div>

      </div>

  </div>
  `)

  $("#cartCounter").html(JSON.parse(localStorage.getItem('cartCounter')))

  if($("#cartCounter").is(':empty')){

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
    $(".carrito__contain-table-title").css("margin-bottom", "30px")


  }else{

    let storage = JSON.parse(localStorage.getItem('carrito'))
    console.log(storage)

    $.each(storage, function (i) {

        let addToCart = $(`
                
        <div id="${storage[i].nombre}" class="carrito__contain-table">

            <img class="carrito__contain-table-img" src="${storage[i].img}" alt="">
            <h2 class="carrito__contain-table-title">${storage[i].nombre}</h2>
            <span class="carrito__contain-table-quantity">${storage[i].cantidad}</span>
            <span class="carrito__contain-table-price">$${storage[i].precio * storage[i].cantidad}</span>
            <svg id="${storage[i].identificador}" class="carrito__contain-table-x" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            <div class="carrito__contain-table-loader"></div>

        </div>`)

        $(".carrito__contain").append(addToCart)

        

    })

    calcularTotal()

    $(".carrito__contain-table").on("click", ".carrito__contain-table-x", function (event) {
      
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
          const index = storage.findIndex(carrito => carrito === itemSeleccionado);
          storage.splice(index, 1);
          localStorage.setItem('carrito', JSON.stringify(storage));
          $(document.getElementById(itemSeleccionado.nombre)).remove()
          console.log(itemSeleccionado)
    
          let cartCounter = $("#cartCounter").text()-1
    
          if ($("#cartCounter").text()-1 === 0){
    
            localStorage.clear()
            location.reload()
    
          }else{
    
            localStorage.setItem('cartCounter', cartCounter)
            $("#cartCounter").html(JSON.parse(localStorage.getItem('cartCounter')))
    
          }
          Swal.fire({
            title: 'Eliminado!',
            text: "El producto fue eliminado del carrito",
            icon: 'success',
            confirmButtonColor: '#4aabff',
            confirmButtonText: 'Elegir otro producto',
          }
          )
          calcularTotal()
        }
      })


  })

    function calcularTotal(){

      total = storage.reduce((sum, value) => ( sum + (value.precio*value.cantidad) ), 0);
      console.log(total);

      $("#total").text("Total: $" + total)
    }

    /* FINALIZAR COMPRA */

    $(".carrito__contain-buy-button").click(function(){

      $(".carrito").html("")
      $(".carrito").append(checkout)
      $(".carrito").toggleClass("carrito checkout")

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

      total = storage.reduce((sum, value) => ( sum + (value.precio*value.cantidad) ), 0);

      let checkoutTotal = $(`<span class="checkout__contain-details-total-price">$${total}</span>`)

      $(checkoutTotal).insertAfter(".checkout__contain-details-total-title")

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
    })
  }
})