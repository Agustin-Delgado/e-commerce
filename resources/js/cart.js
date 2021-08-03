$(document).ready(function () {
  $("#cartCounter").html(JSON.parse(localStorage.getItem('cartCounter')))

  let storage = JSON.parse(localStorage.getItem('carrito'))
  console.log(storage)

  $.each(storage, function (i) {

      let addToCart = $(`
              
      <div class="carrito__contain-table">

          <img class="carrito__contain-table-img" src="" alt="">
          <h2 class="carrito__contain-table-title">${storage[i].nombre}</h2>
          <span class="carrito__contain-table-quantity">${storage[i].cantidad}</span>
          <span class="carrito__contain-table-price">$${storage[i].precio * storage[i].cantidad}</span>

      </div>`)

      $(".carrito__contain").append(addToCart)

  })

  let total = storage.reduce((sum, value) => ( sum + (value.precio*value.cantidad) ), 0);
  console.log(total);

  $("#total").text("Total: $" + total)

})