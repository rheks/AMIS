let localDay;

$(document).ready(function () {
    $('#tab-assets').addClass("active")

    $('#AssetsTable').DataTable({
        "ajax": {
            "url": urlBackend + "/assets",
            "type": "GET",
            "datatype": "json",
            "dataSrc": "data",
            "error": (e) => {
                document.querySelector("#AssetsTable > tbody > tr > td").innerHTML = "Data Not Available";
            },
        },
        //"rowCallback": function (row, data, index) {
        //    if (data.stock != 7) {
        //        $(row).hide()
        //    }
        //},
        "columns": [
            {
                "data": null,
                "className": "text-center",
                "render": function (data, type, full, meta) {
                    return meta.row + 1;
                }, "width": "1%"
            },
            { "data": "name" },
            {
                "data": "stock",
                "className": "text-center"
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
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });

    //$.ajax({
    //    "url": urlBackend + "/assets",
    //    "type": "GET",
    //    "datatype": "json",
    //    "dataSrc": "data",
    //    "contentType": "application/json;charset=utf-8",
    //    "success": (result) => {
    //        var obj = result.data
    //        $('#AssetsTable').DataTable({
    //            "data": obj,
    //            "columns": [
    //                {
    //                    "data": null,
    //                    "className": "text-center",
    //                    "render": function (data, type, full, meta) {
    //                        return meta.row + 1;
    //                    }, "width": "1%"
    //                },
    //                { "data": "name" },
    //                { "data": "stock" },
    //                {
    //                    "data": "id",
    //                    "className": "text-center",
    //                    "render": function (data) {
    //                        return `
    //                        <button class="btn btn-warning" data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="GetById('${data}')">
    //                            <i class="fa fa-pen"></i>
    //                        </button > &nbsp;
    //                        <button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="ConfirmDelete('${data}')">
    //                            <i class="fa fa-trash">
    //                        </i></button >`
    //                    }, "width": "17%"
    //                }
    //            ],

    //        });
    //    },
    //    "error": (e) => {
    //        let bodyTable = document.createElement("tbody")
    //        bodyTable.innerHTML = `<tr>
    //                                    <td class="text-center" colspan="6">Data not available</td>
    //                               </tr>`
    //        document.getElementById("AssetsTable").appendChild(bodyTable);
    //    }
    //})
    
});

$("#ModalCreate").click(() => {
    $("#buttonSubmit").attr("onclick", "Create()");
    $("#buttonSubmit").attr("class", "btn btn-success");
    $("#buttonSubmit").html("Create");

    $("#InputIdAsset").val("");
    $("#InputAssetName").val("");
    $("#InputStock").val("");

    $("#CreateModalLabel").html("Create New Asset");
    $("#InputAssetName").attr("placeholder", "Input Name of Asset");
    $("#InputStock").attr("placeholder", "Input Stock");
})

function Create() {
    let validateForm = true;

    if (
        $("#InputAssetName").val() == "" ||
        $("#InputStock").val() == ""
    ) {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: "Please fill out all your data",
        })
        validateForm = false
    }

    if (validateForm) {
        var Asset = {};
        Asset.Name = $("#InputAssetName").val();
        Asset.Stock = $("#InputStock").val();

        console.log(Asset)

        $.ajax({
            "type": "POST",
            "url": urlBackend + "/assets",
            "data": JSON.stringify(Asset),
            "contentType": "application/json;charset=utf-8",
            "success": (result) => {
                if (result.status == 200 || result.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data successfully created',
                    })
                    $('#AssetsTable').DataTable().ajax.reload();
                    $('#CreateModal').modal("hide");
                } else {
                    alert("Data failed to create")
                }
                $('#AssetsTable').DataTable().ajax.reload();
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
    // debugger;
    $.ajax({
        "type": "GET",
        "url": urlBackend + "/assets/" + id,
        "contentType": "application/json; charset=utf-8",
        "dataType": "json",
        "success": function (result) {
            var obj = result.data;

            console.log(obj)

            // debugger;
            $('#InputIdAsset').val(obj.id);
            $('#InputAssetName').val(obj.name);
            $('#InputStock').val(obj.stock);

            $("#buttonSubmit").attr("onclick", "Update()");
            $("#buttonSubmit").attr("class", "btn btn-warning");
            $("#CreateModalLabel").html("Update Asset");
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
        $("#InputIdAsset").val() == "" ||
        $("#InputAssetName").val() == "" ||
        $("#InputStock").val() == ""
    ) {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: "Please fill out all your data",
        })
        validateForm = false
    }

    if (validateForm) {
        var Asset = {};
        Asset.Id = $("#InputIdAsset").val();
        Asset.Name = $("#InputAssetName").val();
        Asset.Stock = $("#InputStock").val();
    
        console.log(Asset)
    
        $.ajax({
            "url": urlBackend + "/assets",
            "type": "PUT",
            "data": JSON.stringify(Asset),
            "contentType": "application/json; charset=utf-8",
            "success": (result) => {
                if (result.status == 200 || result.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data successfully updated',
                    })
                    $('#AssetsTable').DataTable().ajax.reload();
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
        "url": urlBackend + "/assets/" + id,
        "type": "GET",
        "contentType": "application/json;charset=utf-8",
        "success": (result) => {
            var obj = result.data;

            Swal.fire({
                title: 'Delete data',
                icon: 'info',
                html: `Are you sure want to delete data with name <b>${obj.name}</b>?`,
                showCloseButton: true,
                showConfirmButton: false,
                showDenyButton: true,
                showCancelButton: true,
                denyButtonText: `<span onclick="Delete('${obj.id}')">Delete</span>`,
                cancelButtonText: `Close`,
            })
        },
        "error": (e) => {
            alert(e.responseText)
        }
    })
}

function Delete(id) {
    $.ajax({
        "url": urlBackend + "/assets/" + id,
        "type": "DELETE",
        "dataType": "json",
        "success": (result) => {
            if (result.status == 200 || result.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data successfully deleted',
                })
                $('#AssetsTable').DataTable().ajax.reload();
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