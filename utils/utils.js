const fs = require("fs");


const getLastTenLines = (filename) => {
    try {
        const fileContent = fs.readFileSync(filename, 'utf8');
        const lines = fileContent.split('\n');
        const lastTenLines = lines.slice(-10);
        return lastTenLines;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

const getNewLinesAdded = (filename, previousContent) => {
    try {
        const fileContent = fs.readFileSync(filename, 'utf8');
        const newContent = fileContent.split('\n');
        const previousContentArr = previousContent.split('\n');

        const newLinesAdded = newContent.filter(line => !previousContentArr.includes(line));

        return newLinesAdded;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}


module.exports = {
    getLastTenLines,
    getNewLinesAdded
}