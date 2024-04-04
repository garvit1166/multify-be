
const fs = require("fs");
const express = require('express');
const { server, wss, app } = require('./websocket.js');
app.use(express.json());

const {getLast,getNew} = require('./utils/utils.js');

let lastLine;
const LOGFILE = "logs";

// app.get('/log', async (req, res) => {
//     try {
//         const data = await getLast(LOGFILE);
//         res.send(JSON.stringify({ filename: LOGFILE, data }));
//     } catch (error) {
//         console.error('Error fetching logs:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

server.listen(8080, function(){
    console.log("server listening on http://localhost:8080");
});

let connections = [];

wss.on('request', function(request) {
    console.log("connectd");
    connections.push(request.accept(null, request.origin));
});

wss.on('connect', connection => {
    getLast(LOGFILE)
    .then(lines => {
        connection.send(JSON.stringify({ filename: LOGFILE, lines }));
    })
    .catch(err => {
       connection.send(JSON.stringify( err ));
    });
    
    connection.on('close', function(connection) {
        let i = connections.indexOf(connection);
        connections.splice(i, 1)
    });
});

fs.watchFile(LOGFILE, (curr, prev) => {

    if (curr.ctimeMs == 0) {
        connections.forEach( c => {
            c.send(JSON.stringify( { error: "File doesn't exists at the moment." } ));
        });
    } else if (curr.mtime !== prev.mtime){
        getNew(LOGFILE, lastLine)
        .then(lines => {
            if (lines.length > 0) {
                connections.forEach( c => {
                    c.send(JSON.stringify({ filename: LOGFILE, lines }));
                });
            }
        })
        .catch(error => {
            connections.forEach( c => {
                c.send(JSON.stringify( { error } ));
            });
        });
    }
});
