// eslint-disable-next-line
let languageData;
let accessToken;
let isLoggedIn = false;
let userData;
onload();

async function onload() {
    languageData = await getLanguageData();

    if (languageData) {
        if (languageData.webInterface.tabTitle) {
            document.querySelector('title').innerHTML = languageData.webInterface.tabTitle;
        }
        for (text in languageData.webInterface) {
            let translation = document.querySelector('.' + text);
            if (translation) {
                translation.innerHTML = languageData.webInterface[text];
            }
        }
    }

    if (getCookie('access_token') && getCookie('access_token') != '') {
        let cookie = getCookie('access_token');

        accessToken = cookie;
        let userResponse = await fetchRestEndpoint('https://discord.com/api/users/@me', 'GET');
        if (userResponse) {
            isLoggedIn = true;
            accessToken = cookie;
            userData = userResponse;
            if (userData) {
                document.querySelector('.user-name').innerHTML = userData.username;
                document.querySelectorAll('.login').forEach((element) => {
                    element.style.visibility = 'visible';
                });
            }
        } else {
            redirect('http://localhost:3000/');
        }
    } else {
        redirect('http://localhost:3000/');
    }

    document.querySelector('.logout-btn').addEventListener('click', () => {
        setCookie('access_token', '', 7);
        isLoggedIn = false;
        userData = null;
        accessToken = null;
        document.querySelector('.user-name').innerHTML = '';
        document.querySelectorAll('.login').forEach((element) => {
            element.style.visibility = 'hidden';
        });
        redirect('http://localhost:3000/');
    });

    if (window.location.href.includes('account')) {
        if (isLoggedIn) {
            loadServers();
        }
    }

    if (window.location.href.includes('configurate')) {
        if (isLoggedIn) {
            loadConfiguration();
        }
    }
}

async function loadConfiguration() {
    const serverInformation = await fetchRestEndpoint('/api/serverinformation', 'POST', {
        token: accessToken,
        id: getCookie('serverId'),
    });
    const languages = await fetchRestEndpoint('/api/supportedlanguages', 'GET');
    if (serverInformation && languages) {
        let serverConfiguration;
        setTimeout(async () => {
            serverConfiguration = await fetchRestEndpoint('/api/serverconfiguration', 'POST', {
                token: accessToken,
                id: getCookie('serverId'),
            });
            if (serverConfiguration) {
                let configurationHtml = `
            <h2 class="config-general-headline">${languageData.webInterface.configGeneralHeadline}</h2><button class="config-save-button">${
                    languageData.webInterface.configSaveButton
                }</button><hr><br>
            <div class="config-general-layout">
                <div class="config-general-item">
                    <label class="student-roles" for="studentRoles">${languageData.webInterface.chooseStudent}</label><br>
                    <select class="student-select" name="studentRoles" id="studentRoles">
                    ${getRoleHtml(serverInformation.roles, serverConfiguration.studentId)}
                    </select><br>
                </div>
                <div class="config-general-item">
                    <label class="teacher-roles" for="studentRoles">${languageData.webInterface.chooseTeacher}</label><br>
                    <select class="teacher-select" name="studentRoles" id="studentRoles">
                    ${getRoleHtml(serverInformation.roles, serverConfiguration.teacherId)}
                    </select><br>
                </div>
                <div class="config-general-item">
                    <label class="timezones" for="timezones">${languageData.webInterface.chooseTimezone}</label><br>
                    <select class="timezone-select" name="timezones" id="timezones">
                    ${getTimeZoneHtml(serverConfiguration.timeZone)}
                    </select><br>
                </div>
                <div class="config-general-item">
                    <label class="teacher-roles" for="studentRoles">${languageData.webInterface.chooseTeacher}</label><br>
                    ${getLanguageHtml(languages, serverConfiguration.language)}
                </div>
                <div class="config-general-item">
                    <label class="timezones small-margin" for="timezones">${
                        languageData.webInterface.chooseNotificationsHeadline
                    }</label><br>
                    <p class="config-item-description">${languageData.webInterface.chooseNotificationsDescription}</p><br>
                    <label class="switch no-margin">
                        <input type="checkbox" ${serverConfiguration.notifications ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="config-general-item">
                    <label class="checktime small-margin" for="checktime">${languageData.webInterface.chooseCheckTimeHeadline}</label><br>
                    <p class="config-item-description">${languageData.webInterface.chooseCheckTime}</p><br>
                    <input type="number" min="0" value="${serverConfiguration.checktime}"> 
                </div>
                <div class="config-general-item">
                    <label class="timezones small-margin" for="timezones">${languageData.webInterface.chooseAutocheckHeadline}</label>
                    <p class="config-item-description">${languageData.webInterface.chooseAutocheckDescription}</p><br>
                    <label class="switch no-margin">
                        <input type="checkbox" ${serverConfiguration.autocheck ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="config-timetable">
                ${getTimetableHtml(serverConfiguration)}
            </div>`;
                document.querySelector('.configuration').innerHTML = configurationHtml;
            }
        }, 300);
    }
}

