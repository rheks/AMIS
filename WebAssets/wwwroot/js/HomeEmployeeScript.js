$(document).ready(function () {
    $('#tab-homeEmployee').addClass("active")

    $('#HomeEmployeeTable').DataTable({
        "ajax": {
            "url": urlBackend + "/borrowassets/request/pending",
            "type": "GET",
            "datatype": "json",
            "dataSrc": "data",
            "error": (e) => {
                document.querySelector("#HomeEmployeeTable > tbody > tr > td").innerHTML = "Data Not Available";
            },
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
            {
                "data": "assets.name"
            },
            {
                "data": "quantity",
                "className": "text-center"
            },
            {
                "data": "borrowing_Time",
                "className": "text-center",
                "render": function (data) {
                    return `${data.slice(0, 10)}`
                }
            },
            {
                "data": "return_Time",
                "className": "text-center",
                "render": function (data) {
                    return `${data.slice(0, 10)}`
                }
            },
            {
                "data": "status",
                "className": "text-center",
                "render": function (data) {
                    if (data == "0" ) {
                        return '<p class="btn btn-warning" style="background-color: #FFB100;">Pending</p>'
                    } else if (data == "1") {
                        return '<p class="btn btn-info">Pending</p>'
                    } else if (data == "2") {
                        return '<p class="btn btn-primary" style="background-color: #205295;">Pending</p>'
                    } else if (data == "3") {
                        return '<p class="btn btn-success">Accepted</p>'
                    } else if (data == "4") {
                        return '<p class="btn btn-danger">Rejected</p>'
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

    $('#BorrowAssets2Table').DataTable({
        "ajax": {
            "url": urlBackend + "/borrowassets/request/3",
            "type": "GET",
            "datatype": "json",
            "dataSrc": "data",
            "error": (e) => {
                document.querySelector("#BorrowAssetsTable > tbody > tr > td").innerHTML = "Data Not Available";
            },
        },
        "columns": [
            {
                "data": null,
                "className": "text-center",
                "render": function (data, type, full, meta) {
                    return meta.row + 1;
                    return "";
                }, "width": "1%"
            },
            {
                "data": "users.employee",
                "render": function (data) {
                    return `${data.firstName} ${data.lastName}`
                }
            },
            { "data": "assets.name" },
            {
                "data": "quantity",
                "className": "text-center"
            },
            {
                "data": "borrowing_Time",
                "className": "text-center",
                "render": function (data) {
                    return `${data.slice(0, 10)}`
                }
            },
            {
                "data": "return_Time",
                "className": "text-center",
                "render": function (data) {
                    return `${data.slice(0, 10)}`
                }
            },
            {
                "data": "status",
                "className": "text-center",
                "render": function (data) {
                    if (data == "0") {
                        return '<p class="btn btn-warning" style="background-color: #FFB100;">Pending</p>'
                    } else if (data == "1") {
                        return '<p class="btn btn-info">Pending</p>'
                    } else if (data == "2") {
                        return '<p class="btn btn-primary" style="background-color: #205295;">Pending</p>'
                    } else if (data == "3") {
                        return '<p class="btn btn-success">Accepted</p>'
                    } else if (data == "4") {
                        return '<p class="btn btn-danger">Rejected</p>'
                    }
                }, "width": "10%"
            },
        ], "width": "100%"
    });

    $('#BorrowAssets3Table').DataTable({
        "ajax": {
            "url": urlBackend + "/borrowassets/request/4",
            "type": "GET",
            "datatype": "json",
            "dataSrc": "data",
            "error": (e) => {
                document.querySelector("#BorrowAssetsTable > tbody > tr > td").innerHTML = "Data Not Available";
            },
        },
        "columns": [
            {
                "data": null,
                "className": "text-center",
                "render": function (data, type, full, meta) {
                    return meta.row + 1;
                    return "";
                }, "width": "1%"
            },
            {
                "data": "users.employee",
                "render": function (data) {
                    return `${data.firstName} ${data.lastName}`
                }
            },
            { "data": "assets.name" },
            {
                "data": "quantity",
                "className": "text-center"
            },
            {
                "data": "borrowing_Time",
                "className": "text-center",
                "render": function (data) {
                    return `${data.slice(0, 10)}`
                }
            },
            {
                "data": "return_Time",
                "className": "text-center",
                "render": function (data) {
                    return `${data.slice(0, 10)}`
                }
            },
            {
                "data": "status",
                "className": "text-center",
                "render": function (data) {
                    if (data == "0") {
                        return '<p class="btn btn-warning" style="background-color: #FFB100;">Pending</p>'
                    } else if (data == "1") {
                        return '<p class="btn btn-info">Pending</p>'
                    } else if (data == "2") {
                        return '<p class="btn btn-primary" style="background-color: #205295;">Pending</p>'
                    } else if (data == "3") {
                        return '<p class="btn btn-success">Accepted</p>'
                    } else if (data == "4") {
                        return '<p class="btn btn-danger">Rejected</p>'
                    }
                }
            },
        ], "width": "100%"
    });

    showAssets()

});

function showAssets() {
    $.ajax({
        "url": urlBackend + "/assets",
        "type": "GET",
        "datatype": "json",
        "dataSrc": "data",
        "contentType": "application/json;charset=utf-8",
        "success": (result) => {
            var obj = result.data
            $("#InputAsset").empty()
            $("#InputAsset").append(`<option value="" selected disabled>Choose The Assets</option>`)
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].stock == 0 || obj[i].stock == "0") {
                    $("#InputAsset").append(`<option value="${obj[i].id}" style="background-color: #eaecf4;" disabled>${obj[i].name} (${obj[i].stock})</option>`)
                } else {
                    $("#InputAsset").append(`<option value="${obj[i].id}">${obj[i].name} (${obj[i].stock})</option>`)
                }
            }
        },
        "error": (e) => {
            alert(e.responseText)
        }
    })
}

$("#InputAsset").change(() => {
    let dataAsset = $("#InputAsset option:selected").html().split(" ");
    let stockAsset = dataAsset[1].slice(1, dataAsset[1].length - 1)
    console.log();
    $("#InputQuantity").removeAttr("disabled");
    $("#InputQuantity").attr({ "max": stockAsset, "min": 1, pattern: "/[^0-9\.]/g" });
    $("#InputQuantity").val(1)
})

$("#InputQuantity").on("input", () => {
    let regex = /^\d+$/
    let valueQuantity = $("#InputQuantity").val()

    //console.log(valueQuantity)

    if (valueQuantity.indexOf('.') !== -1) {
        $("#InputQuantity").val(parseInt(valueQuantity))
        //console.log("Ada titik")
    } else if (regex.test(valueQuantity)) {
        $("#InputQuantity").val(valueQuantity)
        //console.log("Angka")
    } else {
        $("#InputQuantity").val("")
    }

    valueQuantity = parseInt(valueQuantity)
    let maxInputQuantity = parseInt($("#InputQuantity").attr("max"))
    let minInputQuantity = parseInt($("#InputQuantity").attr("min"))

    if (valueQuantity > maxInputQuantity) {
        $("#InputQuantity").val(maxInputQuantity)
    } else if (valueQuantity < minInputQuantity) {
        $("#InputQuantity").val(minInputQuantity)
    }
})

$("#ModalCreate").click(() => {
    $("#buttonSubmit").attr("onclick", "Create()");
    $("#buttonSubmit").attr("class", "btn btn-success");
    $("#CreateModalLabel").html("Create New Request Asset");
    $("#buttonSubmit").html("Create");

    $('#BodyModal > form > div:nth-child(2)').show();
    $('#BodyModal > form > div:nth-child(3)').show();
    $('#BodyModal > form > div:nth-child(5)').show();

    $('#BodyModal > form > div:nth-child(4)').hide();

    $("#InputIdBorrowAsset").val("");
    //$("#InputEmployee").val("");
    $("#InputAsset").val("");

    $("#InputQuantity").val("");
    $("#InputQuantity").attr("placeholder", "Input Quantity");
    $("#InputQuantity").attr("disabled", "disabled");

    $("#InputStatus").val("");
    $("#InputReason").val("");
    $("#InputBorrowDate").val("");
    $("#InputReturnDate").val("");

    let dateNow = new Date($.now());
    let minDateFormatted = dateNow.getFullYear() + '-' + dateNow.getMonth() + 1 + '-' + dateNow.getDate();

    $("#InputBorrowDate").attr({ "min": minDateFormatted });
    $("#InputReturnDate").attr({ "min": minDateFormatted });

    $("#InputQuantity").attr("placeholder", "Input Quantity");
    $("#InputReason").attr("placeholder", "Input Reason");
})

function Create() {
    let validateForm = true;

    if (
        $("#InputEmployee").val() == "" ||
        $("#InputAsset").val() == "" ||
        $("#InputQuantity").val() == "" ||
        $("#InputReason").val() == "" ||
        $("#InputBorrowDate").val() == "" ||
        $("#InputReturnDate").val() == ""
    ) {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: "Please fill out all your data",
        })
        validateForm = false
    }

    if (validateForm) {
        var BorrowAsset = {};
        BorrowAsset.NIK = $("#InputEmployee").val();
        BorrowAsset.Asset_Id = $("#InputAsset").val();
        BorrowAsset.Quantity = $("#InputQuantity").val();
        BorrowAsset.Status = 0;
        BorrowAsset.Reason = $("#InputReason").val();
        BorrowAsset.Borrowing_Time = $("#InputBorrowDate").val();
        BorrowAsset.Return_Time = $("#InputReturnDate").val();

        console.log(BorrowAsset)

        $.ajax({
            "type": "POST",
            "url": urlBackend + "/borrowassets/request",
            "data": JSON.stringify(BorrowAsset),
            "contentType": "application/json;charset=utf-8",
            "success": (result) => {
                if (result.status == 200 || result.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data successfully created',
                    })
                    $('#HomeEmployeeTable').DataTable().ajax.reload();
                    $('#CreateModal').modal("hide");
                } else {
                    alert("Data failed to create")
                }

                $("#buttonSubmit").attr("onclick", "Create()");
                $("#buttonSubmit").attr("class", "btn btn-success");
                $("#buttonSubmit").html("Create");

                $("#InputIdBorrowAsset").val("");
                //$("#InputEmployee").val("");
                $("#InputAsset").val("");
                $("#InputQuantity").val("");
                $("#InputReason").val("");
                $("#InputBorrowDate").val("");
                $("#InputReturnDate").val("");
            },
            "error": (result) => {
                if (result.status == 400 || result.status == 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: result.responseJSON.message,
                    })
                }
            },
        })
    }
}