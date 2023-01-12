
$(document).ready(function () {
    $('#tab-RequestAssetsManager').addClass("active")

    $('#RequestAssetsManagerTable').DataTable({
        "ajax": {
            "url": urlBackend + "/borrowassets/request/pending",
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
            {
                "data": "id",
                "className": "text-center",
                "render": function (data, type, full, meta) {
                    if (full.status == 1) {
                        return `
                        <button class="btn btn-warning" data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="GetById('${data}')">
                            <i class="fa fa-pen"></i>
                        </button > &nbsp;
                        <!-- <button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="ConfirmDelete('${data}')">
                            <i class="fa fa-trash">
                        </i></button > -->`
                    }
                    return `
                    <button class="btn btn-warning" data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="GetById('${data}')" disabled>
                        <i class="fa fa-pen"></i>
                    </button > &nbsp;
                    <!-- <button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="ConfirmDelete('${data}')">
                        <i class="fa fa-trash">
                    </i></button > -->`
                }, "width": "10%"
            }
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

    $.ajax({
        "url": urlBackend + "/employees",
        "type": "GET",
        "datatype": "json",
        "dataSrc": "data",
        "contentType": "application/json;charset=utf-8",
        "success": (result) => {
            var obj = result.data
            $("#InputEmployee").append(`<option value="" selected disabled>Choose The Name</option>`)
            for (let i = 0; i < obj.length; i++) {
                $("#InputEmployee").append(`<option value="${obj[i].nik}">${obj[i].firstName} ${obj[i].lastName}</option>`)
            }
        },
        "error": (e) => {
            alert(e.responseText)
        }
    })

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
    $("#buttonSubmit").html("Create");
    $("#CreateModalLabel").html("Create New Borrow Asset");

    $('#BodyModal > form > div:nth-child(2)').show();
    $('#BodyModal > form > div:nth-child(3)').show();
    $('#BodyModal > form > div:nth-child(4)').show();
    $('#BodyModal > form > div:nth-child(5)').show();
    $('#BodyModal > form > div:nth-child(7)').show();

    $('#BodyModal > form > div:nth-child(6)').hide();

    $("#InputIdBorrowAsset").val("");
    $("#InputEmployee").val("");
    $("#InputAsset").val("");

    $("#InputQuantity").val("");
    $("#InputQuantity").attr("placeholder", "Input Quantity");
    $("#InputQuantity").attr("disabled", "disabled");

    $("#InputStatus").val("Accept");
    $('#InputReason').val("");
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
        $("#InputUser").val() == "" ||
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
        BorrowAsset.NIK = $("#InputUser").val();
        BorrowAsset.Asset_Id = $("#InputAsset").val();
        BorrowAsset.Quantity = $("#InputQuantity").val();
        BorrowAsset.Status = 2;
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
                    $('#RequestAssetsManagerTable').DataTable().ajax.reload();
                    $('#BorrowAssets2Table').DataTable().ajax.reload();
                    $('#BorrowAssets3Table').DataTable().ajax.reload();
                    $('#CreateModal').modal("hide");
                } else {
                    alert("Data failed to create")
                }
                $('#RequestAssetsManagerTable').DataTable().ajax.reload();
                $('#CreateModal').modal("hide");
                showAssets()
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

function GetById(id) {
    $("#BodyModal > form > div:nth-child(4)").show();
    // debugger;
    $.ajax({
        "type": "GET",
        "url": urlBackend + "/borrowassets/" + id,
        "contentType": "application/json; charset=utf-8",
        "dataType": "json",
        "success": function (result) {
            var obj = result.data;

            console.log(obj)

            // debugger;
            $('#InputIdBorrowAsset').val(obj.id);
            $('#InputEmployee').val(obj.nik);
            $('#InputAsset').val(obj.asset_Id);
            $('#InputQuantity').val(obj.quantity);
            $('#InputStatus').val(obj.status);
            $('#InputReason').val(obj.reason);
            $('#InputBorrowDate').val(obj.borrowing_Time.slice(0, 10));
            $('#InputReturnDate').val(obj.return_Time.slice(0, 10));

            $('#BodyModal > form > div:nth-child(2)').hide();
            $('#BodyModal > form > div:nth-child(3)').hide();
            $('#BodyModal > form > div:nth-child(4)').hide();
            $('#BodyModal > form > div:nth-child(7)').hide();

            $('#BodyModal > form > div:nth-child(5)').show();
            $('#BodyModal > form > div:nth-child(6)').show();

            $("#buttonSubmit").attr("onclick", "Update()");
            $("#buttonSubmit").attr("class", "btn btn-warning");
            $("#buttonSubmit").html("Update");
            $("#CreateModalLabel").html("Update Status Borrow Asset");
            $('#CreateModal').modal("show");
        },
        error: function (errormesage) {
            swal("Data failed to input!", "You clicked the button!", "error");
        }
    })
}

function Update() {
    let validateForm = true;

    if (
        $("#InputIdBorrowAsset").val() == "" ||
        $("#InputEmployee").val() == "" ||
        $("#InputAsset").val() == "" ||
        $("#InputQuantity").val() == "" ||
        $("#InputStatus").val() == "" ||
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
        BorrowAsset.Id = $("#InputIdBorrowAsset").val();
        BorrowAsset.NIK = $("#InputEmployee").val();
        BorrowAsset.Asset_Id = $("#InputAsset").val();
        BorrowAsset.Quantity = $("#InputQuantity").val();
        BorrowAsset.Status = $("#InputStatus").val();
        BorrowAsset.Reason = $("#InputReason").val();
        BorrowAsset.Borrowing_Time = $("#InputBorrowDate").val();
        BorrowAsset.Return_Time = $("#InputReturnDate").val();

        console.log(BorrowAsset)

        $.ajax({
            "url": urlBackend + "/borrowassets/request",
            "type": "PUT",
            "data": JSON.stringify(BorrowAsset),
            "contentType": "application/json; charset=utf-8",
            "success": (result) => {
                if (result.status == 200 || result.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data successfully updated',
                    })
                    $('#RequestAssetsManagerTable').DataTable().ajax.reload();
                    $('#BorrowAssets2Table').DataTable().ajax.reload();
                    $('#BorrowAssets3Table').DataTable().ajax.reload();
                    $('#CreateModal').modal("hide");
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Data failed to update',
                    })
                }
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

function ConfirmDelete(id) {
    $.ajax({
        "url": urlBackend + "/borrowassets/" + id,
        "type": "GET",
        "contentType": "application/json;charset=utf-8",
        "success": (result) => {
            var obj = result.data;

            $('#InputIdBorrowAsset').val(obj.id);
            $('#InputEmployee').val(obj.nik);
            $('#InputAsset').val(obj.asset_Id);
            $('#InputQuantity').val(obj.quantity);
            $('#InputStatus').val(obj.status);
            $('#InputReason').val(obj.reason);
            $('#InputBorrowDate').val(obj.borrowing_Time.slice(0, 10));
            $('#InputReturnDate').val(obj.return_Time.slice(0, 10));

            console.log($('#InputIdBorrowAsset').val())

            Swal.fire({
                title: 'Delete data',
                icon: 'info',
                html: `Are you sure want to delete data with Borrow Asset <b>${obj.assets.name}</b>?`,
                showCloseButton: true,
                showConfirmButton: false,
                showDenyButton: true,
                showCancelButton: true,
                denyButtonText: `<span onclick="Delete()">Delete</span>`,
                cancelButtonText: `Close`,
            })
        },
        "error": (e) => {
            alert(e.responseText)
        }
    })
}

function Delete() {
    //debugger;
    var BorrowAsset = {};
    BorrowAsset.Id = $("#InputIdBorrowAsset").val();
    BorrowAsset.NIK = $("#InputEmployee").val();
    BorrowAsset.Asset_Id = $("#InputAsset").val();
    BorrowAsset.Quantity = $("#InputQuantity").val();
    BorrowAsset.Status = $("#InputStatus").val();
    BorrowAsset.Reason = $("#InputReason").val();
    BorrowAsset.Borrowing_Time = $("#InputBorrowDate").val();
    BorrowAsset.Return_Time = $("#InputReturnDate").val();

    $.ajax({
        "url": urlBackend + "/borrowassets/request",
        "type": "DELETE",
        "data": JSON.stringify(BorrowAsset),
        "contentType": "application/json; charset=utf-8",
        "dataType": "json",
        "success": (result) => {
            if (result.status == 200 || result.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data successfully deleted',
                })
                $('#RequestAssetsManagerTable').DataTable().ajax.reload();
                $('#BorrowAssets2Table').DataTable().ajax.reload();
                $('#BorrowAssets3Table').DataTable().ajax.reload();
            }
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