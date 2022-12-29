let urlBackend = "https://localhost:9001/api";
let localDay;

$(document).ready(function () {
    $('#accordionSidebar > li:nth-child(3)').addClass("active")
    $('#collapseUtilities').addClass("show")
    $('#collapseUtilities > div > a:nth-child(1)').addClass("active")

    $('#GuestsTable').DataTable({
        "ajax": {
            "url": urlBackend + "/employees",
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
            { "data": "firstName" },
            { "data": "lastName" },
            {
                "data": "birthOfDate",
                "render": function (data) {
                    return `${data.slice(0, 10)}`
                }, "width": "15%"
            },
            {
                "data": "gender",
                "render": function (data) {
                    if (data == 0) { return "Male" }
                    if (data == 1) { return "Female" }
                }
            },
            { "data": "address" },
            { "data": "phone" },
            { "data": "email" },
            {
                "data": "nik",
                "className": "text-center",
                "render": function (data) {
                    return `
                    <button class="btn btn-warning" data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="GetById('${data}')">
                        <i class="fa fa-pen"></i>
                    </button > &nbsp;
                    <button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="ConfirmDelete('${data}')">
                        <i class="fa fa-trash">
                    </i></button >`
                }, "width": "15%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });
});

$("#ModalCreate").click(() => {
    $("#buttonSubmit").attr("onclick", "Create()");
    $("#buttonSubmit").attr("class", "btn btn-success");
    $("#buttonSubmit").html("Create");

    $("#InputNIK").val("");
    $("#InputFirstName").val("");
    $("#InputLastName").val("");
    $("#InputBOD").val("");
    $("#InputGender").val("");
    $("#InputAddress").val("");
    $("#InputPhone").val("");
    $("#InputEmail").val("");

    $("#InputFirstName").attr("placeholder", "Input First Name");
    $("#InputLastName").attr("placeholder", "Input Last Name");
    $("#InputAddress").attr("placeholder", "Input Address");
    $("#InputPhone").attr("placeholder", "Input Phone Number");
    $("#InputEmail").attr("placeholder", "Input Email");
})

function Create() {
    let validateForm = true;

    if (
        $("#InputName").val() == "" ||
        $("#InputPhone").val() == "" ||
        $("#InputEmail").val() == "" ||
        $("#InputAddress").val() == "" ||
        $("#InputProvince option:selected").html() == "" ||
        $("#InputCityOrDistrict option:selected").html() == "" ||
        $("#InputSubDisctrict option:selected").html() == "" ||
        $("#InputWard option:selected").html() == "" ||
        $("#InputPostalCode").val() == ""
    ) {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: "Please fill out all your data",
        })
        validateForm = false
    } else {
        if (!$("#InputEmail").val().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: "Sorry, your email is not valid",
            })
            validateForm = false
        }
        if (!$("#InputPhone").val().match(/^\d*\d$/)) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: "Sorry, your phone number is not valid",
            })
            validateForm = false
        }
    }

    if (validateForm) {
        var Guest = {};
        Guest.Name = $("#InputName").val();
        Guest.Phone = $("#InputPhone").val();
        Guest.Email = $("#InputEmail").val();
        Guest.Address = $("#InputAddress").val();
        Guest.Province = $("#InputProvince option:selected").html();
        Guest.CityOrDistrict = $("#InputCityOrDistrict option:selected").html();
        Guest.SubDistrict = $("#InputSubDisctrict option:selected").html();
        Guest.Ward = $("#InputWard option:selected").html();
        Guest.PostalCode = $("#InputPostalCode").val();

        console.log(Guest)

        $.ajax({
            "type": "POST",
            "url": urlBackend,
            "data": JSON.stringify(Guest),
            "contentType": "application/json;charset=utf-8",
            "success": (result) => {
                if (result.status == 200 || result.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data successfully created',
                    })
                    $('#GuestsTable').DataTable().ajax.reload();
                    $('#CreateModal').modal("hide");
                } else {
                    alert("Data failed to create")
                }
                $('#GuestsTable').DataTable().ajax.reload();
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
        "url": urlBackend + "/" + id,
        "contentType": "application/json; charset=utf-8",
        "dataType": "json",
        "success": function (result) {
            var obj = result.data;

            console.log(obj)

            //$.ajax({
            //    "url": "https://dev.farizdotid.com/api/daerahindonesia/provinsi",
            //    "type": "GET",
            //    "datatype": "json",
            //    "contentType": "application/json;charset=utf-8",
            //    "success": (result) => {
            //        var obj = result.provinsi
            //        $("#InputProvince").append(`<option value="" selected disabled>Select Province</option>`)
            //        for (let i = 0; i < obj.length; i++) {
            //            $("#InputProvince").append(`<option value="${obj[i].id}">${obj[i].nama}</option>`)
            //        }
            //    },
            //    "error": (e) => {
            //        alert(e.responseText)
            //    }
            //})


            // debugger;
            $('#InputIdGuest').val(obj.id);
            $('#InputName').val(obj.name);
            $('#InputPhone').val(obj.phone);
            $('#InputEmail').val(obj.email);
            $('#InputAddress').val(obj.address);
            $('#InputProvince').val(obj.province);
            $('#InputCityOrDistrict').val(obj.cityOrDistrict);
            $('#InputSubDisctrict').val(obj.subDistrict);
            $('#InputWard').val(obj.ward);
            $('#InputPostalCode').val(obj.postalCode);

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
        $("#InputIdGuest").val() == "" ||
        $("#InputName").val() == "" ||
        $("#InputPhone").val() == "" ||
        $("#InputEmail").val() == "" ||
        $("#InputAddress").val() == "" ||
        $("#InputProvince option:selected").html() == "" ||
        $("#InputCityOrDistrict option:selected").html() == "" ||
        $("#InputSubDisctrict option:selected").html() == "" ||
        $("#InputWard option:selected").html() == "" ||
        $("#InputPostalCode").val() == ""
    ) {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: "Please fill out all your data",
        })
        validateForm = false
    } else {
        if (!$("#InputEmail").val().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: "Sorry, your email is not valid",
            })
            validateForm = false
        }
        if (!$("#InputPhone").val().match(/^\d*\d$/)) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: "Sorry, your phone number is not valid",
            })
            validateForm = false
        }
    }

    if (validateForm) {
        var Guest = {};
        Guest.Id = parseInt($("#InputIdGuest").val());
        Guest.Name = $("#InputName").val();
        Guest.Phone = $("#InputPhone").val();
        Guest.Email = $("#InputEmail").val();
        Guest.Address = $("#InputAddress").val();
        Guest.Province = $("#InputProvince option:selected").html();
        Guest.CityOrDistrict = $("#InputCityOrDistrict option:selected").html();
        Guest.SubDistrict = $("#InputSubDisctrict option:selected").html();
        Guest.Ward = $("#InputWard option:selected").html();
        Guest.PostalCode = $("#InputPostalCode").val();
    
        console.log(Guest)
    
        $.ajax({
            "url": urlBackend,
            "type": "PUT",
            "data": JSON.stringify(Guest),
            "contentType": "application/json; charset=utf-8",
            "success": (result) => {
                if (result.status == 200 || result.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data successfully updated',
                    })
                    $('#GuestsTable').DataTable().ajax.reload();
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
        "url": urlBackend + "/" + id,
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
        "url": urlBackend + "/" + id,
        "type": "DELETE",
        "dataType": "json",
        "success": (result) => {
            if (result.status == 200 || result.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data successfully deleted',
                })
                $('#GuestsTable').DataTable().ajax.reload();
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