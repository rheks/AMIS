
$(document).ready(function () {
    $('#tab-home').addClass("active")

    $.ajax({
        "type": "GET",
        "url": urlBackend + "/assets",
        "contentType": "application/json; charset=utf-8",
        "dataType": "json",
        "success": function (result) {
            var obj = result.data;
            let TotalAssets = 0;

            obj.forEach((data, index, arr) => {
                TotalAssets += data.stock
            })

            $("#TotalStockAssets").html(TotalAssets)
            $("#TotalItems").html(obj.length)
            
        },
        "error": (e) => {
            $("#TotalStockAssets").html("0")
            $("#TotalItems").html("0")
        },
    })

    $.ajax({
        "type": "GET",
        "url": urlBackend + "/borrowassets",
        "contentType": "application/json; charset=utf-8",
        "dataType": "json",
        "success": function (result) {
            var obj = result.data;
            let TotalBorrow = 0;
            //console.log(obj)
            obj.forEach((data, index, arr) => {
                TotalBorrow += data.quantity
            })

            $("#TotalBorrowAssets").html(TotalBorrow)
            
        },
        "error": (e) => {
            $("#TotalBorrowAssets").html("0")
        },
    })

    $.ajax({
        "type": "GET",
        "url": urlBackend + "/employees",
        "contentType": "application/json; charset=utf-8",
        "dataType": "json",
        "success": function (result) {
            var obj = result.data;

            $("#TotalEmployees").html(obj.length)
            
        },
        "error": (e) => {
            $("#TotalEmployees").html("0")
        },
    })

});