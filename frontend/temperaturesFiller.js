google.charts.load('current', {
    'packages':['corechart','table','bar']
});

var chartCpu;
var chartDisk;
var chartWifi;
var chartLabels =  ["-8 sec", "-7 sec", "-6 sec", "-5 sec", "-4 sec", "-3 sec", "-2 sec", "-1 sec", "0"];

function createLineChart(id) {
    var ctx2 = document.getElementById(id).getContext("2d");
    let chart = new Chart(ctx2, {
        type: "line",
        data: {
        labels: [],
        datasets: [{
            label: "",
            tension: 0,
            borderWidth: 0,
            pointRadius: 5,
            pointBackgroundColor: "rgba(255, 255, 255, .8)",
            pointBorderColor: "transparent",
            borderColor: "rgba(255, 255, 255, .8)",
            borderColor: "rgba(255, 255, 255, .8)",
            borderWidth: 4,
            backgroundColor: "transparent",
            fill: true,
            data: [],
            maxBarThickness: 6
    
        }],
        },
        options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
            display: false,
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        scales: {
            y: {
                max: 100,
                min: 0,
                grid: {
                    //drawBorder: false,
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                    borderDash: [5, 5],
                    color: 'rgba(255, 255, 255, .4)'
                },
                ticks: {
                    display: true,
                    color: '#f8f9fa',
                    padding: 10,
                    font: {
                    size: 14,
                    weight: 300,
                    family: "Roboto",
                    style: 'normal',
                    lineHeight: 2
                    },
                }
            },
            x: {
            grid: {
                drawBorder: false,
                //display: false,
                drawOnChartArea: false,
                //drawTicks: false,
                borderDash: [5, 5]
            },
            ticks: {
                display: true,
                color: '#f8f9fa',
                padding: 10,
                font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: 'normal',
                lineHeight: 2
                },
            }
            },
        },
        },
    });
    chart.update('none');
    return chart;
}

function addData(chart, data, labelToAdd) {
    if(labelToAdd != "") {
        chart.data.labels.unshift(labelToAdd);
        console.log("Push!");
    }
    
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });

    chart.update('none');
}

function shiftData(chart) {
    chart.data.datasets[0].data.shift();
}

/*
{
	"core": "+45.0°C",
	"wifi": "+36.0°C",
	"disk": "+24.9°C"
}
*/
async function updateTemperaturesCharts() {
    let times = 0;
    while(true) {
        doRequest('temperature', function (jsonObject) {
            if(times > 8) {
                shiftData(chartCpu);
                shiftData(chartDisk);
                shiftData(chartWifi);
            }
            let labelToAdd = "";
            if(chartLabels.length > 1) {
                labelToAdd = chartLabels.pop();
            }
            addData(chartCpu, jsonObject.core.split(".")[0].split('+')[1], labelToAdd);
            addData(chartDisk, jsonObject.wifi.split(".")[0].split('+')[1], labelToAdd);
            addData(chartWifi, jsonObject.disk.split(".")[0].split('+')[1], labelToAdd);
            times++;
        });
        await sleep(1000);
    }
}

function onLoad() {
    chartCpu = createLineChart("chart-cpu-temperature");
    chartDisk = createLineChart("chart-disk-temperature");
    chartWifi = createLineChart("chart-wifi-temperature");
    updateTemperaturesCharts();
}   

onLoad();

/*var data = [
        ["5", "10", "15", "20", "25", "30", "35", "40", "45"],
        [{
            label: "Mobile apps",
            tension: 0,
            borderWidth: 0,
            pointRadius: 5,
            pointBackgroundColor: "rgba(255, 255, 255, .8)",
            pointBorderColor: "transparent",
            borderColor: "rgba(255, 255, 255, .8)",
            borderWidth: 4,
            backgroundColor: "transparent",
            fill: true,
            data: dataArray,
            maxBarThickness: 6

        }]
    ];
    var options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
            display: false,
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        scales: {
            y: {
            grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
                color: 'rgba(255, 255, 255, .2)'
            },
            ticks: {
                display: true,
                padding: 10,
                color: '#f8f9fa',
                font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: 'normal',
                lineHeight: 2
                },
            }
            },
            x: {
            grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5]
            },
            ticks: {
                display: true,
                color: '#f8f9fa',
                padding: 10,
                font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: 'normal',
                lineHeight: 2
                },
            }
            },
        },
    }*/