// eslint-disable-next-line
let languageData;
let accessToken;
let isLoggedIn = false;
let userData;
let serverConfiguration;
let serverInformation;
let url = window.location.href;
let discordLoginUrl = `https://discord.com/api/oauth2/authorize?client_id=756085157949079552&redirect_uri=${encodeURIComponent(
    url
)}api/discord&response_type=token&scope=identify guilds`;
onload();

async function onload() {
    if (document.querySelector('.authorize-btn')) {
        document.querySelector('.authorize-btn').href = discordLoginUrl;
    }
    languageData = await getLanguageData();
    // document.querySelector('.pop-up-close').addEventListener('click', () => {
    //     document.querySelector('.pop-up-layout').style.display = 'none';
    //     document.querySelector('.pop-up-close').style.display = 'none';
    // });

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
            redirect(url);
        }
    } else {
        redirect(url);
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
        if (url) {
            redirect(url);
        }
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
    serverInformation = await fetchRestEndpoint('/api/serverinformation', 'POST', {
        token: accessToken,
        id: getCookie('serverId'),
    });
    const languages = await fetchRestEndpoint('/api/supportedlanguages', 'GET');
    if (serverInformation && languages) {
        setTimeout(async () => {
            serverConfiguration = await fetchRestEndpoint('/api/serverconfiguration', 'POST', {
                token: accessToken,
                id: getCookie('serverId'),
            });
            if (serverConfiguration) {
                let configurationHtml = `
            <h2 class="config-general-headline">${
                languageData.webInterface.configGeneralHeadline
            }</h2><button class="config-save-button" onclick="saveGeneralChanges()">${
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
                    <label class="teacher-roles" for="studentRoles">${languageData.webInterface.chooseLanguage}</label><br>
                    ${getLanguageHtml(languages, serverConfiguration.language)}
                </div>
                <div class="config-general-item">
                    <label class="timezones small-margin" for="timezones">${
                        languageData.webInterface.chooseNotificationsHeadline
                    }</label><br>
                    <p class="config-item-description">${languageData.webInterface.chooseNotificationsDescription}</p><br>
                    <label class="switch no-margin">
                        <input class="config-notifications" type="checkbox" ${serverConfiguration.notifications ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="config-general-item">
                    <label class="checktime small-margin" for="checktime">${languageData.webInterface.chooseCheckTimeHeadline}</label><br>
                    <p class="config-item-description">${languageData.webInterface.chooseCheckTime}</p><br>
                    <input class="config-checktime" type="number" min="0" value="${serverConfiguration.checktime}"> 
                </div>
                <div class="config-general-item">
                    <label class="timezones small-margin" for="timezones">${languageData.webInterface.chooseAutocheckHeadline}</label>
                    <p class="config-item-description">${languageData.webInterface.chooseAutocheckDescription}</p><br>
                    <label class="switch no-margin">
                        <input class="config-autocheck" type="checkbox" ${serverConfiguration.autocheck ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="config-timetable">
            </div>`;
                document.querySelector('.configuration').innerHTML = configurationHtml;
                getTimetableHtml();
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

function getTimetableHtml() {
    document.querySelector('.config-timetable').innerHTML = `
    <h2 class="config-general-headline">${languageData.webInterface.configTimetableHeadline}</h2><button class="config-save-button">${
        languageData.webInterface.configSaveButton
    }</button><hr><br>
    <div class="config-timetable-content">
        ${getTimetableContentHtml(serverConfiguration)}
    </div>`;
}

function getTimetableContentHtml() {
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
                ${getTimetableColumnHtml()}
            </div>
            ${getColumnDeleteHtml()}
        </div>
    `;
    return timeTablecontentHtml;
}

function getColumnDeleteHtml() {
    let counter = 0;
    let columnDeleteHtml = '<div class="config-timetable-column-delete">';
    for (key in serverConfiguration.timeTable) {
        if (serverConfiguration.timeTable[key].length > 0) {
            columnDeleteHtml += `<button class="column-delete-btn" onclick="deleteDay(${key})">Reset</button>`;
            counter++;
        } else {
            columnDeleteHtml += `<span></span>`;
        }
    }
    columnDeleteHtml += '</div>';
    if (counter > 0) {
        columnDeleteHtml += `<button class="column-delete-btn all-delete-btn" onclick="deleteDay(-1)">Reset timetable</button>`;
    }
    return columnDeleteHtml;
}

function deleteDay(index) {
    document.querySelector('.pop-up-layout').style.display = 'flex';
    document.querySelector('.pop-up').innerHTML = `
    <h3>Do you really want to reset ${index == -1 ? 'the entire timetable' : 'this day'}?</h3><br>
    <button class="config-timetable-item-save item-btn" onclick="closePopUp()">Cancel</button>
    <button class="config-timetable-item-delete item-btn" onclick="deleteDayAccepted(${index})">Delete</button>`;
}

function deleteDayAccepted(index) {
    serverConfiguration.timeTable[index] = [];
    console.log(serverConfiguration);

    fetchRestEndpoint('/api/saveconfig', 'POST', {
        token: accessToken,
        serverConfig: serverConfiguration,
    });
    closePopUp();
    getTimetableHtml();
}

function getTimetableColumnHtml() {
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
            <div class="config-timetable-item" onclick="openTimetableDetail('${columnKey}', ${index})">
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
        <div class="config-timetable-item" onclick="openTimetableDetail('${columnKey}', -1)">
            <h4>+</h4>
        </div>`;
        columnHtml += `</div>`;
    }
    return columnHtml;
}

function openTimetableDetail(columnKey, index) {
    document.querySelector('.pop-up-layout').style.display = 'flex';
    let selectChannelHtml = '';
    let deleteButton = '';
    let currentItem;
    if (index > -1) {
        currentItem = serverConfiguration.timeTable[columnKey][index];
        let channelIndex = serverInformation.channels.findIndex((channel) => channel.id == currentItem.channel);
        selectChannelHtml = `<option value="${serverInformation.channels[channelIndex].id}">${serverInformation.channels[channelIndex].name}</option>`;
        serverInformation.channels.forEach((channel, index) => {
            if (channelIndex != index && channel.type != 4) {
                selectChannelHtml += `<option value="${channel.id}">${channel.name}</option>`;
            }
        });
        deleteButton = `<button class="config-timetable-item-delete item-btn" onclick="deleteTimetableItem('${columnKey}', ${index})">Delete</button>`;
    } else {
        currentItem = {
            startTime: {
                hours: null,
                minutes: null,
            },
            endTime: {
                hours: null,
                minutes: null,
            },
            subject: '',
        };
        serverInformation.channels.forEach((channel) => {
            if (channel.type != 4) {
                selectChannelHtml += `<option value="${channel.id}">${channel.name}</option>`;
            }
        });
    }

    document.querySelector('.pop-up').innerHTML = `    
    <label for="config-timetable-subject">Subject Name</label>
    <input
        id="config-timetable-subject"
        type="text"
        value="${currentItem.subject}"
        placeholder="Subject Name"
        class="config-timetable-subject"
    /><br />
    <div class="config-timetable-time">
        <div class="config-timetable-start">
            <label for="config-timetable-start-label">Beginn Time</label>
            <div class="config-timetable-start-time">
                <input
                    class="config-timetable-start-hour"
                    id="config-timetable-start"
                    type="number"
                    min="0"
                    max="23"
                    value="${currentItem.startTime.hours}"
                    maxlength="2"
                    placeholder=""
                />:
                <input
                    class="config-timetable-start-minute"
                    id="config-timetable-start-minute"
                    type="number"
                    min="0"
                    max="59"
                    value="${currentItem.startTime.minutes}"
                    maxlength="2"
                    placeholder=""
                />
            </div>
        </div>
        <br />
        <div class="config-timetable-end">
            <label for="config-timetable-end-label">End Time</label>
            <div class="config-timetable-end-time">
                <input
                    class="config-timetable-end-hour"
                    id="config-timetable-end"
                    type="number"
                    min="0"
                    max="23"
                    value="${currentItem.endTime.hours}"
                    maxlength="2"
                    placeholder=""
                />:
                <input
                    class="config-timetable-end-minute"
                    id="config-timetable-end-minute"
                    type="number"
                    min="0"
                    max="59"
                    value="${currentItem.endTime.minutes}"
                    maxlength="2"
                    placeholder=""
                />
            </div>
        </div>
        <br />
    </div>
    <div class="config-timetable-channel">
        <label class="timetable-channel" for="timetableChannel">WÃ¤hle die SchÃ¼ler Rolle</label><br />
        <select class="timetable-channel-select" name="timetableChannel" id="timetableChannel">
            ${selectChannelHtml}
        </select><br />
    </div>
    <br />
    <button class="config-timetable-item-save item-btn" onclick="saveTimetableChange('${columnKey}', ${index})">Save</button>
    ${deleteButton}
    <button class="config-timetable-close" onclick="closePopUp()">X</button>`;
}

function saveGeneralChanges() {
    let falseValues = [];
    if (document.querySelector('.student-select')) {
    }
    if (document.querySelector('.teacher-select')) {
    }
    if (document.querySelector('.timezone-select')) {
    }
    if (document.querySelector('#language')) {
    }
    if (document.querySelector('.config-notifications')) {
    }
    if (document.querySelector('.config-checktime')) {
    }
    if (document.querySelector('.student-autocheck')) {
    }
}

function saveTimetableChange(columnKey, index) {
    let itemObject = {
        startTime: {
            hours: null,
            minutes: null,
        },
        endTime: {
            hours: null,
            minutes: null,
        },
        subject: null,
        channel: null,
    };
    let falseValues = [];
    if (document.querySelector('.config-timetable-start-hour')) {
        let startHour = document.querySelector('.config-timetable-start-hour').value;
        if (startHour >= 0 && startHour < 24) {
            itemObject.startTime.hours = Number(startHour);
        } else {
            falseValues.push('startHour');
        }
    }
    if (document.querySelector('.config-timetable-start-minute')) {
        let startMinute = document.querySelector('.config-timetable-start-minute').value;
        if (startMinute >= 0 && startMinute < 60) {
            itemObject.startTime.minutes = Number(startMinute);
        } else {
            falseValues.push('startMinute');
        }
    }
    if (document.querySelector('.config-timetable-end-hour')) {
        let endHour = document.querySelector('.config-timetable-end-hour').value;
        if (endHour >= 0 && endHour < 24) {
            itemObject.endTime.hours = Number(endHour);
        } else {
            falseValues.push('endHour');
        }
    }
    if (document.querySelector('.config-timetable-end-minute')) {
        let endMinute = document.querySelector('.config-timetable-end-minute').value;
        if (endMinute >= 0 && endMinute < 60) {
            itemObject.endTime.minutes = Number(endMinute);
        } else {
            falseValues.push('endMinute');
        }
    }
    if (document.querySelector('.config-timetable-subject')) {
        itemObject.subject = document.querySelector('.config-timetable-subject').value;
    }
    if (document.querySelector('.timetable-channel-select')) {
        let channelSelect = document.querySelector('.timetable-channel-select').value;
        if (serverInformation.channels.find((channel) => channel.id == channelSelect)) {
            itemObject.channel = channelSelect;
        } else {
            falseValues.push('channel');
        }
    }

    if (falseValues.length > 0) {
        alert('An input was wrong');
        console.log(falseValues);
    } else {
        if (index >= 0) {
            serverConfiguration.timeTable[columnKey][index] = itemObject;
        } else {
            serverConfiguration.timeTable[columnKey].push(itemObject);
        }

        fetchRestEndpoint('/api/saveconfig', 'POST', {
            token: accessToken,
            serverConfig: serverConfiguration,
        });
        closePopUp();
        getTimetableHtml();
    }
}

function deleteTimetableItem(columnKey, index) {
    serverConfiguration.timeTable[columnKey].splice(index, 1);
    fetchRestEndpoint('/api/saveconfig', 'POST', {
        token: accessToken,
        serverConfig: serverConfiguration,
    });
    console.log('asdfasdf');
    closePopUp();
    getTimetableHtml();
}

function closePopUp() {
    document.querySelector('.pop-up-layout').style.display = 'none';
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
    if (!window.location.href.includes(href)) window.location.href = href;
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
