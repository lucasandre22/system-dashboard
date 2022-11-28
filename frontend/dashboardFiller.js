google.charts.load('current', {
    'packages':['corechart','table','bar']
});



/*var ctx2 = document.getElementById("chart-line").getContext("2d");

new Chart(ctx2, {
    type: "line",
    data: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
        label: "Mobile apps",
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
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
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
    },
});*/

var ctx3 = document.getElementById("chart-line-tasks").getContext("2d");

new Chart(ctx3, {
    type: "line",
    data: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
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
        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
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
    },
});

function buildUrl(requestType) {
    return 'http://192.168.5.106:7777/' + requestType;
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

function getId(id) {
    return document.getElementById(id);
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

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Rank', 3]
    ]);
    
    var options = {
        width: 250,
        height: 250,
        redFrom: 20,
        redTo: 10,
        yellowFrom: 10,
        yellowTo: 5,
        greenFrom: 5,
        greenTo: 0,
        minorTicks: 20,
        max: 0,
        min: 20,
        majorTicks: ['20', '1']
    };
    var chart = google.visualization.Gauge(document.getElementById('chart-line'));
    chart.draw(data, options);
}

function dashboardPageLoad() {
    fillCpuInfo();
    fillRamInfo();
    fillDiskMemory();
    doRequest('os', fillOsInfo); //padronize to this
    resetLastUpdatedTime();
}

dashboardPageLoad();

google.charts.load('current', {
    packages: ['gauge']
  }).then(function () {
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['ALCANCE', 80],
      ['OBJETIVO', 55],
      ['MEDICOS TOP', 68]
    ]);
  
    var options = {
      width: 600, height: 220,
      redFrom: 0, redTo: 75,
      yellowFrom:75, yellowTo: 85,
      greenFrom:85 , greenTo:100,
      minorTicks: 5,
      majorTicks: ['0.00%', '100.00%'],
      min: 0,
      max: 100
    };
  
    var chart = new google.visualization.Gauge(document.getElementById('chart-line').getContext("2d"));
  
    var formatnumbers = new google.visualization.NumberFormat({
      suffix: '%',
      fractionDigits: 2
    });
    formatnumbers.format(data, 1);
    console.log(chart);
    chart.draw(data, options);
  });