
/*
{
	"totalGb": "102.9",
	"usedGb": "26.3",
	"freeGb": "76.6",
	"usedPercentage": "25.6",
	"freePercentage": "74.4"
}
*/
async function fillDriverGraphic() {
    doRequest('driver', function (jsonObject) {
        
        var ctxP = document.getElementById("chart-driver-usage").getContext('2d');
        var myPieChart = new Chart(ctxP, {
            type: 'pie',
            data: {
            labels: ["Free space (%)", "Used space (%)"],
            datasets: [{
                data: [jsonObject.freeGb, jsonObject.usedGb],
                backgroundColor: ["#3367d6", "#7baaf7"],
                hoverBackgroundColor: ["#5AD3D1", "#5AD3D1"]
            }]
            },
            options: {
            responsive: true,
            animation: {
                duration: 3000
            }
            }
        });
    });
    
}

function findNextElement(array, index) {
    for(let i = index; i < array.length; i++) {
        if(array[i] != '')
            return i;
    }
    return 0;
}

async function fillPartitionsTable() {
    doRequest('filesystem', function (jsonObject) {
        let lines = jsonObject.output.split('\n');
        console.log(lines);
        let table = document.getElementById('partitions-table');
        
        for(let i = 1; i < lines.length-1; i++) {
            let tableLine = createTableLine();
            let line = lines[i].split(/\s+/);
            tableLine.appendChild(createTableCell(line[0]));
            tableLine.appendChild(createTableCell(line[1]));
            tableLine.appendChild(createTableCell(line[2]));
            tableLine.appendChild(createTableCell(line[3]));
            tableLine.appendChild(createTableCell(line[4]));
            tableLine.appendChild(createTableCell(line[5]));
            table.appendChild(tableLine);
        }
    });
}

function fillDriverInfo() {
    doRequest('driver', function (jsonObject) {
        let div = document.getElementById('driver-info');
        document.getElementById('driver-total-space').innerHTML += " " + jsonObject.totalGb + "GB";
        document.getElementById('driver-info-free').innerHTML += " " + jsonObject.usedGb + "GB";
        document.getElementById('driver-info-used').innerHTML += " " + jsonObject.freeGb + "GB";
    });
}


function onLoad() {
    fillDriverGraphic();
    fillPartitionsTable();
    fillDriverInfo();
}

function getTbody() {

}

function teste(element){
    let parent = element.parentNode.parentNode.parentNode;
    if(parent.children[1].classList.contains('collapse')) {
        parent.children[1].classList.remove("collapse");
    } else {
        parent.children[1].classList.add("collapse");
    }
    
}
onLoad();
