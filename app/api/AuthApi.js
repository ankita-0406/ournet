import Api from './Api'


export function login(username, password) {
    let url = "/auth";
    let data = { username, password };
    return PostRequest(url, data);
}

export function logout() {
    let url = "/auth/logout";
    let data = {};
    return PostRequest(url, data);
}

export function refreshToken() {
    let url = "/auth/refresh";
    let data = {};
    return GetRequest(url, data);
}

export function register(userdata) {
    let url = "/api/ournet/public/registration";
    let data = userdata;
    return PostRequest(url, data);
}

export function resetPassword(password, confirmationCode) {
    let url = "/api/ournet/public/reset-password";
    let data = { password, confirmationCode };
    return PostRequest(url, data);
}

export function requireResetPassword(email) {
    let url = "/api/ournet/public/require-reset-password";
    let data = { email };
    return PostRequest(url, data);
}

export function confirmRegistration(code) {
    let url = "/api/ournet/public/confirmation";
    let data = { confirmationCode : code };
    return PostRequest(url, data);
}

export function sendActivationRequest(id) {
    let url = `/api/ournet/public/send-activation-email/?userId=${id}`;
    let data = {};
    return PutRequest(url, data);
}

export function changePassword(data) {
    let url = "/api/ournet/change-password";
    return PutRequest(url, data);
}

function GetRequest(url, data) {
    return new Promise(function (resolve, reject) {

        let obj = {
            url: url,
            onSuccess: (resp) => {
                resolve(resp);
            },
            onError: (err) => {
                reject();
                console.log('api error', err);
            }
        }

        Api.get(obj.url, obj.onSuccess, obj.onError);

    });
}

function PostRequest(url, data) {
    return new Promise(function (resolve, reject) {

        let obj = {
            url: url,
            data: data,
            onSuccess: (resp) => {
                resolve(resp);
            },
            onError: (err) => {
                var message = 'some error occured';
                if (err && err.response && err.response.body && err.response.body.errors) {
                    message = err.response.body.errors[0].message;
                    console.log(message);
                }
                reject(message);
            }
        }

        Api.post(obj.url, obj.data, obj.onSuccess, obj.onError);

    });
}

function PutRequest(url, data) {
    return new Promise(function (resolve, reject) {
        let obj = {
            url: url,
            data: data,
            onSuccess: (resp) => {
                resolve(resp);
            },
            onError: (err) => {
                reject(err);
                console.log('api error', err);
            }
        }

        Api.put(obj.url, obj.data, obj.onSuccess, obj.onError);

    });
}


