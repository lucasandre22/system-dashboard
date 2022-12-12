google.charts.load('current', {
    'packages':['gauge']
});

//google.setOnLoadCallback(drawChart);

google.charts.setOnLoadCallback(drawCpuChart);
google.charts.setOnLoadCallback(drawRamChart);

function drawCpuChart() {
    drawCpuChart(0);
}

function drawRamChart() {
    drawRamChart(0);
}

function drawCpuChart(value) {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['CPU (%)', value]
    ]);
    var options = {
        greenFrom: 0,
        greenTo: 80,
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
        minorTicks: 5
    };
    var chart = new google.visualization.Gauge(document.getElementById('chart-gauge-cpu'));
    chart.draw(data, options);
    /*setTimeout(function() {
        console.log("lala");
        doRequest('cpu_usage', function (jsonObject) {
            var data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['CPU (%)', jsonObject.cpuPercentage],
            ]);
            chart.draw(data, options);
        });
        
    }, 1000);*/
}

function drawRamChart(value) {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['RAM (%)', value]
    ]);
    /*-        width: 500,
-        height: 700,*/
    var options = {
        greenFrom: 0,
        greenTo: 80,
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
        minorTicks: 5
    };
    var chart = new google.visualization.Gauge(document.getElementById('chart-gauge-ram'));
    chart.draw(data, options);
}

async function chartsUpdater() {
    while(true) {
        await sleep(500);
        doRequest('cpu_usage', function (jsonObject) {
            drawCpuChart(jsonObject.cpuPercentage);
        });
        doRequest('ram', function (jsonObject) {
            drawRamChart(jsonObject.usedMemPercentage);
        });
    }
}

async function doRequest(requestType, onLoad) {
    let request = new XMLHttpRequest();
    console.log("Doing request");
    let url = buildUrl(requestType);
    request.open('GET', url);
    request.responsetype = 'json';
    request.setRequestHeader("Access-Control-Allow-Origin", "origin-list");
    request.send();
    request.onload = function() {
        let jsonObject = JSON.parse(request.response);
        onLoad(jsonObject);
    }
}

/*
* CPU info
*
{
	"model": "Intel(R) Core(TM) i5-1035G7 CPU @ 1.20GHz",
	"mhz": "3700.0000",
	"cores": "8",
	"architeture": "x86_64"
}
*/
function fillCpuInfo() {
    doRequest('cpu', function (jsonObject) {
        let { mhz } = jsonObject;
        mhz = mhz.split('.')[0];
        getId('processor-name').innerHTML = jsonObject.model;
        getId('processor-mhz').innerHTML = mhz + "Mhz (heartbeat)";
        getId('processor-cores').innerHTML =  jsonObject.cores + " cores";
        getId('processor-architeture').innerHTML = "Architeture " + jsonObject.architeture;
    });
}

/*
* RAM info
*
{
	"totalMemMb": 7545.73,
	"usedMemMb": 5573.25,
	"freeMemMb": 1972.48,
	"usedMemPercentage": 73.86,
	"freeMemPercentage": 26.14
}
*/
function fillRamInfo() {
    doRequest('ram', function (jsonObject) {
        getId('ram-total').innerHTML = "Available Mb: " + jsonObject.totalMemMb;
    });
}

/*
* Memory info
*
{
	"totalGb": "102.9",
	"usedGb": "26.3",
	"freeGb": "76.6",
	"usedPercentage": "25.5",
	"freePercentage": "74.5"
}
*/
function fillDiskMemory() {
    doRequest('driver', function (jsonObject) {
        getId('driver-total').innerHTML = "Total: " + jsonObject.totalGb + "GB";
        getId('driver-free').innerHTML = "Free: " + jsonObject.freeGb + "GB";
        getId('driver-used').innerHTML = "Used: " + jsonObject.usedGb + "GB";
    });
}

/*
* OS info
*
{
	"platform": "linux",
	"distro": "Pop!_OS 22.04 LTS",
	"uptime": 18178.46,
	"ip": "192.168.5.106",
	"hostname": "surface",
	"type": "Linux",
	"arch": "x64",
	"kernel": "Linux 5.19.7-surface",
	"vendor": "Microsoft Corporation",
	"model": "Surface Laptop 3",
	"chassis": "laptop"
}
*/
/*<p id="os-type" class="mb-0 text-sm">OS: </p>
<p id="os-distro" class="mb-0 text-sm">Distribution: </p>
<p id="os-hostname" class="mb-0 text-sm">Device's name: </p>
<p id="os-ip" class="mb-0 text-sm">Ip: </p>
<p id="os-kernel" class="mb-0 text-sm"> </p>
<p id="os-vendor" class="mb-0 text-sm"> </p>
<p id="hardware-model" class="mb-0 text-sm"> </p>
<p id="hardware-chassis" class="mb-0 text-sm"> </p>*/
function fillOsInfo(jsonObject) {
    getId('os-type').innerHTML = "Operational system: " + jsonObject.type + " " + jsonObject.arch;
    getId('os-distro').innerHTML = "Distro: " + jsonObject.distro;
    getId('os-hostname').innerHTML = "Hostname " + jsonObject.hostname;
    getId('os-ip').innerHTML = "Ip: " + jsonObject.ip;
    getId('os-kernel').innerHTML = jsonObject.kernel;
    getId('os-vendor').innerHTML = jsonObject.vendor;
    getId('os-kernel').innerHTML = jsonObject.kernel;
    getId('hardware-model').innerHTML = jsonObject.model;
    getId('hardware-chassis').innerHTML = jsonObject.chassis;
    doRequest('os', function (jsonObject) {
        getId('os-type').innerHTML = "Operational system: " + jsonObject.type + " " + jsonObject.arch;
        getId('os-distro').innerHTML = "Distro: " + jsonObject.distro;
        getId('os-hostname').innerHTML = "Hostname " + jsonObject.hostname;
        getId('os-ip').innerHTML = "Ip: " + jsonObject.ip;
        getId('os-kernel').innerHTML = jsonObject.kernel;
        getId('os-vendor').innerHTML = jsonObject.vendor;
        getId('os-kernel').innerHTML = jsonObject.kernel;
        getId('hardware-model').innerHTML = jsonObject.model;
        getId('hardware-chassis').innerHTML = jsonObject.chassis;
        
    });
}

function resetLastUpdatedTime() {

}

function dashboardPageLoad() {
    fillCpuInfo();
    fillRamInfo();
    fillDiskMemory();
    doRequest('os', fillOsInfo); //padronize to this
    resetLastUpdatedTime();
    chartsUpdater();
}

dashboardPageLoad();
