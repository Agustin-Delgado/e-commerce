productos = []

$.ajax({
    type: 'GET',
    url: "resources/data/productos.json",
    dataType: "json",
    success: function (response) {
        for (const iterator of response) {
            productos.push(iterator)
        }
    },
});




