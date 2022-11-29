//var consoleInput = document.getElementById("console-input");
/*consoleInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        enterClicked();
    }
});
*/

function buildUrl(requestType) {
    return 'http://192.168.5.106:7777/' + requestType;
}

function appendCommandOuput(output) {
    let div = document.createAttribute("p");
    div.innerHTML = output;
    if(Array.isArray(output)) {
        output = output.join(' ');
    }
    document.getElementById("console-output").append(output);
}

//console provided by https://stackoverflow.com/questions/12905726/whats-the-best-way-to-simulate-a-dos-or-terminal-screen-in-a-web-page (answered Oct 5, 2020 at 23:05 Danziger)

const history = document.getElementById('history');
const input = document.getElementById('input');
const cursor = document.getElementById('cursor');

function focusAndMoveCursorToTheEnd(e) {  
  input.focus();
  
  const range = document.createRange();
  const selection = window.getSelection();
  const { childNodes } = input;
  const lastChildNode = childNodes && childNodes.length - 1;
  
  range.selectNodeContents(lastChildNode === -1 ? input : childNodes[lastChildNode]);
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);
}

async function doPostRequest(requestType, body, onLoad) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        let url = buildUrl(requestType);
        request.open('POST', url);
        request.responsetype = 'json';
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = async function() {
            let jsonObject = JSON.parse(request.response);
            console.log(jsonObject);
            let { commandOutput } = jsonObject
            if(Array.isArray(commandOutput)) {
                commandOutput = commandOutput.join(' ');
            }
            resolve(commandOutput);
        }
        request.send(JSON.stringify(body));
    });
}

async function handleCommand(command) {
  const line = document.createElement('DIV');
  let output = await doPostRequest("command", { command });
  console.log(output);
  output = output;
  line.textContent = `> ${ output }`;
  history.appendChild(line);
}

// Every time the selection changes, add or remove the .noCursor
// class to show or hide, respectively, the bug square cursor.
// Note this function could also be used to enforce showing always
// a big square cursor by always selecting 1 chracter from the current
// cursor position, unless it's already at the end, in which case the
// #cursor element should be displayed instead.
document.addEventListener('selectionchange', () => {
  if (document.activeElement.id !== 'input') return;
  
  const range = window.getSelection().getRangeAt(0);
  const start = range.startOffset;
  const end = range.endOffset;
  const length = input.textContent.length;
  
  if (end < length) {
    input.classList.add('noCaret');
  } else {
    input.classList.remove('noCaret');
  }
});

input.addEventListener('input', () => {    
  // If we paste HTML, format it as plain text and break it up
  // input individual lines/commands:
  if (input.childElementCount > 0) {
    const lines = input.innerText.replace(/\n$/, '').split('\n');
    const lastLine = lines[lines.length - 1];
    
    for (let i = 0; i <= lines.length - 2; ++i) {
      handleCommand(lines[i]);
    }
  
    input.textContent = lastLine;
    
    focusAndMoveCursorToTheEnd();
  }
  
  // If we delete everything, display the square caret again:
  if (input.innerText.length === 0) {
    input.classList.remove('noCaret');  
  }  
});

document.addEventListener('keydown', (e) => {   
  // If some key is pressed outside the input, focus it and move the cursor
  // to the end:
  if (e.target !== input) focusAndMoveCursorToTheEnd();
});

input.addEventListener('keydown', async function (e) {    
  if (e.key === 'Enter') {
    e.preventDefault();
    if(input.textContent == "clear") {
        history.innerHTML = "";
    } else {
        await handleCommand(input.textContent);
    }
    input.textContent = '';
    focusAndMoveCursorToTheEnd();
  }
});

// Set the focus to the input so that you can start typing straigh away:
input.focus();


