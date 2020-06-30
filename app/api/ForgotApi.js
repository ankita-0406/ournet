import Api from "./Api";

export function forgotPassword(data) {
    let url = `/api/ournet/public/require-reset-password`;
    return PostRequest(url, data);
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
                let msg = "some error occured";
                if (err && err.response && err.response.body && err.response.body.errors[0]) {
                    msg = err.response.body.errors[0].message;
                }
                reject(msg);
            }
        }

        Api.post(obj.url, obj.data, obj.onSuccess, obj.onError);

    });
}