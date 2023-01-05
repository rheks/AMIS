let localDay;

$(document).ready(function () {
    $('#tab-employees').addClass("active")

    $('#EmployeesTable').DataTable({
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
            {
                "data": "firstName",
                "render": function (data, type, full, meta) {
                    return `${full.firstName} ${full.lastName}`;
                }
            },
            { "data": "role.name" },
            //{ "data": "birthOfDate" },
            { "data": "departements.name" },
            //{
            //    "data": "gender",
            //    "render": function (data) {
            //        if (data == 0) { return "Male" }
            //        if (data == 1) { return "Female" }
            //    }
            //},
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
                }, "width": "12%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });

    $.ajax({
        "url": urlBackend + "/roles",
        "type": "GET",
        "datatype": "json",
        "dataSrc": "data",
        "contentType": "application/json;charset=utf-8",
        "success": (result) => {
            var obj = result.data
            $("#InputRole").append(`<option value="" selected disabled>Choose The Role</option>`)
            for (let i = 0; i < obj.length; i++) {
                $("#InputRole").append(`<option value="${obj[i].id}">${obj[i].name}</option>`)
            }
        },
        "error": (e) => {
            alert(e.responseText)
        }
    })

    $.ajax({
        "url": urlBackend + "/departements",
        "type": "GET",
        "datatype": "json",
        "dataSrc": "data",
        "contentType": "application/json;charset=utf-8",
        "success": (result) => {
            var obj = result.data
            $("#InputDepartement").append(`<option value="" selected disabled>Choose The Departement</option>`)
            for (let i = 0; i < obj.length; i++) {
                $("#InputDepartement").append(`<option value="${obj[i].id}">${obj[i].name}</option>`)
            }
        },
        "error": (e) => {
            alert(e.responseText)
        }
    })
});

$("#ModalCreate").click(() => {
    $("#buttonSubmit").attr("onclick", "Create()");
    $("#buttonSubmit").attr("class", "btn btn-success");
    $("#buttonSubmit").html("Create");
    $("#CreateModalLabel").html("Create New Employee");
    $("#BodyModal > form > div:nth-child(6)").show()

    $("#InputNIK").val("");
    $("#InputFirstName").val("");
    $("#InputLastName").val("");
    $("#InputBOD").val("");
    $("#InputGender").val("");
    $("#InputAddress").val("");
    $("#InputPhone").val("");
    $("#InputEmail").val("");
    $("#InputPassword").val("");
    $("#InputRole").val("");
    $("#InputDepartement").val("");

    $("#InputFirstName").attr("placeholder", "Input First Name");
    $("#InputLastName").attr("placeholder", "Input Last Name");
    $("#InputAddress").attr("placeholder", "Input Address");
    $("#InputPhone").attr("placeholder", "Input Phone Number");
    $("#InputEmail").attr("placeholder", "Input Email");
    $("#InputPassword").attr("placeholder", "Input Password");
})

function Create() {
    let validateForm = true;

    if (
        $("#InputFirstName").val() == "" ||
        $("#InputLastName").val() == "" ||
        $("#InputBOD").val() == "" ||
        $("#InputPhone").val() == "" ||
        $("#InputGender").val() == "" ||
        $("#InputAddress").val() == "" ||
        $("#InputEmail").val() == "" ||
        $("#InputPhone").val() == "" ||
        $("#InputRole").val() == "" ||
        $("#InputDepartement").val() == "" ||
        $("#InputPassword").val() == ""
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
                text: "Sorry, your phone number is invalid",
            })
            validateForm = false
        }
    }

    if (validateForm) {
        var Employee = {};
        Employee.FirstName = $("#InputFirstName").val();
        Employee.LastName = $("#InputLastName").val();
        Employee.BirthOfDate = $("#InputBOD").val();
        Employee.Gender = parseInt($("#InputGender").val());
        Employee.Address = $("#InputAddress").val();
        Employee.Email = $("#InputEmail").val();
        Employee.Phone = $("#InputPhone").val();
        Employee.Password = $("#InputPassword").val();
        Employee.Role_Id = parseInt($("#InputRole").val());
        Employee.Departement_Id = parseInt($("#InputDepartement").val());

        console.log(Employee)

        $.ajax({
            "type": "POST",
            "url": urlBackend + "/employees/register",
            "data": JSON.stringify(Employee),
            "contentType": "application/json;charset=utf-8",
            "success": (result) => {
                if (result.status == 200 || result.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data successfully created',
                    })
                    $('#EmployeesTable').DataTable().ajax.reload();
                    $('#CreateModal').modal("hide");
                } else {
                    alert("Data failed to create")
                }
                $('#EmployeesTable').DataTable().ajax.reload();
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
        "url": urlBackend + "/employees/" + id,
        "contentType": "application/json; charset=utf-8",
        "dataType": "json",
        "success": function (result) {
            var obj = result.data;

            console.log(obj)

            // debugger;
            $('#InputNIK').val(obj.nik);
            $('#InputFirstName').val(obj.firstName);
            $('#InputLastName').val(obj.lastName);
            $('#InputBOD').val(obj.birthOfDate.slice(0, 10));
            $('#InputGender').val(obj.gender);
            $('#InputAddress').val(obj.address);
            $('#InputPhone').val(obj.phone);
            $('#InputEmail').val(obj.email);
            $('#InputRole').val(obj.role_Id);
            $('#InputDepartement').val(obj.departement_Id);

            $("#BodyModal > form > div:nth-child(6)").hide()
            $("#buttonSubmit").attr("onclick", "Update()");
            $("#buttonSubmit").attr("class", "btn btn-warning");
            $("#buttonSubmit").html("Update");
            $("#CreateModalLabel").html("Update Employee");
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
        $("#InputNIK").val() == "" ||
        $("#InputFirstName").val() == "" ||
        $("#InputLastName").val() == "" ||
        $("#InputBOD").val() == "" ||
        $("#InputPhone").val() == "" ||
        $("#InputGender").val() == "" ||
        $("#InputAddress").val() == "" ||
        $("#InputEmail").val() == "" ||
        $("#InputPhone").val() == "" ||
        $("#InputRole").val() == "" ||
        $("#InputDepartement").val() == ""
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
        var Employee = {};
        Employee.NIK = $("#InputNIK").val();
        Employee.FirstName = $("#InputFirstName").val();
        Employee.LastName = $("#InputLastName").val();
        Employee.BirthOfDate = $("#InputBOD").val();
        Employee.Gender = parseInt($("#InputGender").val());
        Employee.Address = $("#InputAddress").val();
        Employee.Email = $("#InputEmail").val();
        Employee.Phone = $("#InputPhone").val();
        Employee.Password = $("#InputPassword").val();
        Employee.Role_Id = parseInt($("#InputRole").val());
        Employee.Departement_Id = parseInt($("#InputDepartement").val());
    
        console.log(Employee)
    
        $.ajax({
            "url": urlBackend + "/employees",
            "type": "PUT",
            "data": JSON.stringify(Employee),
            "contentType": "application/json; charset=utf-8",
            "success": (result) => {
                if (result.status == 200 || result.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data successfully updated',
                    })
                    $('#EmployeesTable').DataTable().ajax.reload();
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
        "url": urlBackend + "/employees/" + id,
        "type": "GET",
        "contentType": "application/json;charset=utf-8",
        "success": (result) => {
            var obj = result.data;

            Swal.fire({
                title: 'Delete data',
                icon: 'info',
                html: `Are you sure want to delete data with name <b>${obj.firstName} ${obj.lastName}</b>?`,
                showCloseButton: true,
                showConfirmButton: false,
                showDenyButton: true,
                showCancelButton: true,
                denyButtonText: `<span onclick="Delete('${obj.nik}')">Delete</span>`,
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
        "url": urlBackend + "/employees/" + id,
        "type": "DELETE",
        "dataType": "json",
        "success": (result) => {
            if (result.status == 200 || result.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data successfully deleted',
                })
                $('#EmployeesTable').DataTable().ajax.reload();
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