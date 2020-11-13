// import external modules
const express = require('express');
const url = require('url');
const fs = require('fs');
const fetch = require('node-fetch');
const { OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND, METHOD_NOT_ALLOWED } = require('http-status-codes');
const { sort } = require('mathjs');

// create router
const router = express.Router();

let languageData;
try {
    languageData = require('../datastore/language.json');
} catch (error) {
    languageData = [];
}

let configData;
try {
    configData = require('../datastore/configs.json');
} catch (error) {}

router.post('/languagejson', (req, res) => {
    const language = req.body.language;
    if (isLanguageSupported(language)) {
        res.status(OK).json(languageData.languages[language]);
    } else {
        res.status(NOT_FOUND);
    }
});

router.post('/serverjson', (req, res) => {
    const token = req.body.token;
    let allServers = [];
    fetch('https://discord.com/api/users/@me/guilds', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((discordRes) => discordRes.json())
        .then((servers) => {
            configData.forEach((server) => {
                let foundServer = servers.find((element) => element.id == server.guildId);
                if (foundServer) {
                    allServers.push(foundServer);
                }
            });
            if (allServers) {
                res.status(OK).json(betterSort(servers));
            } else {
                res.status(NOT_FOUND);
            }
        });
});
router.post('/serverinformation', async (req, res) => {
    const token = req.body.token;
    const id = req.body.id;
    let serverinformation = {
        guild: null,
        roles: null,
        channels: null,
    };
    let discordRes = await fetch('https://discord.com/api/users/@me/guilds', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    let servers = await discordRes.json();
    if(servers){
    let sharedAdminServer = getSharedAdminServers(servers);
    serverinformation.guild = servers.find((element) => element.id == id);
        if (sharedAdminServer.find((element) => element.id == id)) {
            let roles = await fetch(`https://discord.com/api/guilds/${id}/roles`, {
                method: 'GET',
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`,
                },
            });
            roles = await roles.json();
            if(roles){
                serverinformation.roles = roles;
            }
            let channels = await fetch(`https://discord.com/api/guilds/${id}/channels`, {
                method: 'GET',
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`,
                },
            });
            channels = await channels.json();
            if(channels){
                serverinformation.channels = channels;
            }
            if(serverinformation.channels != null && serverinformation.roles != null){
                if (serverinformation) {
                    console.log("send back");
                    res.status(OK).json(serverinformation);
                } else {
                    res.status(NOT_FOUND);
                }
            }
        }
    }
});
function getSharedAdminServers(userServer) {
    let botServerIDs = [];
    configData.forEach((server) => botServerIDs.push(server.guildId));
    let userServerIDs = [];
    userServer.forEach((server) => userServerIDs.push(server.id));
    let sharedAdminServer = [];

    userServerIDs.forEach((server) => {
        let found = userServer.find((element) => element.id == server);
        if (found.permissions == '2147483647') {
            if (botServerIDs.includes(server)) {
                sharedAdminServer.push(found);
            }
        }
    });
    return sharedAdminServer;
}
function betterSort(userServer) {
    let botServerIDs = [];
    configData.forEach((server) => botServerIDs.push(server.guildId));
    let userServerIDs = [];
    userServer.forEach((server) => userServerIDs.push(server.id));

    let sharedAdminServer = [];
    let sharedServer = [];
    let userOnlyServer = [];
    let sortedServers = [];

    userServerIDs.forEach((server) => {
        let found = userServer.find((element) => element.id == server);
        if (found.permissions == '2147483647') {
            if (botServerIDs.includes(server)) {
                sharedAdminServer.push(found);
            } else {
                userOnlyServer.push(found);
            }
        } else if (botServerIDs.includes(server)) {
            sharedServer.push(found);
        }
    });

    sharedAdminServer.sort();
    sharedAdminServer.reverse();

    sharedServer.sort();
    sharedServer.reverse();

    userOnlyServer.sort();
    userOnlyServer.reverse();

    sortedServers.push(sharedAdminServer);
    sortedServers.push(sharedServer);
    sortedServers.push(userOnlyServer);

    return sortedServers;
}

router.get('/discord', (req, res) => {
    let responseCode = 404;
    let content = '404 Error';
    const urlObj = url.parse(req.url, true);
    if (urlObj.query.code) {
        const accessCode = urlObj.query.code;
        const data = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000',
            code: accessCode,
            scope: 'identify guilds',
        };
        fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((discordRes) => discordRes.json())
            .then((info) => {
                console.log(info);
                return info;
            })
            .then((info) =>
                fetch('https://discord.com/api/users/@me', {
                    headers: {
                        authorization: `${info.token_type} ${info.access_token}`,
                    },
                })
            )
            .then((userRes) => userRes.json())
            .then(console.log);
    }
    if (urlObj.pathname == '/discord') {
        responseCode = 200;
        content = fs.readFileSync('./routes/redirect.html');
    }

    res.writeHead(responseCode, {
        'content-type': 'text/html;charset=utf-8',
    });
    res.write(content.toLocaleString());
    res.end();
});

function isLanguageSupported(language) {
    for (key in languageData.languages) {
        if (key == language) {
            return true;
        }
    }
    return false;
}

// // read single task
// router.get('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const task = tasks.find((task) => task.id === id);

//     if (!task) {
//         res.sendStatus(NOT_FOUND);
//         return;
//     }

//     res.status(OK).json(task);
// });

// // create task
// router.post('/', (req, res) => {
//     const action = req.body.action;
//     const done = req.body.done;

//     if (typeof action !== 'string' || action === '') {
//         res.status(BAD_REQUEST).send('action missing or not ok');
//         return;
//     }

//     if (typeof done !== 'boolean') {
//         res.status(BAD_REQUEST).send('done missing or not ok');
//         return;
//     }

//     const task = { id: nextId++, action, done };
//     tasks.push(task);
//     res.status(CREATED).json(task);
// });

// // update task
// router.put('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const task = tasks.find((task) => task.id === id);

//     if (!task) {
//         res.sendStatus(NOT_FOUND);
//         return;
//     }

//     const action = req.body.action;
//     const done = req.body.done;

//     if (typeof action !== 'string' || action === '') {
//         res.status(BAD_REQUEST).send('action missing or not ok');
//         return;
//     }

//     if (typeof done !== 'boolean') {
//         res.status(BAD_REQUEST).send('done missing or not ok');
//         return;
//     }

//     task.action = action;
//     task.done = done;
//     res.sendStatus(NO_CONTENT);
// });

// // delete all tasks
// router.delete('/', (req, res) => {
//     tasks.splice(0);
//     res.sendStatus(NO_CONTENT);
// });

// // delete single task
// router.delete('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const index = tasks.findIndex((task) => task.id === id);

//     if (index < 0) {
//         res.sendStatus(NOT_FOUND);
//         return;
//     }

//     tasks.splice(index, 1);
//     res.sendStatus(NO_CONTENT);
// });

// export router
module.exports = router;
