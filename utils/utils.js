const fs = require("fs");
const readline = require("readline");
const {wss}=require("../websocket");
const WebSocket = require("ws");
const LOGFILE = "logs";

const getNewLinesAdded = async (filename, offset) => {
  try {
    const fileStream = fs.createReadStream(filename, { start: offset });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    const lines = [];
    let currentLine = 0;

    for await (const line of rl) {
      if (currentLine >= offset) {
        lines.push(line);
      }
      currentLine++;
    }

    offset = currentLine;
    return { lines , newOffset:offset};
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
const sendDataToClient = (data) => {
    wss &&
      wss.clients &&
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
  };
const readLastLines = async (filePath) => {
  const lines = [];
  let lineCount = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    lines.push(line);
    lineCount++;

    if (lineCount > 10) {
      lines.shift();
    }
  }

  return lines;
};



module.exports = {
  readLastLines,
  getNewLinesAdded,
  sendDataToClient
};
