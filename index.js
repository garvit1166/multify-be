const fs = require("fs");
const express = require("express");
const { server, wss, app } = require("./websocket.js");

const cors = require("cors");
app.use(express.json());

const {
  readLastLines,
  getNewLinesAdded,
  sendDataToClient,
} = require("./utils/utils.js");

app.use(cors());

const LOGFILE = "logs";

let offset = 0;

let fileContent = fs.readFileSync(LOGFILE, "utf8");
offset = fileContent.split("\n").length;

async function watchFileForChanges(filename) {
  fs.watch(filename, async (eventType, filename) => {
    if (eventType === "change") {
      const { lines, newOffset } = await getNewLinesAdded(LOGFILE, offset);
      sendDataToClient(lines);
      offset = newOffset;
    }
  });
}
watchFileForChanges(LOGFILE);

app.get("/log", async (req, res) => {
  try {
    const data = await readLastLines(LOGFILE);
    res.send(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.listen(8080, function () {
  console.log("server listening on http://localhost:8080");
});

wss.on("connection", async function connection(ws) {
  console.log("A new client connected");
  //    way 2 using web socket to send initial data
  //   const data = await readLastLines(LOGFILE);
  //   sendDataToClient(data);
  ws.on("message", function incoming(message) {
    console.log("Received message from client:", message);
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});
