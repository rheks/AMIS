
function Login() {
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
        var Login = {};
        Login.NIK = $("#InputNIK").val();
        Login.Password = $("#InputPassword").val();

        console.log(Login)

        $.ajax({
            "type": "POST",
            "url": urlBackend + "/employees/login",
            "data": JSON.stringify(Login),
            "contentType": "application/json;charset=utf-8",
            "headers": { Authorization: $`Bearer ${localStorage.getItem("token")}` },
            "success": (result) => {
                //if (result.status == 200 || result.status == 201) {
                //    Swal.fire({
                //        icon: 'success',
                //        title: 'Success',
                //        text: 'Data successfully created',
                //    })
                //    $('#AssetsTable').DataTable().ajax.reload();
                //    $('#CreateModal').modal("hide");
                //} else {
                //    alert("Data failed to create")
                //}
                //$('#AssetsTable').DataTable().ajax.reload();
                //$('#CreateModal').modal("hide");
                console.log(result)
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

function password_show_hide() {
    var x = document.getElementById("password");
    var show_eye = document.getElementById("show_eye");
    var hide_eye = document.getElementById("hide_eye");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
        x.type = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
    } else {
        x.type = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";
    }
}
