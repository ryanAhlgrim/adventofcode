const fs = require('fs');
const readline = require('readline');

var format;
async function getInput (){
    try {
        var arrayR = [];
        var arrayL = [];
        var otherArray = []
        const rl = readline.createInterface({
            input: fs.createReadStream('problem8/input.txt'),
            crlfDelay: Infinity
        })
        var count = false;
        rl.on('line', (line) => {
            if(!count){
                format = line;
                count = true
            } else if(!line.replace(" ", "")) {
            } else {
                if(line.substring(0, line.indexOf(" "))) {

                }
                otherArray.push(line.substring(0, line.indexOf(" ")))
                arrayL.push(line.substring(7,10));
                arrayR.push(line.substring(12,15))
            }
        })
        await new Promise((res) => rl.once('close', res))
        findParts(arrayL, arrayR, otherArray)
        // test(array);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

function findParts(arrayL, arrayR, indexArray) {
    var count = 0;
    var pos = 0;
    currentNum = indexArray.indexOf("AAA");
    while(true){
        count++;

        if(pos == format.length) {
            pos = 0;
        }
        if(format.charAt(pos) == 'R'){
            if(arrayR[currentNum] == "ZZZ") {
                console.log(count)
                process.exit(0);
            } else {
                if(currentNum == indexArray.indexOf(arrayR[currentNum])) {
                    currentNum == indexArray.indexOf(arrayR[currentNum] + 1)
                } else {
                    currentNum = indexArray.indexOf(arrayR[currentNum]);

                }
            }
        } else if(format.charAt(pos) == 'L'){
            if(arrayL[currentNum] == "ZZZ") {
                console.log(count);
                process.exit(0);
            } else {
                if(currentNum == indexArray.indexOf(arrayL[currentNum])) {
                    console.log(indexArray[currentNum])
                    currentNum == indexArray.indexOf(arrayL[currentNum] + 1);
                } else {
                    currentNum = indexArray.indexOf(arrayL[currentNum]);
                }

            }
        }
        pos++;
        // console.log(count);
    }
}

getInput();