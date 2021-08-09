  let total

$(document).ready(function () {

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
          Swal.fire(
            'Eliminado!',
            'El producto fue eliminado del carrito',
            'success'
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

  }
})