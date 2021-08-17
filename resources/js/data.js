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





