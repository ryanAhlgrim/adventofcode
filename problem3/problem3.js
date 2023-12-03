
const fs = require('fs');
const readline = require('readline');
var test;
async function getInput (){
    try {
        var array = [];
        const rl = readline.createInterface({
            input: fs.createReadStream('problem3/input.txt'),
            crlfDelay: Infinity
        })

        rl.on('line', (line) => {
            array.push(line);
        })
        await new Promise((res) => rl.once('close', res))
        console.log(array);
        findParts(array)
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

function findParts(array) {
    var firstIndex;
    var lastIndex;
    var total = 0;
    // console.log(array);
    for(var rowIndex in array) {
        var currentRow = array[rowIndex];
        // console.log("rowIndex", currentRow);
        for(var char in currentRow) {
            if(Number(currentRow[char])) {
                if(firstIndex) {
                    lastIndex = currentRow[char];
                } else {
                    firstIndex = currentRow[char];
                    lastIndex = currentRow[char];
                }
            } else if (firstIndex) {
                var num = currentRow.substring(firstIndex, lastIndex);
                console.log(num);
            }
        }
    }
}
getInput();
findParts();
