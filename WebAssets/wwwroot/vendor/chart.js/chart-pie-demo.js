let assetsName = []
let totalBorrower = []

$.ajax({
    "type": "GET",
    "url": urlBackend + "/BorrowAssets/Request/MostFrequentlyBorrowAssets",
    "contentType": "application/json; charset=utf-8",
    "dataType": "json",
    "success": function (result) {
        var obj = result.data;

        obj.forEach((data, index, arr) => {
            assetsName.push(data.name)
            $("#asset-" + index).html(data.name)

            totalBorrower.push(data.total_Borrower)
        })
    },
    "async": false,
    "error": function (e) {
        console.log(e);
    }
})

//console.log(assetsName)
//console.log(totalBorrower)

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

$(window).on("load", function () {
    // Pie Chart Example
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: assetsName,
            datasets: [{
                data: totalBorrower,
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });
})