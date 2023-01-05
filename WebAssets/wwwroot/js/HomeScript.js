
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
            console.log(obj)
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

    //$('#RequestAssetsManagerAssetTable').DataTable({
    //    "ajax": {
    //        "url": urlBackend + "/borrowassets",
    //        "type": "GET",
    //        "datatype": "json",
    //        "dataSrc": "data",
    //    },
    //    "columns": [
    //        {
    //            "data": null,
    //            "className": "text-center",
    //            "render": function (data, type, full, meta) {
    //                return meta.row + 1;
    //            }, "width": "1%"
    //        },
    //        {
    //            "data": "users.employee",
    //            "render": function (data) {
    //                return `${data.firstName} ${data.lastName}`
    //            }
    //        },
    //        {
    //            "data": "assets.name"
    //        },
    //        {
    //            "data": "quantity",
    //            "className": "text-center"
    //        },
    //        {
    //            "data": "borrowing_Time",
    //            "className": "text-center",
    //            "render": function (data) {
    //                return `${data.slice(0, 10)}`
    //            }
    //        },
    //        {
    //            "data": "return_Time",
    //            "className": "text-center",
    //            "render": function (data) {
    //                return `${data.slice(0, 10)}`
    //            }
    //        },
    //        {
    //            "data": "status",
    //            "className": "text-center",
    //            "render": function (data) {
    //                if (data == "0" ) {
    //                    return '<p class="btn btn-warning" style="background-color: #FFB100;">Pending</p>'
    //                } else if (data == "1") {
    //                    return '<p class="btn btn-info">Pending</p>'
    //                } else if (data == "2") {
    //                    return '<p class="btn btn-primary" style="background-color: #205295;">Pending</p>'
    //                } else if (data == "3") {
    //                    return '<p class="btn btn-success">Accepted</p>'
    //                } else if (data == "4") {
    //                    return '<p class="btn btn-danger">Rejected</p>'
    //                }
    //            }
    //        },
    //    ],
    //    "success": function (data) {
    //        console.log(data);
    //    },
    //    "language": {
    //        "emptyTable": "no data found"
    //    },
    //    "width": "100%"
    //});

});