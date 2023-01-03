let urlBackend = "https://localhost:9001/api";

$(document).ready(function () {
    $('#tab-RequestAssetsManager').addClass("active")

    $('#RequestAssetsManagerTable').DataTable({
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
                        return 'Pending from Admin'
                    } else if (data == "1") {
                        return 'Pending'
                    } else if (data == "2") {
                        return 'Accept'
                    } else if (data == "4") {
                        return 'Reject'
                    }
                }
            },
            {
                "data": "id",
                "className": "text-center",
                "render": function (data) {
                    return `
                    <button class="btn btn-warning" data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="GetById('${data}')">
                        <i class="fa fa-pen"></i>
                    </button > &nbsp;
                    <button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="ConfirmDelete('${data}')">
                        <i class="fa fa-trash">
                    </i></button >`
                }, "width": "17%"
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

    $.ajax({
        "url": urlBackend + "/assets",
        "type": "GET",
        "datatype": "json",
        "dataSrc": "data",
        "contentType": "application/json;charset=utf-8",
        "success": (result) => {
            var obj = result.data
            $("#InputAsset").append(`<option value="" selected disabled>Choose The Assets</option>`)
            for (let i = 0; i < obj.length; i++) {
                $("#InputAsset").append(`<option value="${obj[i].id}">${obj[i].name}</option>`)
            }
        },
        "error": (e) => {
            alert(e.responseText)
        }
    })

    console.log($("#RequestAssetsManagerTable > tbody > tr:nth-child(6) > td:nth-child(7)"))

});

$("#ModalCreate").click(() => {
    $("#buttonSubmit").attr("onclick", "Create()");
    $("#buttonSubmit").attr("class", "btn btn-success");
    $("#buttonSubmit").html("Create");

    $('#BodyModal > form > div:nth-child(2)').show();
    $('#BodyModal > form > div:nth-child(3)').show();
    $('#BodyModal > form > div:nth-child(5)').show();

    $("#InputIdBorrowAsset").val("");
    $("#InputEmployee").val("");
    $("#InputAsset").val("");
    $("#InputQuantity").val("");
    $("#InputStatus").val("Accept");
    $("#InputBorrowDate").val("");
    $("#InputReturnDate").val("");

    $("#BodyModal > form > div:nth-child(4)").hide();
    $("#InputQuantity").attr("placeholder", "Input Quantity");
})

function Create() {
    let validateForm = true;

    if (
        $("#InputEmployee").val() == "" ||
        $("#InputAsset").val() == "" ||
        $("#InputQuantity").val() == "" ||
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
        BorrowAsset.Status = $("#InputStatus").val();
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
                    $('#CreateModal').modal("hide");
                } else {
                    alert("Data failed to create")
                }
                $('#RequestAssetsManagerTable').DataTable().ajax.reload();
                $('#CreateModal').modal("hide");
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
            $('#InputBorrowDate').val(obj.borrowing_Time.slice(0, 10));
            $('#InputReturnDate').val(obj.return_Time.slice(0, 10));

            $('#BodyModal > form > div:nth-child(2)').hide();
            $('#BodyModal > form > div:nth-child(3)').hide();
            $('#BodyModal > form > div:nth-child(5)').hide();

            $("#buttonSubmit").attr("onclick", "Update()");
            $("#buttonSubmit").attr("class", "btn btn-warning");
            $("#buttonSubmit").html("Update");
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
        BorrowAsset.Borrowing_Time = $("#InputBorrowDate").val();
        BorrowAsset.Return_Time = $("#InputReturnDate").val();

        console.log(BorrowAsset)

        $.ajax({
            "url": urlBackend + "/borrowassets",
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