$(document).ready(function () {

    $(".checkout__contain-content-dni").hide()
    $(".checkout__contain-content-form-two").hide()

    $("#nextButton").click(function(){

        pagination = 1

        $(".checkout__contain-content-card").slideUp(300).fadeOut(400)
        $(".checkout__contain-content-dni").slideDown(300).fadeIn(400)

        $(".checkout__contain-content-form-two").slideDown(300).fadeIn(400)

        pagNum(pagination)

    })

    $("#backButton").click(function(){

        pagination = 0

        $(".checkout__contain-content-dni").slideUp(300).fadeOut(400)
        $(".checkout__contain-content-card").slideDown(300).fadeIn(400)

        $(".checkout__contain-content-form-two").slideUp(300).fadeOut(400)

        pagNum(pagination)
   })

   function pagNum(pagination){

        if(pagination == 1){
            
            $(".checkout__contain-content-button-next").text("Terminar compra")
            $(".checkout__contain-content-button-next").css("background-position","right center")
        }else{
            $(".checkout__contain-content-button-next").text("Siguiente")
            $(".checkout__contain-content-button-next").css("background-position","left center")
        }
    }

      $('body').on('input', ".input-cart-number", function() {

        let cardNumber = ''

            $('.input-cart-number').each(function(){

            cardNumber += $(this).val() + ' '

                if ($(this).val().length === 4) {
                
                    $(this).next().focus()

                    $(".checkout__contain-content-card-flip-front-number").html(cardNumber)

            }else{

                $(".checkout__contain-content-card-flip-front-number").html(cardNumber)
            }
        })
    })

    $('body').on('input', ".input-dni-number", function() {

        let dniNumber = ''

            $('.input-dni-number').each(function(){

            dniNumber += $(this).val()

                if ($(this).val().length == 2){
                
                    dniNumber = dniNumber + "."
                    $(".checkout__contain-content-dni-flip-front-expiration div").html(dniNumber)
                    $('.input-dni-number').val($(".checkout__contain-content-dni-flip-front-expiration div").html())

            }else if ($(this).val().length == 6){

                dniNumber = dniNumber + "."
                $(".checkout__contain-content-dni-flip-front-expiration div").html(dniNumber)
                $('.input-dni-number').val($(".checkout__contain-content-dni-flip-front-expiration div").html())

            }else{
                $(".checkout__contain-content-dni-flip-front-expiration div").html(dniNumber)
            }
        })
    })
    
    $('body').on('input', "#card-holder", function() {

        if ($(this).val().length >= 34) {

            $('.checkout__contain-content-card .checkout__contain-content-card-flip-front-holder div').html()

        }else{

            $('.checkout__contain-content-card .checkout__contain-content-card-flip-front-holder div').html($(this).val())
            $('.checkout__contain-content-dni-flip-front-holder div').html($(this).val())
        }
    })

    $('body').on('change', "#card-expiration-month, #card-expiration-year", function() {

        m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'))
        m = (m < 10) ? '0' + m : m
        y = $('#card-expiration-year').val()

        $('.checkout__contain-content-card-flip-front-expiration div').html(m + '/' + y)

    })

    $('#card-ccv').on('focus', function(){

        $('.checkout__contain-content-card').addClass('hover')}).on('blur', function(){

            $('.checkout__contain-content-card').removeClass('hover')}).on('keyup change', function(){

                $('.checkout__contain-content-card-flip-back-ccv div').html($(this).val())
      })
})