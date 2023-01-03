let urlBackend = "https://localhost:9001/api";

$(document).ready(function () {
    $('#tab-RequestAssetsManagerAsset').addClass("active")

    $('#RequestAssetsManagerAssetTable').DataTable({
        "ajax": {
            "url": urlBackend + "/borrowassets",
            "type": "GET",
            "datatype": "json",
            "dataSrc": "data",
        },
        "columns": [
            {
                "data": null,
                "className": "text-center",
                "render": function (data, type, full, meta) {
                    return meta.row + 1;
                }, "width": "1%"
            },
            {
                "data": "users.employee",
                "render": function (data) {
                    return `${data.firstName} ${data.lastName}`
                }
            },
            { "data": "assets.name" },
            { "data": "quantity" },
            {
                "data": "borrowing_Time",
                "render": function (data) {
                    return `${data.slice(0, 10)}`
                }
            },
            {
                "data": "return_Time",
                "render": function (data) {
                    return `${data.slice(0, 10)}`
                }
            },
            {
                "data": "status",
                "render": function (data) {
                    if (data == "0") {
                        return 'Pending'
                    } else if (data == "1") {
                        return 'Accept from Admin'
                    } else if (data == "2") {
                        return 'Accept from Manager'
                    } else if (data == "3") {
                        return 'Accept from Manager Assets'
                    } else if (data == "4") {
                        return 'Reject'
                    }
                }
            },
        ],
        "success": function (data) {
            console.log(data);
        },
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });

    console.log($("#RequestAssetsManagerAssetTable > tbody > tr:nth-child(6) > td:nth-child(7)"))

});