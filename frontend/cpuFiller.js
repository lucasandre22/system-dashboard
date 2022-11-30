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

/*
{
    "model": "Intel(R) Core(TM) i5-1035G7 CPU @ 1.20GHz",
    "family": "6",
    "byte_order": "Little Endian",
    "mhz": "3700.0000",
    "cores": "8",
    "thread_cores": "2",
    "socket": "1",
    "socket_cores": "4",
    "architeture": "x86_64",
    "l1d": "192 KiB (4 instances)",
    "l1i": "128 KiB (4 instances)",
    "l2": "2 MiB (4 instances)",
    "l3": "6 MiB (1 instance)",
    "bogomips": "2995.20"
}
*/
function fillCpuInfo() {
    doRequest('cpu', function (jsonObject) {
        getId('processor-name').innerHTML = jsonObject.model;
        getId('processor-mhz').innerHTML = jsonObject.mhz + "Mhz (heartbeat)";
        getId('processor-cores').innerHTML =  jsonObject.cores + " cores";
        getId('processor-architeture').innerHTML = "Architeture " + jsonObject.architeture;
        getId('processor-threads-cores').innerHTML = "Threads per cores: " + jsonObject.thread_cores;
        getId('processor-socket').innerHTML = "Socket (s): " + jsonObject.socket;
        getId('processor-socket-core').innerHTML = "Socket cores: " + jsonObject.socket_cores;
        getId('processor-l1d').innerHTML = "Cache L1d: " + jsonObject.l1d;
        getId('processor-l1i').innerHTML = "Cache L1i: " + jsonObject.l1i
        getId('processor-l2').innerHTML = "Cache L2: " + jsonObject.l2;
        getId('processor-l3').innerHTML = "Cache L3: " + jsonObject.l3;
        getId('processor-bogomips').innerHTML = "Bogomips: " + jsonObject.bogomips;
    });
}

function onLoad() {
    chartsUpdater();
    fillCpuInfo();
}

onLoad();
