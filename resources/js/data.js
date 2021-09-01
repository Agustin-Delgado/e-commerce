productos = []
const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

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

                    <svg id="${productos[i].identificador}-fav" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-heart notFillHeart" viewBox="0 0 16 16">
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
        
                    <a class="productos__row-card-buy-link" href="#/checkout">Comprar</a>
        
                    <svg id="${productos[i].identificador}" class="bi bi-cart3" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path
                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <div id="${productos[i].nombre}" class="productos__row-card-buy-quantity"></div>
        
                </div>
        
            </div>`)
        
            $('.productos__row').append(listaDeProductos)

            $.each(JSON.parse(localStorage.getItem("favoritos")), function (i) {

                productos[i].favoritos = true
                
                let fillHeart = $(`
            
                <svg id="${favoritos[i].identificador}-fav" class="bi-heart fillHeart" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path id="${favoritos[i].identificador}-fav" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                `)

                $(document.getElementById(favoritos[i].identificador + '-fav')).replaceWith(fillHeart)

            })
            
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