function getLanguageHtml(languages, choosenLanguage) {
    let languageHtml = `
    <input list="languages" name="language" value="${choosenLanguage}" id="language">
    <datalist id="languages">`;
    for (key in languages) {
        languageHtml += `<option value="${languages[key]}">`;
    }
    languageHtml += '</datalist>';
    return languageHtml;
}

function getTimeZoneHtml(timeZone) {
    let timeZoneHtml = '';
    let timeZoneIndex;
    if (timeZone) {
        timeZoneIndex = Number(timeZone.split('gmt')[1]);
        timeZoneHtml = `<option value="${timeZoneIndex}">GMT${timeZoneIndex >= 0 ? '+' : ''}${timeZoneIndex}</option>`;
    }
    for (i = 12; i >= -12; i--) {
        if (timeZoneIndex != i) {
            timeZoneHtml += `<option value="${i}">GMT${i >= 0 ? '+' : ''}${i}</option>`;
        }
    }
    return timeZoneHtml;
}

function getRoleHtml(roles, choosenRoleId) {
    let choosenRoleIndex = roles.findIndex((role) => role.id == choosenRoleId);
    let roleHtml;
    if (choosenRoleIndex) {
        const choosenRole = roles[choosenRoleIndex];
        roleHtml = `<option value="${choosenRole.id}">${choosenRole.name}</option>`;
        roles.splice(choosenRoleIndex, 1);
    }
    roles.sort((role1, role2) => (role1.position < role2.position ? 1 : -1));
    roles.forEach((element) => {
        roleHtml += `<option value="${element.id}">${element.name}</option>`;
    });
    return roleHtml;
}

function getTimetableHtml(serverConfiguration) {
    let timeTableHtml = `
    <h2 class="config-general-headline">${languageData.webInterface.configTimetableHeadline}</h2><button class="config-save-button">${
        languageData.webInterface.configSaveButton
    }</button><hr><br>
    <div class="config-timetable-content">
        ${getTimetableContentHtml(serverConfiguration)}
    </div>`;
    return timeTableHtml;
}

function getTimetableContentHtml(serverConfiguration) {
    let timeTablecontentHtml = `
        <div class="config-timetable-layout">
            <div class="config-timetable-headers">
                <div class="config-timetable-header">
                    ${languageData.webInterface.configMondayHeadline}
                </div>
                <div class="config-timetable-header">
                    ${languageData.webInterface.configTuesdayHeadline}
                </div>
                <div class="config-timetable-header">
                    ${languageData.webInterface.configWednesdayHeadline}
                </div>
                <div class="config-timetable-header">
                    ${languageData.webInterface.configThursdayHeadline}
                </div>
                <div class="config-timetable-header">
                    ${languageData.webInterface.configFridayHeadline}
                </div>
                <div class="config-timetable-header">
                    ${languageData.webInterface.configSaturdayHeadline}
                </div>
                <div class="config-timetable-header">
                    ${languageData.webInterface.configSundayHeadline}
                </div>
            </div>
            <div class="config-timetable-columns">
                ${getTimetableColumnHtml(serverConfiguration)}
            </div>
        </div>
    `;
    return timeTablecontentHtml;
}

