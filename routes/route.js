// import external modules
const express = require('express');
const { OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

// create router
const router = express.Router();

let languageData;
try {
    languageData = require('../datastore/language.json');
} catch (error) {
    languageData = [];
}

// read all tasks
router.post('/languagejson', (req, res) => {
    const language = req.body.language;
    if (isLanguageSupported(language)) {
        res.status(OK).json(languageData.languages[language]);
    } else {
        res.status(NOT_FOUND);
    }
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
