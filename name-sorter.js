const fs = require('fs');
const es = require('event-stream');

const compareNames = (a, b) => {
    const firstWords = a.split(' ');
    const secondWords = b.split(' ');

    const firstLastName = firstWords.pop();
    const secondLastName = secondWords.pop();

    const result = firstLastName.localeCompare(secondLastName);

    if (result === 0) {
        const nextFirstWords = firstWords.join(' ');
        const nextSecondWords = secondWords.join(' ');

        if (nextFirstWords || nextSecondWords) {
            return compareNames(firstWords.join(' '), secondWords.join(' '));
        }
        return 0;
    }

    return result;
}

const filepath = process.argv[process.argv.length - 1];

var lines = [];

var s = fs.createReadStream(filepath)
    .pipe(es.split())
    .pipe(es.mapSync(function (line) {
        s.pause();
        lines.push(line);
        s.resume();
    })
        .on('error', function (err) {
            console.log('Error:', err);
        })
        .on('end', function () {
            lines.sort(compareNames);
            console.log(lines.join('\n'));
            const file = fs.createWriteStream('sorted-names-list.txt');
            file.on('error', function (err) { /* error handling */ });
            lines.forEach(function (v) {
                if (v) {
                    file.write(v + '\n');
                }
            });
            file.end();
        })
    );