function getTimetableColumnHtml(serverConfiguration) {
    let columnHtml = '';
    for (columnKey in serverConfiguration.timeTable) {
        columnHtml += `<div class="config-timetable-column">`;
        serverConfiguration.timeTable[columnKey].sort((a, b) => {
            if (a.startTime.hours > b.startTime.hours) {
                return 1;
            } else if (a.startTime.hours == b.startTime.hours) {
                if (a.startTime.minutes > b.startTime.minutes) {
                    return 1;
                } else if (a.startTime.minutes < b.startTime.minutes) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                return -1;
            }
        });
        serverConfiguration.timeTable[columnKey].forEach((timeTableItem, index) => {
            columnHtml += `
            <div class="config-timetable-item" onclick="openTimetableDetail(${columnKey}, ${index})">
                <p class="config-timetable-item-headline">
                    ${timeTableItem.subject}
                </p>
                <p class="config-timetable-item-time">
                    ${timeTableItem.startTime.hours}:${appendLeadingZeroes(timeTableItem.startTime.minutes)} - ${
                timeTableItem.endTime.hours
            }:${appendLeadingZeroes(timeTableItem.endTime.minutes)}
                </p>
            </div>`;
        });
        columnHtml += `
        <div class="config-timetable-item" onclick="openTimetableDetail(${columnKey}, -1)">
            <h1>
               +
            </h1>
        </div>`;
        columnHtml += `</div>`;
    }
    return columnHtml;
}

function appendLeadingZeroes(n) {
    if (n <= 9) {
        return '0' + n;
    }
    return n;
}

async function loadServers() {
    const servers = await getServerData();
    addServer(servers[0], true, true);
    addServer(servers[1], false, false);
    addServer(servers[2], false, true);
}

function addServer(serverArray, isBotAdded, isAdmin) {
    serverArray.forEach((server) => {
        let domNode = document.createElement('div');
        domNode.className = 'server';
        let textNode = document.createElement('p');
        textNode.innerText = server.name;
        let buttonNode = document.createElement('button');
        let configurateButtonNode;
        if (isBotAdded || !isAdmin) {
            buttonNode.innerText = 'Choose';
            buttonNode.className = 'choose-btn server-select-button';
            buttonNode.setAttribute('onclick', `openDashboard('${server.id}')`);
        } else {
            buttonNode.innerText = 'Add to server';
            buttonNode.className = 'add-to-server server-select-button';
            buttonNode.setAttribute(
                'onclick',
                `window.open('https://discord.com/oauth2/authorize?client_id=737357503989415956&permissions=8&scope=bot&guild_id=${server.id}','_blank')`
            );
        }
        let imageNode = document.createElement('img');
        if (server.icon) {
            imageNode.src = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}`;
        }
        domNode.appendChild(imageNode);
        domNode.appendChild(textNode);
        if (isBotAdded) {
            configurateButtonNode = document.createElement('button');
            configurateButtonNode.innerText = 'Configurate';
            configurateButtonNode.className = 'configurate-btn server-select-button';
            configurateButtonNode.setAttribute('onclick', `openConfigurate('${server.id}')`);
            domNode.appendChild(configurateButtonNode);
        }
        domNode.appendChild(buttonNode);
        document.querySelector('.servers').appendChild(domNode);
    });
}

function openDashboard(serverId) {
    setCookie('serverId', serverId, 7);
    window.open('/dashboard.html');
}

function openConfigurate(serverId) {
    setCookie('serverId', serverId, 7);
    window.open('/configurate.html', '_self');
}

function redirect(href) {
    if (window.location.href != href) window.location.href = href;
}

async function getLanguageData() {
    return await fetchRestEndpoint('/api/languagejson', 'POST', { language: window.navigator.language.split('-')[0] });
}

async function getServerData() {
    return await fetchRestEndpoint('/api/serverjson', 'POST', { token: accessToken });
}

async function fetchRestEndpoint(route, method, data) {
    const options = { method };

    if (data) {
        options.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        };
        options.body = JSON.stringify(data);
    } else {
        options.headers = {
            Authorization: `Bearer ${accessToken}`,
        };
    }

    const res = await fetch(route, options);

    if (!res.ok) {
        const error = new Error(`${method} ${res.url} ${res.status} (${res.statusText})`);
        error.response = res;
        throw error;
    }

    if (res.status !== 204) {
        return await res.json();
    }
}

function setCookie(name, value, daysToLive) {
    var cookie = name + '=' + encodeURIComponent(value);

    if (typeof daysToLive === 'number') {
        cookie += ';path=/;max-age=' + daysToLive * 24 * 60 * 60;

        document.cookie = cookie;
    }
}

function getCookie(name) {
    var cookieArr = document.cookie.split('; ');
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split('=');

        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    return null;
}
