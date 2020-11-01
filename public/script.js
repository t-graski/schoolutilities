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

    if (getCookie('access_token')) {
        let cookie = getCookie('access_token');

        accessToken = cookie;
        let userResponse = await fetchRestEndpoint('https://discord.com/api/users/@me', 'GET');
        if (userResponse) {
            isLoggedIn = true;
            accessToken = userResponse.accessToken;
            userData = userResponse;
            if (userData) {
                document.querySelector('.user-name').innerHTML = userData.username;
            }
        }
    }
}

async function getLanguageData() {
    return await fetchRestEndpoint('/api/languagejson', 'POST', { language: window.navigator.language.split('-')[0] });
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
