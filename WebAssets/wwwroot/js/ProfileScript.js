var nik = $('#textNIK').html()

$(document).ready(function () {
    $('#tab-profile').addClass("active")


    // debugger;
    $.ajax({
        "type": "GET",
        "url": urlBackend + "/employees/" + nik,
        "contentType": "application/json; charset=utf-8",
        "dataType": "json",
        "success": function (result) {
            var obj = result.data;
            var gender = obj.gender == 0 ? "Male" : "Female"

            console.log(obj)

            // debugger;
            $('#textNIK').html(obj.nik);
            $('#textName').html(obj.firstName + " " + obj.lastName);
            $('#textDoB').html(obj.birthOfDate.slice(0, 10));
            $('#textGender').html(gender);
            $('#textEmail').html(obj.email);
            $('#textPhone').html(obj.phone);
            $('#textDepartement').html(obj.departements.name);
            $('#textRole').html(obj.role.name);
            $('#textAddress').html(obj.address);
        },
        error: function (errormesage) {
            swal("Data failed to input!", "You clicked the button!", "error");
        }
    })
});

function Update() {
    let validateForm = true;

    if (
        $("#InputPassword").val() == ""
    ) {
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: "Please fill out all your password",
        })
        validateForm = false
    }

    if (validateForm) {
        var data = {};
        data.NIK = nik;
        data.Password = $("#InputPassword").val();

        console.log(data)

        $.ajax({
            "url": urlBackend + "/users/update",
            "type": "PUT",
            "data": JSON.stringify(data),
            "contentType": "application/json; charset=utf-8",
            "success": (result) => {
                if (result.status == 200 || result.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Password successfully updated, please re-login with your new password',
                    })
                    $("#InputPassword").val("")
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Password failed to update',
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