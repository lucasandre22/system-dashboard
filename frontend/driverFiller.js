
/*
{
	"totalGb": "102.9",
	"usedGb": "26.3",
	"freeGb": "76.6",
	"usedPercentage": "25.6",
	"freePercentage": "74.4"
}
*/
async function myFunction() {
    doRequest('driver', function (jsonObject) {
        
        var ctxP = document.getElementById("chart-driver-usage").getContext('2d');
        var myPieChart = new Chart(ctxP, {
            type: 'pie',
            data: {
            labels: ["freeGb", "usedGb"],
            datasets: [{
                data: [jsonObject.freeGb, jsonObject.usedGb],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }]
            },
            options: {
            responsive: true,
            animation: {
                duration: 0
            }
            }
        });
    });
    
}

myFunction();