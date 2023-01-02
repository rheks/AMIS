let urlBackend = "https://localhost:9001/api";

$(document).ready(function () {
    $('#tab-borrowassets').addClass("active")

    $('#BorrowAssetsTable').DataTable({
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
            { "data": "status" },
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
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });

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
                if (obj[i].stock > 0) {
                    $("#InputAsset").append(`<option value="${obj[i].id}">${obj[i].name}</option>`)
                } else {
                    $("#InputAsset").append(`<option value="${obj[i].id}" disabled>${obj[i].name} (All Reserved)</option>`)
                }
            }
        },
        "error": (e) => {
            alert(e.responseText)
        }
    })

});

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
                    $('#BorrowAssetsTable').DataTable().ajax.reload();
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