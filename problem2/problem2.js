const readline = require('readline');
const fs = require('fs');

async function getInput (){
    try {
        var array = [];
        const rl = readline.createInterface({
            input: fs.createReadStream('problem2/testInput.txt'),
            crlfDelay: Infinity
        })

        rl.on('line', (line) => {
            // console.log(line)
            array.push(line);
        })
        await new Promise((res) => rl.once('close', res))
        cubeGame(array)
        // test(array);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

function cubeGame (array) {
    for(var index in array) {
        if(array[index].includes('blue')){
            var index = array[index].indexOf(('blue') - 2);
            var substring = "12 blue"
            while(substring.includes('blue')){
                console.log(substring)
                substring = substring.substring(index + 5);
            }
        }
    }
}

getInput();