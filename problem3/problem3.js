
const fs = require('fs');
const readline = require('readline');

async function getInput (){
    try {
        var array = [];
        const rl = readline.createInterface({
            input: fs.createReadStream('problem3/testInput.txt'),
            crlfDelay: Infinity
        })

        rl.on('line', (line) => {
            array.push(line);
        })
        await new Promise((res) => rl.once('close', res))
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
        var previousRow = array[parseInt(rowIndex) - 1 || []]
        var nextRow = array[parseInt(rowIndex) + 1 || []]
        // console.log("rowIndex", currentRow);
        for(var char in currentRow) {
            if((Number(currentRow[char]) || currentRow[char] == 0) && (currentRow[char] != ".")) {
                if(firstIndex) {
                    console.log(firstIndex)
                    lastIndex = parseInt(char) + 1;
                } else {
                    firstIndex = char;
                    lastIndex = parseInt(char) + 1;
                }
            } else if (firstIndex) {
                var num = parseInt(currentRow.substring(firstIndex, lastIndex));
                if(!Number(num)) {
                    console.log(num, firstIndex, lastIndex, rowIndex)
                    process.exit(0)
                }
                if(!Number(currentRow[lastIndex]) && currentRow[lastIndex] != "." && currentRow[lastIndex]){
                    total += num;
                }
                if (previousRow && previousRow.length > 0){
                    if(checkRow(previousRow, firstIndex, lastIndex)) {
                        total += num;
                    };
                }
                if (nextRow && nextRow.length > 0) {
                    if(checkRow(nextRow, firstIndex, lastIndex)) {
                        total += num;
                    };
                }
                firstIndex = "";
                lastIndex = "";
            }
        }
    }
    console.log(total)
}

function checkRow (row, first, last) {
    var substring = row.substring(first - 1 || 0, last + 1);
    if(!Number(substring)) {
        for(var i = 0; i < substring.length; i++) {
            if(!Number(substring.charAt(i)) && substring.charAt(i) != ".") {
                return true;
            }
        }
    }
    return false;
}

getInput();
findParts();
