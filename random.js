const fs = require('fs');

// Function to generate random time in IST (Indian Standard Time)
function getRandomISTTime() {
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const now = new Date(Date.now() + ISTOffset);
    return now.toISOString().replace('T', ' ').replace(/\..+/, '');
}

// Function to generate random log line
function generateRandomLog() {
    const logNumber = Math.floor(Math.random() * 1000) + 1; // Generate random log number
    const randomTime = getRandomISTTime(); // Get random IST time
    const randomText = generateRandomText(); // Generate random text
    return `Log${logNumber},${randomTime}-${randomText}`;
}

// Function to generate random text
function generateRandomText() {
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const textLength = Math.floor(Math.random() * 50) + 10; // Random text length between 10 and 60 characters
    let randomText = '';
    for (let i = 0; i < textLength; i++) {
        randomText += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return randomText;
}

// Function to write random lines into a text file
function writeRandomLines(filename, linesCount) {
    let data = '';
    for (let i = 0; i < linesCount; i++) {
        data += generateRandomLog() + '\n';
    }
    fs.writeFile(filename, data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log(`Successfully wrote ${linesCount} random lines to ${filename}`);
        }
    });
}

// Usage: node script.js filename.txt numberOfLines
const filename = process.argv[2];
const numberOfLines = parseInt(process.argv[3]);

if (!filename || isNaN(numberOfLines) || numberOfLines <= 0) {
    console.error('Usage: node script.js filename.txt numberOfLines');
} else {
    writeRandomLines(filename, numberOfLines);
}
