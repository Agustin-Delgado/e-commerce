productos = []

$.ajax({
    type: 'GET',
    beforeSend: function () { 
        $('#loader').show()
        $('#items').hide()
    },
    url: "resources/data/productos.json",
    dataType: "json",
    success: function (response) {
        for (const iterator of response) {
            productos.push(iterator)
        }
    },
    complete: function () { 
        $('#loader').hide()

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

        $('#items').show()
    },
});

let dolar = []

$.ajax({
    url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
    dataType: "json",
    success: function (response) {
        for (const iterator of response) {
            dolar.push(iterator)
        }
    },
        
});




