$(document).ready(function () {

    let total

    let storage = JSON.parse(localStorage.getItem('carrito'))
    console.log(storage)

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