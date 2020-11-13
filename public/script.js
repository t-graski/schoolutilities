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
    
    if(window.location.href.includes('account')){
        if(isLoggedIn){
            loadServers();
        }
    }
}

async function loadServers(){
    const servers = await getServerData();
    addServer(servers[0], true, true);
    addServer(servers[1], false, false);
    addServer(servers[2], false, true);
}

function addServer(serverArray, isBotAdded, isAdmin){
    serverArray.forEach(server => {
        let domNode = document.createElement("div");
        domNode.className = "server";
        let textNode = document.createElement("p");
        textNode.innerText = server.name;
        let buttonNode = document.createElement("button");
        let configurateButtonNode;
        if(isBotAdded || !isAdmin){
            buttonNode.innerText = "Choose";
            buttonNode.className = "choose-btn server-select-button";
            buttonNode.setAttribute("onclick", `openDashboard('${server.id}')`);
        }else{
            buttonNode.innerText = "Add to server";
            buttonNode.className = "add-to-server server-select-button";
            buttonNode.setAttribute("onclick", `window.open('https://discord.com/oauth2/authorize?client_id=737357503989415956&permissions=8&scope=bot&guild_id=${server.id}','_blank')`);
        }
        let imageNode = document.createElement("img");
        if(server.icon){
            imageNode.src = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}`;
        }
        domNode.appendChild(imageNode);
        domNode.appendChild(textNode);
        if(isBotAdded){
            configurateButtonNode = document.createElement("button");
            configurateButtonNode.innerText="Configurate";
            configurateButtonNode.className="configurate-btn server-select-button";
            configurateButtonNode.setAttribute("onclick", `openConfigurate('${server.id}')`);
            domNode.appendChild(configurateButtonNode);
        }
        domNode.appendChild(buttonNode);
        document.querySelector(".servers").appendChild(domNode);
    });
}

function openDashboard(serverId){
    setCookie('serverId', serverId, 7);
    window.open("/dashboard.html");
}

function openConfigurate(serverId){
    setCookie('serverId', serverId, 7);
    window.open("/configurate.html");
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
        cookie += ';path=/; max-age=' + daysToLive * 24 * 60 * 60;

        document.cookie = cookie;
    }
}

function getCookie(name) {
    var cookieArr = document.cookie.split(';path=/;');

    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split('=');

        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    return null;
}
