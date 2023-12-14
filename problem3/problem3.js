
const fs = require('fs');
const readline = require('readline');

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
        findParts(array)
        // test(array);
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
        var previousRow = []
        var nextRow = array[parseInt(rowIndex) + 1 || []]
        if(rowIndex != 0) {
            previousRow = array[parseInt(rowIndex) - 1]
        }
        if(rowIndex != array.length - 1) {
            nextRow = array[parseInt(rowIndex) + 1]
        }

        for(var char in currentRow) {
            if((Number(currentRow[char]) || currentRow[char] == 0) && (currentRow[char] != ".") && char != currentRow.length - 1) {
                if(firstIndex) {
                    lastIndex = parseInt(char) + 1;
                } else {
                    firstIndex = char;
                    lastIndex = parseInt(char) + 1;
                }
            } else if (firstIndex || char == currentRow.length - 1) {
                if(Number(currentRow[char])) {
                    console.log("NICE");
                    lastIndex = parseInt(char + 1);
                }
                var check = false;
                var num = parseInt(currentRow.substring(firstIndex, lastIndex));
                check = checkRow(currentRow, firstIndex, lastIndex)
                if (previousRow && previousRow.length > 0 && !check){
                    if(checkRow(previousRow, firstIndex, lastIndex)) {
                        check = true;
                    };
                }
                if (nextRow && nextRow.length > 0 && !check) {
                    if(checkRow(nextRow, firstIndex, lastIndex)) {
                        check = true;
                    };
                }
                if(check) {
                    console.log("NUM", num);
                    total += num
                }
                firstIndex = "";
                lastIndex = "";
            }
        }
        firstIndex = "";
        lastIndex = "";
    }
    console.log(total)
}

function checkRow (row, first, last) {
    var firstIndex;
    var lastIndex;

    var substring;
    if(first == 0){
        firstIndex = 0;
    } else {
        firstIndex = first - 1;
    }
    if (last == row.length - 1) {
        lastIndex = last;
    } else {
        lastIndex = last + 1;
    }
    console.log(firstIndex);
    console.log(firstIndex, lastIndex)

    substring = row.substring(firstIndex, lastIndex);
    if(!Number(substring)) {
        for(var i = 0; i < substring.length; i++) {
            if(!Number(substring.charAt(i)) && substring.charAt(i) != ".") {
                return true;
            }
        }
    }
    return false;
}

function test (array) {
    var previousRow = array[6];
    var currentRow = array[7];
    var nextRow = array[8];
    var firstIndex;
    var lastIndex;
    var total = 0;
    for(var char in currentRow) {
        if((Number(currentRow[char]) || currentRow[char] == 0) && (currentRow[char] != ".") && char != currentRow.length - 1) {
            if(firstIndex) {
                console.log(lastIndex)
                lastIndex = parseInt(char) + 1;
            } else {
                firstIndex = char;
                lastIndex = parseInt(char) + 1;
            }
        } else if (firstIndex || char == currentRow.length - 1) {
            if(Number(currentRow[char])) {
                lastIndex = parseInt(char) + 1;
            }
            console.log(currentRow.substring(firstIndex, lastIndex), "YAY");
            console.log("firstIndex", firstIndex);
            var num = parseInt(currentRow.substring(firstIndex, lastIndex));
            if(!Number(num)) {
                console.log(num, firstIndex, lastIndex, rowIndex)
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
                console.log("NICE", num);
                if(checkRow(nextRow, firstIndex, lastIndex)) {
                    total += num;
                };
            }
            firstIndex = "";
            lastIndex = "";
        }
    }
}

getInput();
findParts();
