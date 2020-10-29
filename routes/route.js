// import external modules
const express = require('express');
const url = require('url');
const fs = require('fs');
const fetch = require('node-fetch');
const { OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

// create router
const router = express.Router();

let languageData;
try {
    languageData = require('../datastore/language.json');
} catch (error) {
    languageData = [];
}

router.post('/languagejson', (req, res) => {
    const language = req.body.language;
    if (isLanguageSupported(language)) {
        res.status(OK).json(languageData.languages[language]);
    } else {
        res.status(NOT_FOUND);
    }
});

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
        content = fs.readFileSync('./public/index.html');
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
