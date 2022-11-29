function buildUrl(requestType) {
    return 'http://192.168.5.106:7777/' + requestType;
}

async function doRequest(requestType, onLoad) {
    let request = new XMLHttpRequest();
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