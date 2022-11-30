google.charts.load('current', {
    'packages':['gauge']
});

google.charts.setOnLoadCallback(drawCpuChart);
google.charts.setOnLoadCallback(drawCpuMhzChart);

function drawCpuMhzChart(value) {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['MHz', value]
    ]);
    var options = {
        min: 0,
        max: 3700,
        width: 500,
        height: 700,
        greenFrom: 0,
        greenTo: 2800,
        yellowFrom: 2800,
        yellowTo: 3400,
        redFrom: 3400,
        redTo: 3700,
        minorTicks: 5,
        animation: {
            duration: 400,
            startup: true,
            easing: 'inAndOut',
        }
    };
    var chart = new google.visualization.Gauge(document.getElementById('chart-gauge-cpu-mhz'));
    chart.draw(data, options);
}

async function chartsUpdater() {
    while(true) {
        await sleep(500);
        doRequest('cpu_usage', function (jsonObject) {
            drawCpuChart(jsonObject.cpuPercentage);
        });
        doRequest('cpu_mhz', function (jsonObject) {
            let mhz = jsonObject.mhz;
            drawCpuMhzChart(Number(mhz));
        });
    }
}

function onLoad() {
    chartsUpdater();
}

onLoad();